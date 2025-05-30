import { MailType, SenderType } from '@crema/types/models/apps/Mail';
import { blue, green, red } from '@mui/material/colors';

const emailDescription = [
  `<p>Hi,</p><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p> <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p><p> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p><p> Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>`,
  `<p><strong>Hi,</strong></p><br><p><span>We have absolutely loved seeing your entries for our 15th Birthday Competition. So far, we've seen a huge range of submissions.</span></p><p> <br></p><p><span>From amazing creative writing to beautiful graphics, audio, and video, your Envato journeys have truly come to life!&nbsp;</span></p><p> <br></p><p><span>If you haven’t submitted your entry yet, that's ok! But time is running out, here's how long you have left</span></p><br><p><span>Regards</span></p>`,
  `<p><span>Hi there,</span></p><br><p><span>We have key&nbsp;data to share with you from our performance across April - June 2021!&nbsp;</span></p><p><span>As a business, we look at a 3 month (quarterly) view to understand trends and insights for our Authors.</span></p><p><span>In this edition of our&nbsp;</span><strong>Quarterly Business Insights Report</strong><span>, we’re sharing key metrics from April to June 2021, including:&nbsp;&nbsp;</span></p><ul><li><span>How many&nbsp;</span><strong>millions of people visited the Envato website&nbsp;</strong></li><li><strong>How many customers we reached</strong><span>&nbsp;through our marketing channels</span></li><li><strong>How much our Authors earned</strong></li></ul><p><span>To get these answers and more, check out our Quarterly Business Insights Report below.</span></p>`,
];

export const senders: SenderType[] = [
  {
    id: 1,
    name: 'Crema',
    email: 'info@cremawork.com',
    profilePic: '/assets/images/logo/vcs.png',
  },
  {
    id: 2,
    name: 'Paytm',
    email: 'support@paytm.com',
    profilePic: '/assets/images/logo/paytm.png',
  },
  {
    id: 3,
    name: 'Bitcoins Support',
    email: 'support@bitcoin.com',
    profilePic: '/assets/images/logo/bitcoin.png',
  },
  {
    id: 4,
    name: 'Symu Freebies',
    email: 'noReply@flipkart.com',
    profilePic: '/assets/images/logo/flipkart.jpg',
  },
  {
    id: 5,
    name: 'Dribbble',
    email: 'support@dribbble.com',
    profilePic: '/assets/images/logo/dribble.png',
  },
  {
    id: 6,
    name: 'Amazon',
    email: 'offers@amazon.in',
    profilePic: '',
  },
  {
    id: 7,
    name: 'SBI YONO',
    email: 'yono@sbi.com',
    profilePic: '',
  },
  {
    id: 8,
    name: 'Naukri.com',
    email: 'noreply@nokri.com',
    profilePic: '/assets/images/logo/bitcoin.png',
  },
  {
    id: 9,
    name: 'Dribble',
    email: 'support@dribbble.com',
    profilePic: '/assets/images/logo/dribble.png',
  },
];

const mailList: MailType[] = [
  {
    id: 411,
    isChecked: false,
    label: {
      id: 214,
      name: 'Paypal',
      alias: 'paypal',
      color: 'grey.500',
    },
    subject: 'Work Enquiry - Website Development',
    hasAttachments: false,
    isRead: true,
    folderValue: 121,
    messages: [
      {
        messageId: 1,
        description: emailDescription[0],
        sender: senders[1],
        to: [senders[0]],
        cc: [],
        bcc: [],
        isStarred: false,
        sentOn: 'Thu, Oct 18, 2021 8:30 PM',
      },
      {
        messageId: 2,
        description: emailDescription[1],
        sender: senders[0],
        to: [senders[1]],
        cc: [],
        bcc: [],
        isStarred: false,
        sentOn: 'Thu, Oct 18, 2021 8:30 PM',
      },
      {
        messageId: 3,
        description: emailDescription[2],
        sender: senders[1],
        to: [senders[0]],
        cc: [],
        bcc: [],
        isStarred: false,
        sentOn: 'Thu, Oct 18, 2021 8:30 PM',
      },
    ],
  },
  {
    id: 412,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Your Movie Tickets for Sahoo',
    hasAttachments: false,
    isRead: true,
    messages: [
      {
        messageId: 1,
        description: emailDescription[0],
        sender: senders[2],
        to: [senders[0]],
        cc: [],
        bcc: [],
        isStarred: false,
        sentOn: 'Wed, Oct 17, 2021 8:30 PM',
      },
      {
        messageId: 2,
        description: emailDescription[1],
        sender: senders[0],
        to: [senders[2]],
        cc: [],
        bcc: [],
        isStarred: false,
        sentOn: 'Wed, Oct 17, 2021 8:30 PM',
      },
    ],
    folderValue: 121,
  },
  {
    id: 413,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Bitcoins IP Whitelist mail: Please approve this IP to continue to login',
    hasAttachments: true,
    isRead: true,
    messages: [
      {
        messageId: 1,
        sender: senders[2],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[0],
        isStarred: false,
        sentOn: 'Tues, Oct 15, 2021 8:30 PM',
      },
      {
        messageId: 2,
        sender: senders[0],
        to: [senders[2]],
        cc: [],
        bcc: [],
        description: emailDescription[1],
        isStarred: false,
        sentOn: 'Tues, Oct 15, 2021 8:30 PM',
      },
    ],
    folderValue: 123,
  },
  {
    id: 414,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Download freebie Hello Tune plugin',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[3],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[0],
        isStarred: false,
        sentOn: 'Tues, Oct 15, 2021 7:30 PM',
      },
    ],
    isRead: false,
    folderValue: 121,
  },
  {
    id: 415,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Big Billion Day sale coming, Are you ready?',
    hasAttachments: true,
    messages: [
      {
        messageId: 1,
        sender: senders[4],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[0],
        isStarred: false,
        sentOn: 'Mon, Oct 14, 2021 8:30 PM',
      },
      {
        messageId: 2,
        sender: senders[0],
        to: [senders[4]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Mon, Oct 14, 2021 8:30 PM',
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 416,
    isChecked: false,
    label: {
      id: 211,
      name: 'Crema',
      alias: 'Crema',
      color: red[500],
    },
    subject: 'Work Enquiry - Website Development',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[5],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Sun, Oct 13, 2021 8:30 PM',
      },
      {
        messageId: 2,
        sender: senders[0],
        to: [senders[5]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Sun, Oct 13, 2021 8:30 PM',
      },
    ],
    isRead: true,
    folderValue: 123,
  },
  {
    id: 417,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Your Movie Tickets for Sahoo',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[1],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Sat, Oct 12, 2021 8:30 PM',
      },
    ],
    isRead: false,
    folderValue: 121,
  },
  {
    id: 418,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Bitcoins IP Whitelist mail: Please approve this IP to continue to login',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[2],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Fri, Oct 11, 2021 8:30 PM',
      },
    ],
    isRead: true,
    folderValue: 123,
  },
  {
    id: 419,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Download freebie Hello Tune plugin',
    hasAttachments: true,
    messages: [
      {
        messageId: 1,
        sender: senders[3],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Thru, Oct 10, 2021 8:30 PM',
      },
    ],
    isRead: false,
    folderValue: 121,
  },
  {
    id: 420,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Big Billion Day sale coming, Are you ready?',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[4],
        to: [senders[0]],
        cc: [],
        bcc: [],
        sentOn: 'Tues, Oct 09, 2021 8:30 PM',
        isStarred: false,
        description: emailDescription[2],
      },
      {
        messageId: 2,
        sender: senders[0],
        to: [senders[4]],
        cc: [],
        bcc: [],
        sentOn: 'Tues, Oct 09, 2021 8:30 PM',
        isStarred: false,
        description: emailDescription[2],
      },
      {
        messageId: 3,
        sender: senders[0],
        to: [senders[4]],
        cc: [],
        bcc: [],
        sentOn: 'Tues, Oct 09, 2021 8:30 PM',
        description: emailDescription[1],
        isStarred: false,
      },
      {
        messageId: 4,
        sender: senders[4],
        to: [senders[0]],
        cc: [],
        bcc: [],
        sentOn: 'Tues, Oct 09, 2021 8:30 PM',
        description: emailDescription[0],
        isStarred: false,
      },
      {
        messageId: 5,
        sender: senders[4],
        to: [senders[0]],
        cc: [],
        bcc: [],
        sentOn: 'Tues, Oct 09, 2021 8:30 PM',
        description: emailDescription[2],
        isStarred: false,
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 421,
    isChecked: false,
    label: {
      id: 214,
      name: 'Paypal',
      alias: 'paypal',
      color: 'grey.500',
    },
    subject: 'Work Enquiry - Website Development',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[7],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Mon, Oct 08, 2021 8:30 PM',
      },
    ],
    isRead: false,
    folderValue: 127,
  },
  {
    id: 422,
    isChecked: false,
    label: {
      id: 211,
      name: 'Crema',
      alias: 'Crema',
      color: red[500],
    },
    subject: 'Your Movie Tickets for Sahoo',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[1],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Mon, Oct 08, 2021 6:30 PM',
      },
    ],
    isRead: false,
    folderValue: 123,
  },
  {
    id: 423,
    isChecked: false,
    label: {
      id: 214,
      name: 'Paypal',
      alias: 'paypal',
      color: 'grey.500',
    },
    subject: 'Bitcoins IP Whitelist mail: Please approve this IP to continue to login',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[2],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[0],
        isStarred: false,
        sentOn: 'Sun, Oct 07, 2021 6:30 PM',
      },
    ],
    isRead: false,
    folderValue: 127,
  },
  {
    id: 424,
    isChecked: false,
    label: {
      id: 211,
      name: 'Crema',
      alias: 'Crema',
      color: red[500],
    },
    subject: 'Download freebie Hello Tune plugin',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[3],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Sat, Oct 06, 2021 6:30 PM',
      },
    ],
    isRead: false,
    folderValue: 121,
  },
  {
    id: 425,
    isChecked: false,
    label: {
      id: 212,
      name: 'Personal',
      alias: 'personal',
      color: blue[500],
    },
    subject: 'Big Billion Day sale coming, Are you ready?',
    hasAttachments: true,
    messages: [
      {
        messageId: 1,
        sender: senders[4],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Sat, Oct 06, 2021 4:30 PM',
      },
    ],
    isRead: true,
    folderValue: 127,
  },
  {
    id: 426,
    isChecked: false,
    label: {
      id: 214,
      name: 'Paypal',
      alias: 'paypal',
      color: 'grey.500',
    },
    subject: 'Offers you can not miss!',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[5],
        to: [senders[0]],
        cc: [],
        bcc: [],
        isStarred: false,
        description: emailDescription[2],
        sentOn: 'Fri, Oct 05, 2021 6:30 PM',
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 427,
    isChecked: false,
    label: {
      id: 214,
      name: 'Paypal',
      alias: 'paypal',
      color: 'grey.500',
    },
    subject: 'Use SBI YONO for faster banking',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sender: senders[6],
        to: [senders[0]],
        cc: [],
        bcc: [],
        description: emailDescription[2],
        isStarred: false,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 435,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Thank you for being with us!',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[2],
        isStarred: false,
        sender: senders[7],
        to: [senders[0]],
        cc: [],
        bcc: [],
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 436,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Thank you for being with us!',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[0],
        isStarred: false,
        sender: senders[7],
        to: [senders[0]],
        cc: [],
        bcc: [],
      },
      {
        messageId: 2,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[2],
        isStarred: false,
        sender: senders[0],
        to: [senders[7]],
        cc: [],
        bcc: [],
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 437,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Thank you for being with us!',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[2],
        sender: senders[8],
        to: [senders[0]],
        cc: [],
        bcc: [],
        isStarred: false,
      },
      {
        messageId: 2,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[0],
        sender: senders[0],
        to: [senders[8]],
        cc: [],
        bcc: [],
        isStarred: false,
      },
    ],
    isRead: true,
    folderValue: 121,
  },
  {
    id: 438,
    isChecked: false,
    label: {
      id: 213,
      name: 'Work',
      alias: 'work',
      color: green[500],
    },
    subject: 'Thank you for being with us!',
    hasAttachments: false,
    messages: [
      {
        messageId: 1,
        isStarred: false,
        sentOn: 'Wed, Oct 03, 2021 6:30 PM',
        description: emailDescription[0],
        sender: senders[8],
        to: [senders[0]],
        cc: [],
        bcc: [],
      },
    ],
    isRead: true,
    folderValue: 121,
  },
];
export default mailList;
