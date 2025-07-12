// hr1101/index.tsx
'use client';
import React from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Table from './Table';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { Data } from './types'; // *** เปลี่ยนมา import จากไฟล์กลาง ***

const initialAllRows: Data[] = [
  {
    research_id: 1,
    staff_id: 101,
    title: 'การศึกษาประสิทธิภาพของปุ๋ยชีวภาพในการเพิ่มผลผลิตข้าว',
    author_1: 'สมชาย รักไทย',
    author_2: 'สมหญิง ใจดี',
    work_type: 'บทความวิจัย',
    research_subtype: 'เกษตรศาสตร์',
    database_type: 'Scopus',
    journal_name: 'วารสารวิชาการเกษตร',
    publisher: 'สำนักพิมพ์เกษตรไทย',
    volume: '25',
    issue: '2',
    page: '112-120',
    published_year: '2566',
    doi: '10.1234/jav.2023.112',
    issn: '1234-5678',
    abstract: 'งานวิจัยนี้ศึกษาผลของปุ๋ยชีวภาพต่อการเจริญเติบโตและผลผลิตของข้าว...',
    keywords: 'ปุ๋ยชีวภาพ, ข้าว, ผลผลิต',
    attachment: 'research_001.pdf',
    created_at: '1 มกราคม 2567',
    updated_at: '1 มกราคม 2567',
    created_by: 1001,
  },
  {
    research_id: 2,
    staff_id: 102,
    title: 'การพัฒนาแอปพลิเคชันเพื่อการจัดการข้อมูลนักศึกษา',
    author_1: 'สุดาพร มีสุข',
    author_2: 'มานะ พัฒนา',
    work_type: 'งานประชุมวิชาการ',
    research_subtype: 'วิทยาการคอมพิวเตอร์',
    database_type: 'IEEE Xplore',
    journal_name: 'การประชุมวิชาการระดับชาติคอมพิวเตอร์และเทคโนโลยีสารสนเทศ',
    publisher: 'สมาคมคอมพิวเตอร์',
    volume: '2',
    issue: '1',
    page: '50-55',
    published_year: '2565',
    doi: '10.5678/ict.2022.050',
    issn: '9876-5432',
    abstract: 'แอปพลิเคชันนี้ถูกออกแบบมาเพื่อช่วยในการจัดการข้อมูลนักศึกษา...',
    keywords: 'แอปพลิเคชัน, การจัดการข้อมูล, นักศึกษา',
    attachment: 'research_002.pdf',
    created_at: '15 กุมภาพันธ์ 2567',
    updated_at: '15 กุมภาพันธ์ 2567',
    created_by: 1002,
  },
  {
    research_id: 3,
    staff_id: 103,
    title: 'ปัจจัยที่มีผลต่อพฤติกรรมการซื้อสินค้าออนไลน์ของผู้บริโภคในกรุงเทพฯ',
    author_1: 'ปรีชา วิจัย',
    work_type: 'บทความวิจัย',
    research_subtype: 'บริหารธุรกิจ',
    database_type: 'TCI',
    journal_name: 'วารสารบริหารธุรกิจ',
    publisher: 'มหาวิทยาลัยธุรกิจ',
    volume: '10',
    issue: '4',
    page: '200-210',
    published_year: '2566',
    doi: '10.9999/jba.2023.200',
    issn: '1111-2222',
    abstract: 'งานวิจัยนี้สำรวจปัจจัยทางเศรษฐกิจและสังคมที่มีผลต่อการตัดสินใจซื้อสินค้าออนไลน์...',
    keywords: 'พฤติกรรมการซื้อ, สินค้าออนไลน์, กรุงเทพฯ',
    attachment: 'research_003.pdf',
    created_at: '20 มีนาคม 2567',
    updated_at: '20 มีนาคม 2567',
    created_by: 1003,
  },
  {
    research_id: 4,
    staff_id: 104,
    title: 'การออกแบบและสร้างระบบควบคุมอุณหภูมิอัจฉริยะ',
    author_1: 'วิวัฒน์ แสงเดือน',
    author_2: 'จิราพร ดำรงค์',
    work_type: 'วิทยานิพนธ์',
    research_subtype: 'วิศวกรรมไฟฟ้า',
    database_type: 'ฐานข้อมูลมหาวิทยาลัย',
    journal_name: null,
    publisher: 'มหาวิทยาลัยเทคโนโลยี',
    volume: null,
    issue: null,
    page: null,
    published_year: '2564',
    doi: null,
    issn: null,
    abstract: 'งานวิทยานิพนธ์นี้นำเสนอการออกแบบและสร้างระบบควบคุมอุณหภูมิโดยใช้ไมโครคอนโทรลเลอร์...',
    keywords: 'ระบบควบคุม, อุณหภูมิ, อัจฉริยะ',
    attachment: 'research_004.pdf',
    created_at: '5 เมษายน 2567',
    updated_at: '5 เมษายน 2567',
    created_by: 1004,
  },
  {
    research_id: 5,
    staff_id: 105,
    title: 'ประสิทธิภาพของโปรแกรมการออกกำลังกายสำหรับผู้สูงอายุ',
    author_1: 'สมศรี สุขภาพดี',
    work_type: 'บทความวิจัย',
    research_subtype: 'พยาบาลศาสตร์',
    database_type: 'ThaiJo',
    journal_name: 'วารสารพยาบาลศาสตร์',
    publisher: 'สมาคมพยาบาลแห่งประเทศไทย',
    volume: '15',
    issue: '1',
    page: '30-38',
    published_year: '2566',
    doi: '10.7777/jns.2023.030',
    issn: '3333-4444',
    abstract: 'การวิจัยเชิงทดลองนี้ประเมินผลของโปรแกรมการออกกำลังกายที่มีต่อสุขภาพกายและใจของผู้สูงอายุ...',
    keywords: 'การออกกำลังกาย, ผู้สูงอายุ, สุขภาพ',
    attachment: 'research_005.pdf',
    created_at: '10 พฤษภาคม 2567',
    updated_at: '10 พฤษภาคม 2567',
    created_by: 1005,
  },
  {
    research_id: 6,
    staff_id: 101,
    title: 'การวิเคราะห์องค์ประกอบทางเคมีของพืชสมุนไพรไทยบางชนิด',
    author_1: 'ธิดารัตน์ เคมี',
    work_type: 'บทความวิจัย',
    research_subtype: 'วิทยาศาสตร์ชีวภาพ',
    database_type: 'Scopus',
    journal_name: 'วารสารวิทยาศาสตร์',
    publisher: 'สำนักพิมพ์วิทยาศาสตร์',
    volume: '30',
    issue: '3',
    page: '150-160',
    published_year: '2565',
    doi: '10.8888/jsc.2022.150',
    issn: '5555-6666',
    abstract: 'งานวิจัยนี้มุ่งเน้นการสกัดและวิเคราะห์สารออกฤทธิ์ทางชีวภาพจากพืชสมุนไพร...',
    keywords: 'พืชสมุนไพร, สารออกฤทธิ์, เคมี',
    attachment: 'research_006.pdf',
    created_at: '25 มิถุนายน 2567',
    updated_at: '25 มิถุนายน 2567',
    created_by: 1001,
  },
  {
    research_id: 7,
    staff_id: 102,
    title: 'การประยุกต์ใช้เทคโนโลยี Blockchain ในการจัดการห่วงโซ่อุปทาน',
    author_1: 'ชูศักดิ์ เทคโนโลยี',
    author_2: 'อรอนงค์ นวัตกรรม',
    work_type: 'งานประชุมวิชาการ',
    research_subtype: 'เทคโนโลยีสารสนเทศ',
    database_type: 'ACM Digital Library',
    journal_name: 'การประชุมวิชาการนานาชาติเทคโนโลยีสารสนเทศ',
    publisher: 'สมาคมเทคโนโลยีสารสนเทศ',
    volume: '5',
    issue: '1',
    page: '90-95',
    published_year: '2566',
    doi: '10.4321/icit.2023.090',
    issn: '7777-8888',
    abstract: 'งานนำเสนอฉบับนี้สำรวจศักยภาพของ Blockchain ในการเพิ่มประสิทธิภาพและความโปร่งใสของห่วงโซ่อุปทาน...',
    keywords: 'Blockchain, ห่วงโซ่อุปทาน, การจัดการ',
    attachment: 'research_007.pdf',
    created_at: '1 กรกฎาคม 2567',
    updated_at: '1 กรกฎาคม 2567',
    created_by: 1002,
  },
  {
    research_id: 8,
    staff_id: 103,
    title: 'ผลกระทบของสื่อสังคมออนไลน์ต่อพฤติกรรมทางการเมืองของคนรุ่นใหม่',
    author_1: 'วารุณี สังคม',
    work_type: 'บทความวิจัย',
    research_subtype: 'รัฐศาสตร์',
    database_type: 'TCI',
    journal_name: 'วารสารสังคมศาสตร์',
    publisher: 'มหาวิทยาลัยสังคมศาสตร์',
    volume: '20',
    issue: '1',
    page: '45-55',
    published_year: '2567',
    doi: '10.1010/jss.2024.045',
    issn: '9999-0000',
    abstract: 'การวิจัยนี้วิเคราะห์อิทธิพลของแพลตฟอร์มสื่อสังคมออนไลน์ต่อการมีส่วนร่วมทางการเมืองของเยาวชน...',
    keywords: 'สื่อสังคมออนไลน์, พฤติกรรมทางการเมือง, คนรุ่นใหม่',
    attachment: 'research_008.pdf',
    created_at: '10 สิงหาคม 2567',
    updated_at: '10 สิงหาคม 2567',
    created_by: 1003,
  },
  {
    research_id: 9,
    staff_id: 104,
    title: 'การจำลองทางคณิตศาสตร์ของการแพร่กระจายโรคระบาด',
    author_1: 'คณิต สาธิต',
    author_2: 'วิชัย คำนวณ',
    work_type: 'บทความวิจัย',
    research_subtype: 'คณิตศาสตร์ประยุกต์',
    database_type: 'arXiv',
    journal_name: null,
    publisher: null,
    volume: null,
    issue: null,
    page: null,
    published_year: '2565',
    doi: '10.0101/arxiv.2022.12345',
    issn: null,
    abstract: 'แบบจำลองทางคณิตศาสตร์ถูกพัฒนาขึ้นเพื่อทำนายการแพร่กระจายของโรคระบาด...',
    keywords: 'แบบจำลอง, โรคระบาด, คณิตศาสตร์',
    attachment: 'research_009.pdf',
    created_at: '15 กันยายน 2567',
    updated_at: '15 กันยายน 2567',
    created_by: 1004,
  },
  {
    research_id: 10,
    staff_id: 105,
    title: 'แนวทางการส่งเสริมการท่องเที่ยวเชิงวัฒนธรรมในชุมชนท้องถิ่น',
    author_1: 'การท่องเที่ยว ไทย',
    work_type: 'บทความวิจัย',
    research_subtype: 'การท่องเที่ยว',
    database_type: 'ThaiJo',
    journal_name: 'วารสารการท่องเที่ยวไทย',
    publisher: 'มหาวิทยาลัยการท่องเที่ยว',
    volume: '8',
    issue: '2',
    page: '70-78',
    published_year: '2566',
    doi: '10.2020/jtt.2023.070',
    issn: '1212-3434',
    abstract: 'งานวิจัยนี้สำรวจแนวทางการส่งเสริมและพัฒนาการท่องเที่ยวเชิงวัฒนธรรมเพื่อสร้างรายได้ให้กับชุมชน...',
    keywords: 'ท่องเที่ยวเชิงวัฒนธรรม, ชุมชน, การส่งเสริม',
    attachment: 'research_010.pdf',
    created_at: '20 ตุลาคม 2567',
    updated_at: '20 ตุลาคม 2567',
    created_by: 1005,
  },
  {
    research_id: 11,
    staff_id: 101,
    title: 'การศึกษาเปรียบเทียบเทคนิคการเรียนรู้ของเครื่องสำหรับการจัดหมวดหมู่ข้อความ',
    author_1: 'ปัญญา ประดิษฐ์',
    work_type: 'งานประชุมวิชาการ',
    research_subtype: 'ปัญญาประดิษฐ์',
    database_type: 'Scopus',
    journal_name: 'การประชุมวิชาการนานาชาติปัญญาประดิษฐ์',
    publisher: 'สมาคมปัญญาประดิษฐ์',
    volume: '3',
    issue: '1',
    page: '110-115',
    published_year: '2567',
    doi: '10.3030/ica.2024.110',
    issn: '4545-6767',
    abstract: 'งานวิจัยนี้นำเสนอการเปรียบเทียบประสิทธิภาพของอัลกอริทึมการเรียนรู้ของเครื่องหลายชนิดในการจัดหมวดหมู่ข้อความภาษาไทย...',
    keywords: 'การเรียนรู้ของเครื่อง, การจัดหมวดหมู่ข้อความ, ภาษาไทย',
    attachment: 'research_011.pdf',
    created_at: '1 พฤศจิกายน 2567',
    updated_at: '1 พฤศจิกายน 2567',
    created_by: 1001,
  },
  {
    research_id: 12,
    staff_id: 102,
    title: 'ผลของการใช้สื่อการสอนแบบผสมผสานต่อผลสัมฤทธิ์ทางการเรียนวิชาวิทยาศาสตร์',
    author_1: 'การศึกษา ไทย',
    work_type: 'บทความวิจัย',
    research_subtype: 'ศึกษาศาสตร์',
    database_type: 'ThaiJo',
    journal_name: 'วารสารการศึกษา',
    publisher: 'สถาบันวิจัยการศึกษา',
    volume: '22',
    issue: '3',
    page: '80-90',
    published_year: '2566',
    doi: '10.5050/jed.2023.080',
    issn: '8989-0101',
    abstract: 'การวิจัยกึ่งทดลองนี้ศึกษาผลของสื่อการสอนแบบผสมผสานต่อความเข้าใจและผลสัมฤทธิ์ทางการเรียนของนักเรียนชั้นมัธยมศึกษา...',
    keywords: 'สื่อการสอน, ผลสัมฤทธิ์ทางการเรียน, วิทยาศาสตร์',
    attachment: 'research_012.pdf',
    created_at: '10 ธันวาคม 2567',
    updated_at: '10 ธันวาคม 2567',
    created_by: 1002,
  },
  {
    research_id: 13,
    staff_id: 103,
    title: 'การวิเคราะห์ความเครียดจากการทำงานของบุคลากรทางการแพทย์ในช่วงสถานการณ์โควิด-19',
    author_1: 'สุขภาพ จิตใจ',
    work_type: 'บทความวิจัย',
    research_subtype: 'จิตวิทยา',
    database_type: 'PubMed',
    journal_name: 'วารสารสุขภาพจิต',
    publisher: 'กรมสุขภาพจิต',
    volume: '18',
    issue: '4',
    page: '190-200',
    published_year: '2565',
    doi: '10.6060/jhm.2022.190',
    issn: '0909-1212',
    abstract: 'งานวิจัยเชิงสำรวจนี้ประเมินระดับความเครียดและปัจจัยที่เกี่ยวข้องในกลุ่มบุคลากรทางการแพทย์...',
    keywords: 'ความเครียด, บุคลากรทางการแพทย์, โควิด-19',
    attachment: 'research_013.pdf',
    created_at: '1 มกราคม 2568',
    updated_at: '1 มกราคม 2568',
    created_by: 1003,
  },
  {
    research_id: 14,
    staff_id: 104,
    title: 'การออกแบบอาคารประหยัดพลังงานโดยใช้พลังงานแสงอาทิตย์',
    author_1: 'สถาปัตย์ ยั่งยืน',
    author_2: 'พลังงาน สะอาด',
    work_type: 'วิทยานิพนธ์',
    research_subtype: 'สถาปัตยกรรม',
    database_type: 'ฐานข้อมูลมหาวิทยาลัย',
    journal_name: null,
    publisher: 'มหาวิทยาลัยสถาปัตย์',
    volume: null,
    issue: null,
    page: null,
    published_year: '2564',
    doi: null,
    issn: null,
    abstract: 'วิทยานิพนธ์ฉบับนี้เน้นการออกแบบสถาปัตยกรรมที่คำนึงถึงการใช้พลังงานอย่างมีประสิทธิภาพ...',
    keywords: 'อาคารประหยัดพลังงาน, พลังงานแสงอาทิตย์, สถาปัตยกรรม',
    attachment: 'research_014.pdf',
    created_at: '15 มกราคม 2568',
    updated_at: '15 มกราคม 2568',
    created_by: 1004,
  },
  {
    research_id: 15,
    staff_id: 105,
    title: 'บทบาทของโซเชียลมีเดียในการสร้างแบรนด์สินค้าเกษตรอินทรีย์',
    author_1: 'การตลาด ดิจิทัล',
    work_type: 'บทความวิจัย',
    research_subtype: 'การตลาด',
    database_type: 'TCI',
    journal_name: 'วารสารการตลาด',
    publisher: 'สมาคมการตลาด',
    volume: '7',
    issue: '1',
    page: '25-35',
    published_year: '2566',
    doi: '10.7070/jmar.2023.025',
    issn: '2323-4545',
    abstract: 'งานวิจัยนี้วิเคราะห์กลยุทธ์การใช้โซเชียลมีเดียเพื่อส่งเสริมการรับรู้และการสร้างแบรนด์สินค้าเกษตรอินทรีย์...',
    keywords: 'โซเชียลมีเดีย, การสร้างแบรนด์, เกษตรอินทรีย์',
    attachment: 'research_015.pdf',
    created_at: '1 กุมภาพันธ์ 2568',
    updated_at: '1 กุมภาพันธ์ 2568',
    created_by: 1005,
  },
  {
    research_id: 16,
    staff_id: 101,
    title: 'การศึกษาพฤติกรรมการบริโภคอาหารฟาสต์ฟู้ดของนักศึกษามหาวิทยาลัย',
    author_1: 'โภชนาการ สุขภาพ',
    work_type: 'บทความวิจัย',
    research_subtype: 'สาธารณสุข',
    database_type: 'ThaiJo',
    journal_name: 'วารสารสาธารณสุขศาสตร์',
    publisher: 'มหาวิทยาลัยสาธารณสุข',
    volume: '12',
    issue: '2',
    page: '140-150',
    published_year: '2567',
    doi: '10.8080/jph.2024.140',
    issn: '5656-7878',
    abstract: 'งานวิจัยเชิงสำรวจนี้มีวัตถุประสงค์เพื่อศึกษาปัจจัยที่ส่งผลต่อการบริโภคอาหารฟาสต์ฟู้ดในกลุ่มนักศึกษา...',
    keywords: 'อาหารฟาสต์ฟู้ด, นักศึกษา, พฤติกรรมการบริโภค',
    attachment: 'research_016.pdf',
    created_at: '15 กุมภาพันธ์ 2568',
    updated_at: '15 กุมภาพันธ์ 2568',
    created_by: 1001,
  },
  {
    research_id: 17,
    staff_id: 102,
    title: 'การพัฒนาวิธีการตรวจจับความผิดปกติบนเครือข่ายคอมพิวเตอร์',
    author_1: 'ความปลอดภัย ไซเบอร์',
    work_type: 'บทความวิจัย',
    research_subtype: 'ความมั่นคงทางไซเบอร์',
    database_type: 'IEEE Xplore',
    journal_name: 'วารสารความมั่นคงทางไซเบอร์',
    publisher: 'สมาคมความปลอดภัยทางไซเบอร์',
    volume: '9',
    issue: '1',
    page: '60-70',
    published_year: '2566',
    doi: '10.9090/jcs.2023.060',
    issn: '0101-2323',
    abstract: 'งานวิจัยนี้เสนอวิธีการใหม่ในการตรวจจับการบุกรุกและพฤติกรรมที่ผิดปกติบนเครือข่ายคอมพิวเตอร์...',
    keywords: 'ความผิดปกติ, เครือข่าย, ความมั่นคง',
    attachment: 'research_017.pdf',
    created_at: '1 มีนาคม 2568',
    updated_at: '1 มีนาคม 2568',
    created_by: 1002,
  },
  {
    research_id: 18,
    staff_id: 103,
    title: 'การศึกษาคุณสมบัติทางกายภาพและเคมีของน้ำผึ้งจากแหล่งต่างๆ ในประเทศไทย',
    author_1: 'อาหาร ปลอดภัย',
    work_type: 'บทความวิจัย',
    research_subtype: 'วิทยาศาสตร์การอาหาร',
    database_type: 'Scopus',
    journal_name: 'วารสารวิทยาศาสตร์การอาหาร',
    publisher: 'สมาคมวิทยาศาสตร์การอาหาร',
    volume: '14',
    issue: '3',
    page: '120-130',
    published_year: '2567',
    doi: '10.1111/jfs.2024.120',
    issn: '3434-5656',
    abstract: 'งานวิจัยนี้วิเคราะห์องค์ประกอบทางเคมีและกายภาพของตัวอย่างน้ำผึ้งจากภูมิภาคต่างๆ เพื่อประเมินคุณภาพ...',
    keywords: 'น้ำผึ้ง, คุณสมบัติทางกายภาพ, คุณสมบัติทางเคมี',
    attachment: 'research_018.pdf',
    created_at: '15 มีนาคม 2568',
    updated_at: '15 มีนาคม 2568',
    created_by: 1003,
  },
  {
    research_id: 19,
    staff_id: 104,
    title: 'ผลกระทบของมลพิษทางอากาศต่อสุขภาพระบบทางเดินหายใจของประชากรในเขตเมือง',
    author_1: 'สิ่งแวดล้อม สุขภาพ',
    work_type: 'บทความวิจัย',
    research_subtype: 'สิ่งแวดล้อม',
    database_type: 'PubMed',
    journal_name: 'วารสารสิ่งแวดล้อมและสุขภาพ',
    publisher: 'สถาบันวิจัยสิ่งแวดล้อม',
    volume: '28',
    issue: '2',
    page: '95-105',
    published_year: '2566',
    doi: '10.1212/jeh.2023.095',
    issn: '6767-8989',
    abstract: 'งานวิจัยนี้ประเมินความสัมพันธ์ระหว่างระดับมลพิษทางอากาศและอุบัติการณ์ของโรคระบบทางเดินหายใจ...',
    keywords: 'มลพิษทางอากาศ, ระบบทางเดินหายใจ, สุขภาพ',
    attachment: 'research_019.pdf',
    created_at: '1 เมษายน 2568',
    updated_at: '1 เมษายน 2568',
    created_by: 1004,
  },
  {
    research_id: 20,
    staff_id: 105,
    title: 'การใช้เกมจำลองสถานการณ์เพื่อพัฒนาทักษะการตัดสินใจในนักเรียนมัธยมปลาย',
    author_1: 'นวัตกรรม การศึกษา',
    work_type: 'งานประชุมวิชาการ',
    research_subtype: 'ศึกษาศาสตร์',
    database_type: 'ACM Digital Library',
    journal_name: 'การประชุมวิชาการเทคโนโลยีการศึกษา',
    publisher: 'สมาคมเทคโนโลยีการศึกษา',
    volume: '6',
    issue: '1',
    page: '130-135',
    published_year: '2567',
    doi: '10.1313/iet.2024.130',
    issn: '9090-1212',
    abstract: 'งานนำเสนอฉบับนี้สำรวจผลของการใช้เกมจำลองสถานการณ์ต่อความสามารถในการตัดสินใจของนักเรียน...',
    keywords: 'เกมจำลองสถานการณ์, ทักษะการตัดสินใจ, การศึกษา',
    attachment: 'research_020.pdf',
    created_at: '15 เมษายน 2568',
    updated_at: '15 เมษายน 2568',
    created_by: 1005,
  },
];

const Hr1101Page = () => {
  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = React.useState<Data | null>(null);
  const [tableData, setTableData] = React.useState<Data[]>(initialAllRows);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const intl = useIntl();

  const labeltext = () => {
    return intl.formatMessage({ id: 'sidebar.hr11.01' });
  };

  const dialogTitle = React.useMemo(() => {
    if (dialogMode === 'add') return "เพิ่ม" + labeltext();
    if (dialogMode === 'edit') return "แก้ไข" + labeltext();
    if (dialogMode === 'view') return "รายละเอียด" + labeltext();
    return "";
  }, [dialogMode, labeltext]);

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      research_id: 0,
      title: '',
      author_1: '',
      work_type: '',
      published_year: '',
      created_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      updated_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      created_by: 1001,
    });
    setAddTaskOpen(true);
    setErrors({});
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => {
      // เพิ่มการตรวจสอบ prevData เพื่อให้ TypeScript มั่นใจว่าไม่ใช่ null
      if (!prevData) {
        // หาก prevData เป็น null โดยไม่คาดคิด (ซึ่งไม่ควรเกิดขึ้นใน flow ปกติ)
        // เราจะสร้าง Object ใหม่เพื่อรองรับข้อมูล
        return { [name]: value } as Data; // Cast เป็น Data เพื่อให้ type เข้ากันได้
      }
      return {
        ...prevData,
        [name]: value
      };
    });
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!currentData?.title) {
      newErrors.title = 'กรุณากรอกชื่อเรื่องผลงานวิจัย';
    }
    if (!currentData?.author_1) {
      newErrors.author_1 = 'กรุณากรอกผู้เขียนคนที่ 1';
    }
    if (!currentData?.work_type) {
      newErrors.work_type = 'กรุณากรอกประเภทผลงานวิจัย';
    }
    if (!currentData?.published_year) {
      newErrors.published_year = 'กรุณากรอกปีที่ตีพิมพ์';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveData = () => {
    if (!validateData()) {
      Swal.fire({
        icon: 'warning',
        title: 'คำเตือน!',
        text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    // เพิ่มการตรวจสอบ currentData ที่นี่เพื่อให้ TypeScript มั่นใจว่าไม่ใช่ null
    if (!currentData) {
      console.error("currentData เป็น null โดยไม่คาดคิดใน handleSaveData หลังจาก validation.");
      return;
    }

    if (dialogMode === 'add') {
      const newId = tableData.length > 0 ?
        Math.max(...tableData.map(d => d.research_id)) + 1 : 1;
      const newData: Data = {
        ...currentData, // ไม่ต้องใช้ ! เนื่องจากมีการตรวจสอบ null แล้ว
        research_id: newId,
        created_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
        updated_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' }),
      };
      setTableData(prevData => [...prevData, newData]);
      Swal.fire('สำเร็จ!', 'เพิ่มข้อมูลเรียบร้อยแล้ว', 'success');
    } else if (dialogMode === 'edit') {
      setTableData(prevData =>
        prevData.map(data =>
          data.research_id === currentData.research_id ? { // ไม่ต้องใช้ !
            ...currentData, // ไม่ต้องใช้ !
            updated_at: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: '2-digit', timeZone: 'Asia/Bangkok' })
          } : data
        )
      );
      Swal.fire('สำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    onCloseAddTask();
  };

  const handleViewData = (data: Data) => {
    setDialogMode('view');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleEditData = (data: Data) => {
    setDialogMode('edit');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

  const handleDeleteData = async (id: number) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณต้องการลบข้อมูลนี้ใช่ไหม?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
      setTableData(prevData => prevData.filter(data => data.research_id !== id));
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลของคุณถูกลบเรียบร้อยแล้ว',
        'success'
      );
    }
  };

  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }}
      title={<IntlMessages id="sidebar.hr11.01" />}
      action={
        <Button
          variant="outlined"
          color="primary"
          sx={{
            padding: '3px 10px',
            borderRadius: 30,
            '& .MuiSvgIcon-root': {
              fontSize: 20,
            },
          }}
          startIcon={<AddIcon />}
          onClick={onOpenAddTask}
        >
          เพิ่มข้อมูล
        </Button>
      }
    >
      <Table
        data={tableData}
        setTableData={setTableData}
        onView={handleViewData}
        onEdit={handleEditData}
        onDelete={handleDeleteData}
      />
      <AppDialog
        dividers
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
      >
        <Box>
          <TextField
            label={"รหัส"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.research_id || ''}
            name="research_id"
            onChange={handleInputChange}
            disabled={dialogMode !== 'add'}
          />
          <TextField
            fullWidth
            label={"ชื่อเรื่องผลงานวิจัย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.title || ''}
            name="title"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label={"ผู้เขียนคนที่ 1"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.author_1 || ''}
            name="author_1"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.author_1}
            helperText={errors.author_1}
          />
          <TextField
            fullWidth
            label={"ผู้เขียนคนที่ 2"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.author_2 || ''}
            name="author_2"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ประเภทผลงานวิจัย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_type || ''}
            name="work_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_type}
            helperText={errors.work_type}
          />
          <TextField
            fullWidth
            label={"ประเภทย่อยของผลงานวิจัย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.research_subtype || ''}
            name="research_subtype"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ประเภทฐานข้อมูลที่เผยแพร่"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.database_type || ''}
            name="database_type"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ชื่อวารสาร"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.journal_name || ''}
            name="journal_name"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"สำนักพิมพ์"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.publisher || ''}
            name="publisher"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            label={"เล่มที่"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.volume || ''}
            name="volume"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            label={"ฉบับที่"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.issue || ''}
            name="issue"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            label={"หน้าที่ตีพิมพ์"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.page || ''}
            name="page"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            label={"ปีที่ตีพิมพ์"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.published_year || ''}
            name="published_year"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.published_year}
            helperText={errors.published_year}
          />
          <TextField
            fullWidth
            label={"DOI"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.doi || ''}
            name="doi"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ISSN"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.issn || ''}
            name="issn"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"บทคัดย่อ"}
            variant="outlined"
            margin="normal"
            size="small"
            multiline
            rows={4}
            value={currentData?.abstract || ''}
            name="abstract"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"คำสำคัญ"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.keywords || ''}
            name="keywords"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ไฟล์แนบผลงานวิจัย"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.attachment || ''}
            name="attachment"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label={"ผู้บันทึกข้อมูล (รหัสพนักงาน)"}
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.created_by || ''}
            name="created_by"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseAddTask} color="secondary">
              {dialogMode === 'view' ? 'ปิด' : 'ยกเลิก'}
            </Button>
            {dialogMode !== 'view' && (
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSaveData}>
                บันทึก
              </Button>
            )}
          </Box>
        </Box>
      </AppDialog>
    </AppCard>
  );
};

export default Hr1101Page;