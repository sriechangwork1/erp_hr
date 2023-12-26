import contactData from '@crema/fakedb/apps/contact/contactList';
import labelList from '@crema/fakedb/apps/contact/labelList';
import { NextRequest } from 'next/server';
import { ContactObjType, LabelType } from '@crema/types/models/apps/Contact';

let contactList = contactData;
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { contactIds, type, name, page } = reqBody;
    let folderContactList: ContactObjType[];
    if (type === 'folder') {
      if (name === 'starred') {
        contactList = contactList.filter(
          (contact) => !contactIds.includes(contact.id),
        );
        folderContactList = contactList.filter((contact) => contact.isStarred);
      } else if (name === 'frequent') {
        contactList = contactList.filter(
          (contact) => !contactIds.includes(contact.id),
        );
        folderContactList = contactList.filter((contact) => contact.isFrequent);
      } else {
        contactList = contactList.filter(
          (contact) => !contactIds.includes(contact.id),
        );
        folderContactList = contactList;
      }
    } else {
      const labelType = labelList.find(
        (label: LabelType) => label.alias === name,
      )?.id;
      contactList = contactList.filter(
        (contact) => !contactIds.includes(contact.id),
      );
      folderContactList = contactList.filter(
        (contact) => contact.label === labelType,
      );
    }
    const index = page * 15;
    const count = folderContactList.length;
    const data =
      folderContactList.length > 15
        ? folderContactList.slice(index, index + 15)
        : folderContactList;
    return new Response(JSON.stringify({ data, count }), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
