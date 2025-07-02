import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000';

export async function handler(req: NextRequest, {
  params,
}: {
  params: { proxy: string[] };
}) {
  const method = req.method;
  const path = '/' + params.proxy.join('/');
  const url = `${BACKEND_URL}${path}`;
  const headers = getForwardedHeaders(req);

  let body = undefined;
  if (req.headers.get('content-type')?.includes('application/json')) {
    try {
      body = await req.json();
    } catch {}
  }

  try {
    const axiosConfig = {
      method,
      url,
      headers,
      data: body,
      params: Object.fromEntries(req.nextUrl.searchParams),
    };

    const axiosResponse = await axios(axiosConfig);

    return NextResponse.json(axiosResponse.data, { status: axiosResponse.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'Internal Server Error';
    return NextResponse.json({ error: message }, { status });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

function getForwardedHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (!['host', 'content-length'].includes(key)) {
      headers[key] = value;
    }
  });
  return headers;
}
