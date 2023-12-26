import { invoiceSettings } from '@crema/fakedb/invoice';
import { NextRequest } from 'next/server';

let invoiceSettingsData = invoiceSettings;

export const GET = async () => {
  try {
    return new Response(JSON.stringify(invoiceSettingsData), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const settings = reqBody;
    invoiceSettingsData = settings;
    return new Response(JSON.stringify(invoiceSettingsData), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
