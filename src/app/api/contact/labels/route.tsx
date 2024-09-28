import labelList from '@crema/fakedb/apps/contact/labelList';
import contactData from '@crema/fakedb/apps/contact/contactList';
import { NextRequest } from 'next/server';
let contactList = contactData;
export const GET = async () => {
  try {
    return new Response(JSON.stringify(labelList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { contactIds, type } = reqBody;
    contactList = contactList.map((contact) => {
      if (contactIds.includes(contact.id)) {
        contact.label = type;
        return contact;
      } else {
        return contact;
      }
    });
    const updatedContacts = contactList.filter((contact) => contactIds.includes(contact.id));
    return new Response(JSON.stringify(updatedContacts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
