import { FaRegCalendarAlt, FaRegHospital } from 'react-icons/fa';
import { FiMap, FiUsers } from 'react-icons/fi';
import { HiOutlineAcademicCap, HiOutlineChartSquareBar } from 'react-icons/hi';
import {
  RiCustomerService2Line,
  RiDashboardLine,
  RiFileUploadLine,
  RiShieldUserLine,
  RiTodoLine,
} from 'react-icons/ri';
import { BiCarousel, BiCartAlt, BiErrorAlt, BiTask } from 'react-icons/bi';
import { BsBriefcase, BsCart4, BsChatDots, BsCurrencyBitcoin, BsQuestionDiamond } from 'react-icons/bs';
import { DiHtml5Multimedia } from 'react-icons/di';
import {
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineDns,
  MdOutlineManageAccounts,
  MdOutlineSettings,
  MdOutlineAppSettingsAlt,
  MdOutlineSettingsSuggest,
  MdOutlineTableChart,
  MdOutlineTableRows,
  MdOutlineDocumentScanner,
  MdOutlineFeed,
  MdOutlineFactCheck,
  MdOutlineFeaturedPlayList,
  MdOutlineFileOpen,
  MdHotelClass,
  MdLocalPlay,
  MdNordicWalking,
  MdOutlineAttribution,
  MdMan,
  MdOutlineSettingsAccessibility,
  MdOutlineSupervisorAccount,
  MdOutlineSwitchAccessShortcutAdd,
  MdOutlineTransferWithinAStation,
  MdEditDocument,
  MdContacts,
  MdContactEmergency,
} from 'react-icons/md';
import { CgFeed } from 'react-icons/cg';
import { GrUserAdmin } from 'react-icons/gr';
import { AiOutlineEdit, AiOutlineUnorderedList } from 'react-icons/ai';
import { TbFileInvoice } from 'react-icons/tb';

const routesConfig = [
  {
    id: 'hr',
    title: 'ระบบบริหารงานบุคลากร',
    messageId: 'sidebar.hr',
    icon: <MdOutlineContactPhone />,
    type: 'group',
    children: [
      {
        id: 'hr001',
        title: 'sidebar.hr001',
        messageId: 'sidebar.hr001',
        type: 'item',
        icon: <MdOutlineTableRows />,
        url: '/dashboards/crm',
      }
      ,{
          id: 'hr01',
          title: 'sidebar.hr01',
          messageId: 'sidebar.hr01',
          type: 'collapse',
          icon: <MdOutlineSettings />,
          children: [
            {
              id: 'hr101',
              title: 'sidebar.hr01.01',
              messageId: 'sidebar.hr01.01',
              type: 'item',
              url: '/hr01/hr101',
            },
            {
              id: 'hr102',
              title: 'sidebar.hr01.02',
              messageId: 'sidebar.hr01.02',
              type: 'item',
              url: '/hr01/hr102',
            },
            {
              id: 'hr103',
              title: 'sidebar.hr01.03',
              messageId: 'sidebar.hr01.03',
              type: 'item',
              url: '/hr01/hr103',
            },
            {
              id: 'hr104',
              title: 'sidebar.hr01.04',
              messageId: 'sidebar.hr01.04',
              type: 'item',
              url: '/hr01/hr104',
            },
            {
              id: 'hr105',
              title: 'sidebar.hr01.05',
              messageId: 'sidebar.hr01.05',
              type: 'item',
              url: '/hr01/hr105',
            },
            {
              id: 'hr106',
              title: 'sidebar.hr01.06',
              messageId: 'sidebar.hr01.06',
              type: 'item',
              url: '/hr01/hr106',
            },
            {
              id: 'hr107',
              title: 'sidebar.hr01.07',
              messageId: 'sidebar.hr01.07',
              type: 'item',
              url: '/hr01/hr107',
            },
            {
              id: 'hr108',
              title: 'sidebar.hr01.08',
              messageId: 'sidebar.hr01.08',
              type: 'item',
              url: '/hr01/hr108',
            },
                        {
              id: 'hr109',
              title: 'sidebar.hr01.09',
              messageId: 'sidebar.hr01.09',
              type: 'item',
              url: '/hr01/hr109',
            },
                       {
              id: 'hr110',
              title: 'sidebar.hr01.10',
              messageId: 'sidebar.hr01.10',
              type: 'item',
              url: '/hr01/hr110',
            },
                       {
              id: 'hr111',
              title: 'sidebar.hr01.11',
              messageId: 'sidebar.hr01.11',
              type: 'item',
              url: '/hr01/hr111',
            },
                       {
              id: 'hr115',
              title: 'sidebar.hr01.15',
              messageId: 'sidebar.hr01.15',
              type: 'item',
              url: '/hr01/hr115',
            },
                       {
              id: 'hr116',
              title: 'sidebar.hr01.16',
              messageId: 'sidebar.hr01.16',
              type: 'item',
              url: '/hr01/hr116',
            },
            {
              id: 'hr117',
              title: 'sidebar.hr01.17',
              messageId: 'sidebar.hr01.17',
              type: 'item',
              url: '/hr01/hr117',
            },
              {
              id: 'hr118',
              title: 'sidebar.hr01.18',
              messageId: 'sidebar.hr01.18',
              type: 'item',
              url: '/hr01/hr118',
            },

          ],
        },

         ],
  },
  { 
    id: 'hr00',
    title: 'sidebar.hr00',
    messageId: 'sidebar.hr00',
    icon: <MdOutlineContactPhone />,
    type: 'group',
    children: [
      
      {
        id: 'hr02',
        title: 'sidebar.hr02',
        messageId: 'sidebar.hr02',
        type: 'collapse',
        icon: <MdContacts />,
        children: [
          {
            id: 'hr201',
            title: 'sidebar.hr02.01',
            messageId: 'sidebar.hr02.01',
            type: 'item',
            url: '/hr02/hr201',
          },
          {
            id: 'hr202',
            title: 'sidebar.hr02.02',
            messageId: 'sidebar.hr02.02',
            type: 'item',
            url: '/hr02/hr202',
          },
          {
            id: 'hr203',
            title: 'sidebar.hr02.03',
            messageId: 'sidebar.hr02.03',
            type: 'item',
            url: '/hr02/hr203',
          },
          {
            id: 'hr204',
            title: 'sidebar.hr02.04',
            messageId: 'sidebar.hr02.04',
            type: 'item',
            url: '/hr02/hr204',
          },
          {
            id: 'hr205',
            title: 'sidebar.hr02.05',
            messageId: 'sidebar.hr02.05',
            type: 'item',
            url: '/hr02/hr205',
          },
          {
            id: 'hr206',
            title: 'sidebar.hr02.06',
            messageId: 'sidebar.hr02.06',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr206',
          },
          {
            id: 'hr207',
            title: 'sidebar.hr02.07',
            messageId: 'sidebar.hr02.07',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr207',
          },
          {
            id: 'hr208',
            title: 'sidebar.hr02.08',
            messageId: 'sidebar.hr02.08',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr208',
          },
          {
            id: 'hr209',
            title: 'sidebar.hr02.09',
            messageId: 'sidebar.hr02.09',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr209',
          },
          {
            id: 'hr210',
            title: 'sidebar.hr02.10',
            messageId: 'sidebar.hr02.10',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr210',
          },
          {
            id: 'hr211',
            title: 'sidebar.hr02.11',
            messageId: 'sidebar.hr02.11',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr211',
          },
          {
            id: 'hr212',
            title: 'sidebar.hr02.12',
            messageId: 'sidebar.hr02.12',
            type: 'item',
            //icon: <MdContactEmergency/>,
            url: '/hr02/hr212',
          },
        ],
      },
      {
        id: 'hr03',
        title: 'sidebar.hr03',
        messageId: 'sidebar.hr03',
        type: 'collapse',
        icon: <MdOutlineTransferWithinAStation />,
        children: [
          {
            id: 'hr301',
            title: 'sidebar.hr03',
            messageId: 'sidebar.hr03.01',
            type: 'item',
            url: '/hr03/hr301',
          },
        ],
      },
      {
        id: 'hr04',
        title: 'sidebar.hr04',
        messageId: 'sidebar.hr04',
        type: 'collapse',
        icon: <MdEditDocument />,
        children: [
          {
            id: 'hr401',
            title: 'sidebar.hr04',
            messageId: 'sidebar.hr04.01',
            type: 'item',
            url: '/hr04/hr401',
          },
        ],
      },
      {
        id: 'hr05',
        title: 'Ecommerce',
        messageId: 'sidebar.hr05',
        type: 'collapse',
        icon: <MdOutlineSwitchAccessShortcutAdd />,
        children: [
          {
            id: 'hr501',
            title: 'sidebar.hr05',
            messageId: 'sidebar.hr05.01',
            type: 'item',
            url: '/hr05/hr501',
          },
          {
            id: 'hr502',
            title: 'sidebar.hr05',
            messageId: 'sidebar.hr05.02',
            type: 'item',
            url: '/hr05/hr502',
          },
        ],

      },
      {
        id: 'hr06',
        title: 'sidebar.hr06',
        messageId: 'sidebar.hr06',
        type: 'collapse',
        icon: <MdOutlineSupervisorAccount />,
        children: [
          {
            id: 'hr601',
            title: 'sidebar.hr06',
            messageId: 'sidebar.hr06.01',
            type: 'item',
            url: '/hr06/hr601',
          },
        ],
      },
      {
        id: 'hr07',
        title: 'sidebar.hr07',
        messageId: 'sidebar.hr07',
        type: 'collapse',
        icon: <MdOutlineSettingsAccessibility />,
        children: [
          {
            id: 'hr701',
            title: 'sidebar.hr07',
            messageId: 'sidebar.hr07.01',
            type: 'item',
            url: '/hr07/hr701',
          },
          {
            id: 'hr702',
            title: 'sidebar.hr07',
            messageId: 'sidebar.hr07.02',
            type: 'item',
            url: '/hr07/hr702',
          },
          // {
          //   id: 'hr703',
          //   title: 'sidebar.hr07',
          //   messageId: 'sidebar.hr07.03',
          //   type: 'item',
          //   url: '/hr07/hr703',
          // },
          // {
          //   id: 'hr704',
          //   title: 'sidebar.hr07',
          //   messageId: 'sidebar.hr07.04',
          //   type: 'item',
          //   url: '/hr07/hr704',
          // },
        ],
      },
      {
        id: 'hr08',
        title: 'sidebar.hr08',
        messageId: 'sidebar.hr08',
        type: 'collapse',
        icon: <MdOutlineAttribution />,
        children: [
          {
            id: 'hr801',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.01',
            type: 'item',
            url: '/hr08/hr801',
          },
          {
            id: 'hr802',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.02',
            type: 'item',
            url: '/hr08/hr802',
          },
                    {
            id: 'hr803',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.03',
            type: 'item',
            url: '/hr08/hr803',
          },
                    {
            id: 'hr804',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.04',
            type: 'item',
            url: '/hr08/hr804',
          },
                    {
            id: 'hr805',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.05',
            type: 'item',
            url: '/hr08/hr805',
          },
                    {
            id: 'hr806',
            title: 'sidebar.hr08',
            messageId: 'sidebar.hr08.06',
            type: 'item',
            url: '/hr08/hr806',
          },
        ],
      },
      {
        id: 'hr09',
        title: 'sidebar.hr09',
        messageId: 'sidebar.hr09',
        type: 'collapse',
        icon: <MdHotelClass />,
        children: [
          {
            id: 'hr901',
            title: 'sidebar.hr09',
            messageId: 'sidebar.hr09.01',
            type: 'item',
            url: '/hr09/hr901',
          },
          {
            id: 'hr902',
            title: 'sidebar.hr09',
            messageId: 'sidebar.hr09.02',
            type: 'item',
            url: '/hr09/hr902',
          },
          {
            id: 'hr903',
            title: 'sidebar.hr09',
            messageId: 'sidebar.hr09.03',
            type: 'item',
            url: '/hr09/hr903',
          },
        ],
      },
 

    ],
  },

  {
    id: 'rp',
    title: 'sidebar.rp',
    messageId: 'sidebar.rp',
    type: 'group',
    icon: <MdOutlineTableChart />,
    children: [
      {
        id: 'hr10',
        title: 'sidebar.hr10',
        messageId: 'sidebar.hr10',
        type: 'collapse',
        icon: <MdOutlineTableChart />,
        children: [
          {
            id: 'hr1001',
            title: 'sidebar.hr10',
            messageId: 'sidebar.hr10.01',
            type: 'item',
            url: '/hr10/hr1001',
          },
          {
            id: 'hr1002',
            title: 'sidebar.hr10',
            messageId: 'sidebar.hr10.02',
            type: 'item',
            url: '/hr10/hr1002',
          },
          {
            id: 'hr1003',
            title: 'sidebar.hr10',
            messageId: 'sidebar.hr10.03',
            type: 'item',
            url: '/hr10/hr1003',
          },
        ],
      },

      {
        id: 'rp01',
        title: 'sidebar.rp01',
        messageId: 'sidebar.rp01',
        type: 'collapse',
        icon: <MdOutlineDocumentScanner />,
        children: [
          {
            id: 'rp101',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.01',
            type: 'item',
            url: '/rp01/rp101',
          },
          {
            id: 'rp102',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.02',
            type: 'item',
            url: '/rp01/rp102',
          },
          {
            id: 'rp103',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.03',
            type: 'item',
            url: '/rp01/rp103',
          },
          {
            id: 'rp104',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.04',
            type: 'item',
            url: '/rp01/rp104',
          },
          {
            id: 'rp105',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.05',
            type: 'item',
            url: '/rp01/rp105',
          },
                    {
            id: 'rp106',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.06',
            type: 'item',
            url: '/rp01/rp106',
          },
                    {
            id: 'rp107',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.07',
            type: 'item',
            url: '/rp01/rp107',
          },
                    {
            id: 'rp108',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.08',
            type: 'item',
            url: '/rp01/rp108',
          },
                    {
            id: 'rp109',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.09',
            type: 'item',
            url: '/rp01/rp109',
          },
                    {
            id: 'rp110',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.10',
            type: 'item',
            url: '/rp01/rp110',
          },
                    {
            id: 'rp111',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.11',
            type: 'item',
            url: '/rp01/rp111',
          },
                    {
            id: 'rp112',
            title: 'sidebar.rp01',
            messageId: 'sidebar.rp01.12',
            type: 'item',
            url: '/rp01/rp112',
          },
        ],
      },
      {
        id: 'rp02',
        title: 'sidebar.rp02',
        messageId: 'sidebar.rp02',
        type: 'collapse',
        icon: <MdOutlineFactCheck />,
        children: [
          {
            id: 'rp201',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.01',
            type: 'item',
            url: '/rp02/rp201',
          },
          {
            id: 'rp202',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.02',
            type: 'item',
            url: '/rp02/rp202',
          },
          {
            id: 'rp203',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.03',
            type: 'item',
            url: '/rp02/rp203',
          },
          {
            id: 'rp204',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.04',
            type: 'item',
            //icon:<MdOutlineFileOpen/>,
            url: '/rp02/rp204',
          },
          {
            id: 'rp205',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.05',
            type: 'item',
            //icon:<MdOutlineFileOpen/>,
            url: '/rp02/rp205',
          },
          {
            id: 'rp206',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.06',
            type: 'item',
            //icon:<MdOutlineFileOpen/>,
            url: '/rp02/rp206',
          },
          {
            id: 'rp207',
            title: 'sidebar.rp02',
            messageId: 'sidebar.rp02.07',
            type: 'item',
            //icon:<MdOutlineFileOpen/>,
            url: '/rp02/rp207',
          },
        ],
      },

    ],
  },

];
export default routesConfig;
