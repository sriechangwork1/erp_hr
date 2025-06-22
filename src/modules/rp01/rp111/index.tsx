// rp111/index.tsx
'use client'; 
import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  TablePagination,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  FacultyData,
  StaffMember,
  StaffMemberWithFaculty,
  Column,
  EducationHistory,
} from './types'; // ตรวจสอบว่า path นี้ถูกต้องและมีการ export type เหล่านี้แล้ว
import {
  initialFacultyData,
  processStaffData,
  handleExportToPdf,
  handleExportToExcel,
} from './utils';
import { jsPDF } from 'jspdf';
import { addFont } from './utils/fontLoader'; // Ensure this path is correct

// Call addFont to load THSarabunNew into jsPDF
if (typeof window !== 'undefined') {
  const tempDoc = new jsPDF();
  addFont(tempDoc);
}

// --- Helper function to simulate education history ---
const generateEducationHistory = (): EducationHistory[] => {
  const histories: EducationHistory[] = [];
  const eduLevels = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'];
  const degrees = ['วท.บ.', 'ศศ.บ.', 'บธ.บ.', 'วศ.ม.', 'ศศ.ม.', 'บธ.ม.', 'ปร.ด.', 'ด.ร.'];
  const majors = [
    'วิทยาการคอมพิวเตอร์', 'วิศวกรรมไฟฟ้า', 'ภาษาไทย', 'บริหารธุรกิจ', 'เคมี', 'ฟิสิกส์',
    'วิทยาศาสตร์สิ่งแวดล้อม', 'รัฐประศาสนศาสตร์', 'นิติศาสตร์', 'บัญชี', 'การจัดการ', 'เศรษฐศาสตร์'
  ];
  const universities = [
    'มหาวิทยาลัยมหาสารคาม', 'จุฬาลงกรณ์มหาวิทยาลัย', 'มหาวิทยาลัยเกษตรศาสตร์',
    'มหาวิทยาลัยเชียงใหม่', 'มหาวิทยาลัยขอนแก่น', 'มหาวิทยาลัยธรรมศาสตร์',
    'สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง', 'มหาวิทยาลัยศิลปากร', 'มหาวิทยาลัยสงขลานครินทร์'
  ];

  const numDegrees = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 degrees

  for (let i = 0; i < numDegrees; i++) {
    const levelIndex = Math.min(i, eduLevels.length - 1);
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const major = majors[Math.floor(Math.random() * majors.length)];
    const university = universities[Math.floor(Math.random() * universities.length)];
    const gradYear = 1980 + Math.floor(Math.random() * 40) + (i * 3);

    histories.push({
      educationLevel: eduLevels[levelIndex],
      degree,
      major,
      university,
      gradYear,
    });
  }

  histories.sort((a, b) => a.gradYear - b.gradYear);

  return histories;
};

// --- Mock Staff Data (approx. 40 entries) ---
const mockRawStaffData: any[] = [
  {
    "staff_id": 5000001, "citizen_id": "1100400741045", "first_name_th": "สมชาย", "last_name_th": "ใจดี",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "081-111-1111", "email1": "somchai.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000002, "citizen_id": "1100400741046", "first_name_th": "สมหญิง", "last_name_th": "มีสุข",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "081-222-2222", "email1": "somying.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000003, "citizen_id": "1100400741047", "first_name_th": "มานะ", "last_name_th": "ขยัน",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "081-333-3333", "email1": "mana.k@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000004, "citizen_id": "1100400741048", "first_name_th": "นารี", "last_name_th": "ศรีสุข",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "081-444-4444", "email1": "naree.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000005, "citizen_id": "1100400741049", "first_name_th": "ปรีชา", "last_name_th": "เจริญ",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการศึกษา",
    "faculty_id": "01", "phone_number": "081-555-5555", "email1": "preecha.j@example.com", "STAFFTYPE_ID": 2, "work_line_id": 101
  },
  {
    "staff_id": 5000006, "citizen_id": "1100400741050", "first_name_th": "กานดา", "last_name_th": "งดงาม",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่บริหารงานทั่วไป",
    "faculty_id": "01", "phone_number": "081-666-6666", "email1": "kanda.n@example.com", "STAFFTYPE_ID": 2, "work_line_id": 102
  },
  {
    "staff_id": 5000007, "citizen_id": "1100400741051", "first_name_th": "ชูชัย", "last_name_th": "รุ่งเรือง",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "081-777-7777", "email1": "chuchai.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000008, "citizen_id": "1100400741052", "first_name_th": "วลัย", "last_name_th": "สดใส",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "081-888-8888", "email1": "walai.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000009, "citizen_id": "1100400741053", "first_name_th": "ทรงพล", "last_name_th": "ยิ่งยง",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "081-999-9999", "email1": "songpol.y@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000010, "citizen_id": "1100400741054", "first_name_th": "อรุณี", "last_name_th": "รัศมี",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "082-000-0000", "email1": "arunee.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000011, "citizen_id": "1100400741055", "first_name_th": "บรรจง", "last_name_th": "ดีเลิศ",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการคอมพิวเตอร์",
    "faculty_id": "02", "phone_number": "082-111-1111", "email1": "banjong.d@example.com", "STAFFTYPE_ID": 2, "work_line_id": 103
  },
  {
    "staff_id": 5000012, "citizen_id": "1100400741056", "first_name_th": "ดารุณี", "last_name_th": "พร้อมเพรียง",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่พัสดุ",
    "faculty_id": "02", "phone_number": "082-222-2222", "email1": "darunee.p@example.com", "STAFFTYPE_ID": 2, "work_line_id": 104
  },
  {
    "staff_id": 5000013, "citizen_id": "1100400741057", "first_name_th": "วิชัย", "last_name_th": "ตั้งใจ",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิเคราะห์นโยบายและแผน",
    "faculty_id": "03", "phone_number": "082-333-3333", "email1": "wichai.t@example.com", "STAFFTYPE_ID": 2, "work_line_id": 105
  },
  {
    "staff_id": 5000014, "citizen_id": "1100400741058", "first_name_th": "พรทิพย์", "last_name_th": "โชคดี",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่การเงินและบัญชี",
    "faculty_id": "03", "phone_number": "082-444-4444", "email1": "porntip.c@example.com", "STAFFTYPE_ID": 2, "work_line_id": 106
  },
  {
    "staff_id": 5000015, "citizen_id": "1100400741059", "first_name_th": "ชาญชัย", "last_name_th": "แข็งขัน",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักประชาสัมพันธ์",
    "faculty_id": "03", "phone_number": "082-555-5555", "email1": "chanchai.k@example.com", "STAFFTYPE_ID": 2, "work_line_id": 107
  },
  {
    "staff_id": 5000016, "citizen_id": "1100400741060", "first_name_th": "รุ่งฤดี", "last_name_th": "สดใส",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่ธุรการ",
    "faculty_id": "04", "phone_number": "082-666-6666", "email1": "rungrudee.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": 102
  },
  {
    "staff_id": 5000017, "citizen_id": "1100400741061", "first_name_th": "พิพัฒน์", "last_name_th": "พัฒนา",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการคอมพิวเตอร์",
    "faculty_id": "04", "phone_number": "082-777-7777", "email1": "pipat.p@example.com", "STAFFTYPE_ID": 2, "work_line_id": 103
  },
  {
    "staff_id": 5000018, "citizen_id": "1100400741062", "first_name_th": "จันทร์เพ็ญ", "last_name_th": "งามยิ่ง",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "082-888-8888", "email1": "janpen.g@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000019, "citizen_id": "1100400741063", "first_name_th": "พงษ์ศักดิ์", "last_name_th": "มั่นคง",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "082-999-9999", "email1": "pongsak.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000020, "citizen_id": "1100400741064", "first_name_th": "วิภาดา", "last_name_th": "รุ่งโรจน์",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิชาการเงินและบัญชี",
    "faculty_id": "05", "phone_number": "083-000-0000", "email1": "wipada.r@example.com", "STAFFTYPE_ID": 2, "work_line_id": 106
  },
  {
    "staff_id": 5000021, "citizen_id": "1100400741065", "first_name_th": "สมคิด", "last_name_th": "สุขสบาย",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "083-111-1111", "email1": "somkid.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000022, "citizen_id": "1100400741066", "first_name_th": "จิราพร", "last_name_th": "ชื่นใจ",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "083-222-2222", "email1": "jiraporn.c@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000023, "citizen_id": "1100400741067", "first_name_th": "ประเสริฐ", "last_name_th": "ศรีไทย",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "083-333-3333", "email1": "prasert.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000024, "citizen_id": "1100400741068", "first_name_th": "ดวงพร", "last_name_th": "สุขสันต์",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิทยาศาสตร์",
    "faculty_id": "01", "phone_number": "083-444-4444", "email1": "duangporn.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": 108
  },
  {
    "staff_id": 5000025, "citizen_id": "1100400741069", "first_name_th": "วีรศักดิ์", "last_name_th": "เจริญยิ่ง",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "083-555-5555", "email1": "weerasak.j@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000026, "citizen_id": "1100400741070", "first_name_th": "สุรีย์พร", "last_name_th": "สุขใจ",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "083-666-6666", "email1": "sureeporn.s@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000027, "citizen_id": "1100400741071", "first_name_th": "ธนพล", "last_name_th": "มีชัย",
    "academic_title": null, "academic_standing_id": null, "position_work": "ช่างเทคนิค",
    "faculty_id": "02", "phone_number": "083-777-7777", "email1": "thanapol.m@example.com", "STAFFTYPE_ID": 2, "work_line_id": 109
  },
  {
    "staff_id": 5000028, "citizen_id": "1100400741072", "first_name_th": "เพ็ญศรี", "last_name_th": "งามตา",
    "academic_title": null, "academic_standing_id": null, "position_work": "ผู้ปฏิบัติงานบริหาร",
    "faculty_id": "03", "phone_number": "083-888-8888", "email1": "pensri.g@example.com", "STAFFTYPE_ID": 2, "work_line_id": 110
  },
  {
    "staff_id": 5000029, "citizen_id": "1100400741073", "first_name_th": "สุรชัย", "last_name_th": "มั่งมี",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักวิเทศสัมพันธ์",
    "faculty_id": "03", "phone_number": "083-999-9999", "email1": "surachai.m@example.com", "STAFFTYPE_ID": 2, "work_line_id": 111
  },
  {
    "staff_id": 5000030, "citizen_id": "1100400741074", "first_name_th": "อารีรัตน์", "last_name_th": "สุขเกษม",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่ธุรการ",
    "faculty_id": "04", "phone_number": "084-000-0000", "email1": "areerat.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": 102
  },
  {
    "staff_id": 5000031, "citizen_id": "1100400741075", "first_name_th": "ไพโรจน์", "last_name_th": "รุ่งเรือง",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "084-111-1111", "email1": "pairoj.r@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000032, "citizen_id": "1100400741076", "first_name_th": "วรรณดี", "last_name_th": "มีทรัพย์",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "05", "phone_number": "084-222-2222", "email1": "wannee.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000033, "citizen_id": "1100400741077", "first_name_th": "สมพร", "last_name_th": "เกิดผล",
    "academic_title": null, "academic_standing_id": null, "position_work": "บรรณารักษ์",
    "faculty_id": "05", "phone_number": "084-333-3333", "email1": "somporn.k@example.com", "STAFFTYPE_ID": 2, "work_line_id": 112
  },
  {
    "staff_id": 5000034, "citizen_id": "1100400741078", "first_name_th": "เอกชัย", "last_name_th": "บุญทวี",
    "academic_title": "ศาสตราจารย์", "academic_standing_id": 1, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "084-444-4444", "email1": "ekachai.b@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000035, "citizen_id": "1100400741079", "first_name_th": "ธิดารัตน์", "last_name_th": "มณีรัตน์",
    "academic_title": "อาจารย์", "academic_standing_id": 4, "position_work": "อาจารย์",
    "faculty_id": "01", "phone_number": "084-555-5555", "email1": "tidarat.m@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000036, "citizen_id": "1100400741080", "first_name_th": "ณัฐพล", "last_name_th": "สุขเกษม",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักจัดการงานทั่วไป",
    "faculty_id": "01", "phone_number": "084-666-6666", "email1": "nattapol.s@example.com", "STAFFTYPE_ID": 2, "work_line_id": 113
  },
  {
    "staff_id": 5000037, "citizen_id": "1100400741081", "first_name_th": "กมลพร", "last_name_th": "งามวิไล",
    "academic_title": "รองศาสตราจารย์", "academic_standing_id": 2, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "084-777-7777", "email1": "kamonporn.n@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000038, "citizen_id": "1100400741082", "first_name_th": "ธวัชชัย", "last_name_th": "เด่นชัย",
    "academic_title": "ผู้ช่วยศาสตราจารย์", "academic_standing_id": 3, "position_work": "อาจารย์",
    "faculty_id": "02", "phone_number": "084-888-8888", "email1": "thawatchai.d@example.com", "STAFFTYPE_ID": 1, "work_line_id": null
  },
  {
    "staff_id": 5000039, "citizen_id": "1100400741083", "first_name_th": "รัตนาภรณ์", "last_name_th": "เพลินจิต",
    "academic_title": null, "academic_standing_id": null, "position_work": "เจ้าหน้าที่การเงิน",
    "faculty_id": "03", "phone_number": "084-999-9999", "email1": "rattanaporn.p@example.com", "STAFFTYPE_ID": 2, "work_line_id": 106
  },
  {
    "staff_id": 5000040, "citizen_id": "1100400741084", "first_name_th": "ภาคภูมิ", "last_name_th": "ยิ่งเจริญ",
    "academic_title": null, "academic_standing_id": null, "position_work": "นักทรัพยากรบุคคล",
    "faculty_id": "04", "phone_number": "085-000-0000", "email1": "pakpoom.y@example.com", "STAFFTYPE_ID": 2, "work_line_id": 114
  }
];


const Rp111: React.FC = () => {
  const [selectedFacultyName, setSelectedFacultyName] = useState<string | null>(null);
  const [facultyNameInput, setFacultyNameInput] = useState<string>('');
  const [staffTypeFilter, setStaffTypeFilter] = useState<'all' | 'academic' | 'support'>('all');
  const [staffNameSearch, setStaffNameSearch] = useState<string>(''); // New state for staff name search

  // --- States สำหรับ TablePagination ---
  const [page, setPage] = useState(0); // หน้าปัจจุบัน (เริ่มต้นที่ 0)
  const [rowsPerPage, setRowsPerPage] = useState(10); // จำนวนแถวต่อหน้า (เริ่มต้นที่ 10)

  // Use the local mockRawStaffData directly
  const rawStaffData = useMemo(() => mockRawStaffData, []);

  // Process and combine staff data with faculty info and education history
  const processedStaffData = useMemo<StaffMemberWithFaculty[]>(() => {
    // Pass generateEducationHistory as an argument to processStaffData
    return processStaffData(rawStaffData, initialFacultyData, generateEducationHistory);
  }, [rawStaffData, initialFacultyData]);


  // Create faculty name options for Autocomplete
  const facultyNameOptions = useMemo(() => {
    return Array.from(new Set(initialFacultyData.map(f => f.FACULTYNAME)));
  }, [initialFacultyData]);

  // Filtered staff data based on user selections
  const filteredStaffData = useMemo(() => {
    // เมื่อมีการเปลี่ยนตัวกรอง (faculty, staff type, staff name) ให้รีเซ็ต page กลับไปที่ 0
    setPage(0); // <-- เพิ่มการรีเซ็ต page ที่นี่
    const lowerCaseSearch = staffNameSearch.toLowerCase();
    return processedStaffData.filter((staff) => {
      const matchesFacultyName = selectedFacultyName
        ? staff.facultyName === selectedFacultyName
        : staff.facultyName.toLowerCase().includes(facultyNameInput.toLowerCase());

      const matchesStaffType =
        staffTypeFilter === 'all' ||
        (staffTypeFilter === 'academic' && staff.staffType === 'สายวิชาการ') ||
        (staffTypeFilter === 'support' && staff.staffType === 'สายสนับสนุนวิชาการ');

      // New filter for staff name (case-insensitive)
      const matchesStaffName =
        !staffNameSearch || // If search field is empty, it always matches
        staff.first_name_th.toLowerCase().includes(lowerCaseSearch) ||
        staff.last_name_th.toLowerCase().includes(lowerCaseSearch) ||
        `${staff.first_name_th} ${staff.last_name_th}`.toLowerCase().includes(lowerCaseSearch);

      return matchesFacultyName && matchesStaffType && matchesStaffName;
    });
  }, [processedStaffData, selectedFacultyName, facultyNameInput, staffTypeFilter, staffNameSearch]);

  // --- Handlers สำหรับ TablePagination ---
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // รีเซ็ตหน้ากลับไปที่ 0 เมื่อเปลี่ยนจำนวนแถวต่อหน้า
  };

  // --- ข้อมูลที่แสดงในหน้าปัจจุบัน (หลังจากกรองและแบ่งหน้า) ---
  const displayedStaffData = useMemo(() => {
    return filteredStaffData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredStaffData, page, rowsPerPage]);


  const columns: Column[] = [
    { id: 'staffFullName', label: 'ชื่อ-นามสกุล', minWidth: 150,
      format: (value: StaffMemberWithFaculty) => `${value.first_name_th} ${value.last_name_th}` },
    { id: 'staffTypeDisplay', label: 'สายงาน', minWidth: 100,
      format: (value: StaffMemberWithFaculty) => value.staffType },
    { id: 'facultyName', label: 'หน่วยงาน', minWidth: 150 },
    { id: 'degrees', label: 'ประวัติการศึกษา', minWidth: 300,
      format: (value: StaffMemberWithFaculty) => (
        <Box sx={{ whiteSpace: 'pre-wrap' }}>
          {value.educationHistory.map((edu, idx) => (
            <Typography key={idx} variant="body2">
              {`${edu.educationLevel}: ${edu.degree} (${edu.major}), ${edu.university} (${edu.gradYear})`}
            </Typography>
          ))}
        </Box>
      )
    },
    { id: 'phone_number', label: 'เบอร์โทร', minWidth: 100 },
    { id: 'email1', label: 'อีเมล', minWidth: 150 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        รายงานประวัติการศึกษาบุคลากร (RP111)
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Autocomplete
          options={facultyNameOptions}
          value={selectedFacultyName}
          onInputChange={(_, newInputValue) => {
            setFacultyNameInput(newInputValue);
            if (newInputValue === '') {
              setSelectedFacultyName(null);
            }
          }}
          onChange={(_, newValue: string | null) => {
            setSelectedFacultyName(newValue);
            setFacultyNameInput(newValue || '');
          }}
          sx={{ minWidth: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="ค้นหาชื่อหน่วยงาน" variant="outlined" />
          )}
          freeSolo
        />

        {/* New search field for staff name */}
        <TextField
          label="ค้นหาชื่อ-นามสกุลบุคลากร"
          variant="outlined"
          value={staffNameSearch}
          onChange={(e) => setStaffNameSearch(e.target.value)}
          sx={{ minWidth: 250 }}
        />
        
        {/* สายงาน */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="staff-type-label">สายงาน</InputLabel>
          <Select
            labelId="staff-type-label"
            value={staffTypeFilter}
            label="สายงาน"
            onChange={(e) => setStaffTypeFilter(e.target.value as 'all' | 'academic' | 'support')}
          >
            <MenuItem value="all">ทั้งหมด</MenuItem>
            <MenuItem value="academic">สายวิชาการ</MenuItem>
            <MenuItem value="support">สายสนับสนุน</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Export Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          onClick={() => handleExportToPdf(filteredStaffData, 'N/A', staffTypeFilter, selectedFacultyName || facultyNameInput)}
        >
          Export to PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<DescriptionIcon />}
          onClick={() => handleExportToExcel(filteredStaffData, 'N/A', staffTypeFilter, selectedFacultyName || facultyNameInput)}
        >
          Export to Excel
        </Button>
      </Box>

      {/* Staff Data Table and Pagination wrapped in a Fragment */}
      <> {/* <-- เพิ่ม Fragment เปิดที่นี่ */}
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          ข้อมูลบุคลากร
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="staff education history table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id as string}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedStaffData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    ไม่พบข้อมูลบุคลากรสำหรับตัวกรองที่เลือก
                  </TableCell>
                </TableRow>
              ) : (
                displayedStaffData.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.staff_id}>
                    {columns.map((column) => {
                      let value: any;
                      if (column.id === 'staffFullName') {
                        value = row;
                      } else if (column.id === 'staffTypeDisplay') {
                        value = row;
                      } else if (column.id === 'degrees') {
                        value = row;
                      } else {
                        value = row[column.id as keyof StaffMemberWithFaculty];
                      }

                      return (
                        <TableCell key={column.id as string} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* TablePagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, { label: 'ทั้งหมด', value: -1 }]}
          component="div"
          count={filteredStaffData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="จำนวนบุคลากรต่อหน้า:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
          }
        />
      </> {/* <-- เพิ่ม Fragment ปิดที่นี่ */}
    </Box>
  );
};

export default Rp111; 