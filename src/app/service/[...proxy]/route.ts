import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:4005';

// ✅ สร้างฟังก์ชัน proxy สำหรับทุก method
async function handleRequest(method: string, req: NextRequest, params: { proxy: string[] }) {
  const path = '/' + params.proxy.join('/');
  const url = `${BACKEND_URL}${path}`;
  const headers = getForwardedHeaders(req);

  let body = undefined;
  if (req.headers.get('content-type')?.includes('application/json')) {
    try {
      body = await req.json();
    } catch {
      // Ignore JSON parse error
    }
  }

  try {
    const axiosResponse = await axios({
      method,
      url,
      headers,
      data: body,
      params: Object.fromEntries(req.nextUrl.searchParams),
    });

    return NextResponse.json(axiosResponse.data, { status: axiosResponse.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Internal Server Error';
    return NextResponse.json({ error: message }, { status });
  }
}

// ✅ Export ฟังก์ชันแยกตาม HTTP method
export async function GET(req: NextRequest, { params }: { params: { proxy: string[] } }) {
  return handleRequest('GET', req, params);
}

export async function POST(req: NextRequest, { params }: { params: { proxy: string[] } }) {
  return handleRequest('POST', req, params);
}

export async function PUT(req: NextRequest, { params }: { params: { proxy: string[] } }) {
  return handleRequest('PUT', req, params);
}

export async function DELETE(req: NextRequest, { params }: { params: { proxy: string[] } }) {
  return handleRequest('DELETE', req, params);
}

// ✅ ฟังก์ชันคัดกรอง header ที่จะ forward
function getForwardedHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (!['host', 'content-length'].includes(key.toLowerCase())) {
      headers[key] = value;
    }
  });
  return headers;
}