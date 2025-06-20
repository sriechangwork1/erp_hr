// src/pages/hr914/index.tsx
'use client'; // <-- บรรทัดนี้ต้องอยู่บรรทัดแรกสุดของไฟล์

import React, { useState } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Alert
} from '@mui/material';

// =========================================================
// 1. กำหนด Interface สำหรับโครงสร้างข้อมูล
// =========================================================
interface Staff {
  staff_id: number;
  faculty_id: string; // จำเป็นต้องใช้เพื่อเชื่อมโยงกับคณะ
  // อื่นๆ ที่อาจจะเกี่ยวข้อง เช่น academic_title, position_work, STAFFTYPE_ID
}

interface Faculty {
  FACULTYID: string;
  FACULTYNAME: string;
}

interface EducationEntry {
  staff_id: number;
  degree: string; // เช่น "ปริญญาเอก", "ปริญญาโท", "ปริญญาตรี", "อนุปริญญา"
  major: string;
  university: string;
  graduation_year: number;
}

interface EducationReportData {
  [facultyName: string]: {
    [degreeLevel: string]: number;
  };
}

// Interface สำหรับ Props ที่จะส่งไปยัง Client Component
interface HR914EducationReportsProps {
  educationReport: EducationReportData | null;
  error: string | null;
}

// =========================================================
// 2. ลำดับของวุฒิการศึกษา (สำหรับจัดเรียงและหาวุฒิสูงสุด)
// =========================================================
const DEGREE_ORDER: { [key: string]: number } = {
  'ปริญญาเอก': 4,
  'ปริญญาโท': 3,
  'ปริญญาตรี': 2,
  'อนุปริญญา': 1,
  'อื่นๆ': 0 // สำหรับวุฒิที่ไม่ตรงกับข้างบน
};

const ORDERED_DEGREES = ['ปริญญาเอก', 'ปริญญาโท', 'ปริญญาตรี', 'อนุปริญญา', 'อื่นๆ'];


// =========================================================
// 3. getServerSideProps: โค้ดส่วนนี้จะรันบน SERVER
//    และใช้ข้อมูลจำลอง (Mock Data) สำหรับประวัติการศึกษา
// =========================================================
export async function getServerSideProps() {
  let educationReport: EducationReportData | null = null;
  let error: string | null = null;

  try {
    console.log('--- getServerSideProps: เริ่มต้นประมวลผลข้อมูลประวัติการศึกษา (ใช้ข้อมูลจำลอง) ---');

    // *** ข้อมูลจำลอง (MOCK DATA) ***
    // Mock Faculty Data (ใช้ร่วมกับ hr913)
    const mockFacultyData = {
      sys_faculty: [
        { "FACULTYID": "1", "FACULTYNAME": "คณะวิศวกรรมศาสตร์" },
        { "FACULTYID": "2", "FACULTYNAME": "คณะวิทยาศาสตร์" },
        { "FACULTYID": "3", "FACULTYNAME": "สำนักงานอธิการบดี" },
        { "FACULTYID": "4", "FACULTYNAME": "คณะแพทย์ศาสตร์" },
        { "FACULTYID": "5", "FACULTYNAME": "คณะศิลปกรรมศาสตร์" },
      ]
    };

    // Mock Staff Data (ใช้แค่ staff_id และ faculty_id สำหรับเชื่อมโยง)
    // ควรเป็นข้อมูลชุดเดียวกับที่ใช้ใน hr913 เพื่อให้เชื่อมโยงกันได้
    const mockStaffData = {
        Staff: [
            { "staff_id": 101, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ศ." },
            { "staff_id": 102, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ผู้ช่วยศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ผศ." },
            { "staff_id": 103, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิชาการคอมพิวเตอร์", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 104, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." },
            { "staff_id": 105, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "เจ้าหน้าที่บริหารงานทั่วไป", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 106, "faculty_id": "3", "academic_position_id": "0", "support_position_id": "0", "position_work": "ลูกจ้างประจำ", "STAFFTYPE_ID": "30", "academic_title": null },
            { "staff_id": 107, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิชาการศึกษา", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 108, "faculty_id": "2", "academic_position_id": "0", "support_position_id": "0", "position_work": "นักวิจัย", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 109, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "ผู้ช่วยศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ผศ." },
            { "staff_id": 110, "faculty_id": "1", "academic_position_id": "0", "support_position_id": "0", "position_work": "เจ้าหน้าที่บริหาร", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 111, "faculty_id": "Unknown", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." }, // เคส ไม่ระบุคณะ
            { "staff_id": 112, "faculty_id": "4", "academic_position_id": "0", "support_position_id": "0", "position_work": "ศาสตราจารย์", "STAFFTYPE_ID": "10", "academic_title": "ศ." },
            { "staff_id": 113, "faculty_id": "4", "academic_position_id": "0", "support_position_id": "0", "position_work": "พนักงานมหาวิทยาลัย (สายสนับสนุน)", "STAFFTYPE_ID": "20", "academic_title": null },
            { "staff_id": 114, "faculty_id": "5", "academic_position_id": "0", "support_position_id": "0", "position_work": "อาจารย์", "STAFFTYPE_ID": "10", "academic_title": "อ." },
            { "staff_id": 115, "faculty_id": "5", "academic_position_id": "0", "support_position_id": "0", "position_work": "ลูกจ้างชั่วคราว", "STAFFTYPE_ID": "30", "academic_title": null },
        ]
    };

    // Mock Education History Data
    const mockEducationHistoryData: EducationEntry[] = [
      { staff_id: 101, degree: "ปริญญาเอก", major: "วิศวกรรมคอมพิวเตอร์", university: "มหาวิทยาลัยขอนแก่น", graduation_year: 2010 },
      { staff_id: 101, degree: "ปริญญาโท", major: "วิทยาการคอมพิวเตอร์", university: "จุฬาลงกรณ์มหาวิทยาลัย", graduation_year: 2005 },
      { staff_id: 102, degree: "ปริญญาเอก", major: "ฟิสิกส์", university: "มหาวิทยาลัยเชียงใหม่", graduation_year: 2012 },
      { staff_id: 102, degree: "ปริญญาโท", major: "ฟิสิกส์", university: "มหาวิทยาลัยเชียงใหม่", graduation_year: 2008 },
      { staff_id: 103, degree: "ปริญญาตรี", major: "วิทยาการคอมพิวเตอร์", university: "มหาวิทยาลัยขอนแก่น", graduation_year: 2015 },
      { staff_id: 104, degree: "ปริญญาเอก", major: "เคมี", university: "มหาวิทยาลัยเกษตรศาสตร์", graduation_year: 2011 },
      { staff_id: 105, degree: "ปริญญาตรี", major: "บริหารธุรกิจ", university: "มหาวิทยาลัยธรรมศาสตร์", graduation_year: 2014 },
      { staff_id: 106, degree: "อนุปริญญา", major: "การบัญชี", university: "วิทยาลัยอาชีวศึกษา", graduation_year: 2010 },
      { staff_id: 107, degree: "ปริญญาโท", major: "การศึกษา", university: "มหาวิทยาลัยศรีนครินทรวิโรฒ", graduation_year: 2018 },
      { staff_id: 111, degree: "ปริญญาตรี", major: "การจัดการ", university: "มหาวิทยาลัยขอนแก่น", graduation_year: 2016 },
      { staff_id: 112, degree: "ปริญญาเอก", major: "แพทยศาสตร์", university: "มหาวิทยาลัยมหิดล", graduation_year: 2008 },
      { staff_id: 113, degree: "ปริญญาตรี", major: "พยาบาลศาสตร์", university: "มหาวิทยาลัยมหิดล", graduation_year: 2017 },
      { staff_id: 114, degree: "ปริญญาโท", major: "ดนตรีบำบัด", university: "มหาวิทยาลัยศิลปากร", graduation_year: 2019 },
      { staff_id: 115, degree: "ปริญญาตรี", major: "ทัศนศิลป์", university: "มหาวิทยาลัยศิลปากร", graduation_year: 2016 },
      // Staff not found in mockStaffData, will be "ไม่ระบุคณะ"
      { staff_id: 200, degree: "ปริญญาเอก", major: "เศรษฐศาสตร์", university: "มหาวิทยาลัยจุฬา", graduation_year: 2009 },
      { staff_id: 201, degree: "ปริญญาโท", major: "กฎหมาย", university: "มหาวิทยาลัยรามคำแหง", graduation_year: 2013 },
      { staff_id: 202, degree: "ปริญญาตรี", major: "วิทยาการคอมพิวเตอร์", university: "มหาวิทยาลัยกรุงเทพ", graduation_year: 2020 },
    ];

    educationReport = {}; // Initialize the report object

    // สร้าง Map สำหรับค้นหาชื่อคณะจาก FACULTYID
    const facultiesMap = new Map<string, string>();
    if (mockFacultyData && Array.isArray(mockFacultyData.sys_faculty)) {
      mockFacultyData.sys_faculty.forEach((f: Faculty) => {
        facultiesMap.set(f.FACULTYID, f.FACULTYNAME);
      });
      console.log(`สร้าง Map คณะสำเร็จ: มี ${facultiesMap.size} รายการ.`);
    }

    // สร้าง Map สำหรับค้นหา faculty_id ของ Staff
    const staffFacultyMap = new Map<number, string>();
    if (mockStaffData && Array.isArray(mockStaffData.Staff)) {
        mockStaffData.Staff.forEach((s: Staff) => {
            staffFacultyMap.set(s.staff_id, s.faculty_id);
        });
        console.log(`สร้าง Map บุคลากร-คณะสำเร็จ: มี ${staffFacultyMap.size} รายการ.`);
    }

    // ประมวลผลข้อมูลประวัติการศึกษาเพื่อหาวุฒิสูงสุดของแต่ละคน
    const staffHighestDegree = new Map<number, string>(); // Map<staff_id, highest_degree>
    if (mockEducationHistoryData && Array.isArray(mockEducationHistoryData)) {
      console.log(`กำลังประมวลผลข้อมูลประวัติการศึกษา ${mockEducationHistoryData.length} รายการ.`);
      mockEducationHistoryData.forEach((edu: EducationEntry) => {
        const currentHighestDegree = staffHighestDegree.get(edu.staff_id);
        const currentHighestOrder = currentHighestDegree ? (DEGREE_ORDER[currentHighestDegree] || 0) : 0;
        const newDegreeOrder = DEGREE_ORDER[edu.degree] || 0;

        if (newDegreeOrder > currentHighestOrder) {
          staffHighestDegree.set(edu.staff_id, edu.degree);
          console.log(`  -> Staff ID ${edu.staff_id}: วุฒิสูงสุดเปลี่ยนเป็น "${edu.degree}"`);
        } else if (!currentHighestDegree && newDegreeOrder > 0) {
          staffHighestDegree.set(edu.staff_id, edu.degree); // ถ้ายังไม่มีวุฒิเลย
          console.log(`  -> Staff ID ${edu.staff_id}: กำหนดวุฒิเริ่มต้นเป็น "${edu.degree}"`);
        }
      });
      console.log(`ประมวลผลหาวุฒิสูงสุดของบุคลากรสำเร็จ: มี ${staffHighestDegree.size} รายการ.`);

      // นับจำนวนบุคลากรตามวุฒิสูงสุดและคณะ
      staffHighestDegree.forEach((degree, staffId) => {
        const facultyId = staffFacultyMap.get(staffId);
        const facultyName = facultiesMap.get(facultyId || '') || 'ไม่ระบุคณะ'; // Default if faculty not found

        if (!educationReport![facultyName]) {
          educationReport![facultyName] = {};
        }
        educationReport![facultyName][degree] = (educationReport![facultyName][degree] || 0) + 1;
        console.log(`  -> เพิ่มในรายงาน: คณะ "${facultyName}", วุฒิ "${degree}", ปัจจุบัน: ${educationReport![facultyName][degree]}`);
      });

      console.log('ประมวลผลรายงานประวัติการศึกษาสำเร็จ. รายงานสุดท้าย:');
      console.log('Final educationReport:', JSON.stringify(educationReport, null, 2));

    } else {
      console.warn('คำเตือน: mockEducationHistoryData ไม่ใช่ Array หรือไม่มีอยู่. จะไม่มีข้อมูลรายงาน.');
      educationReport = {};
    }

  } catch (err: any) {
    console.error("--- Error ใน getServerSideProps (hr914) ---");
    console.error("รายละเอียดข้อผิดพลาด:", err);
    error = `เกิดข้อผิดพลาดภายใน Sever: ${err.message || String(err)}. โปรดตรวจสอบ Server Terminal.`;
    educationReport = null;
  } finally {
    console.log('--- getServerSideProps (hr914): สิ้นสุดการประมวลผล ---');
    console.log('ข้อมูลที่ส่งไปที่ Client - educationReport:', educationReport ? 'มีข้อมูล' : 'ไม่มีข้อมูล');
    console.log('ข้อความ Error ที่ส่งไปที่ Client:', error);
  }

  return {
    props: {
      educationReport,
      error,
    },
  };
}

// =========================================================
// 4. Client Component (ส่วนที่รันบน Browser)
// =========================================================
const HR914EducationReports: React.FC<HR914EducationReportsProps> = ({ educationReport: initialEducationReport, error: initialError }) => {
  const { messages } = useIntl();
  const [educationReport] = useState<EducationReportData | null>(initialEducationReport);
  const [error] = useState<string | null>(initialError);

  const renderReportTable = (report: EducationReportData | null) => {
    if (error) {
        return <Alert severity="error" sx={{ m: 2 }}>{messages['common.errorFetchingData'] as string}: {error}</Alert>;
    }
    if (!report || Object.keys(report).length === 0) {
      return <Typography sx={{ p: 2 }}>{messages['common.noData'] as string}</Typography>;
    }

    const allDegrees: Set<string> = new Set();
    Object.values(report).forEach(facultyData => {
      Object.keys(facultyData).forEach(degree => allDegrees.add(degree));
    });

    // เรียงลำดับวุฒิการศึกษาตามที่กำหนด (ปริญญาเอก -> อนุปริญญา -> อื่นๆ)
    const orderedDegrees = ORDERED_DEGREES.filter(degree => allDegrees.has(degree));
    // เพิ่มวุฒิอื่นๆ ที่อาจจะโผล่มาแต่ไม่อยู่ใน ORDERED_DEGREES
    const otherDegrees = Array.from(allDegrees).filter(degree => !ORDERED_DEGREES.includes(degree)).sort();
    const finalOrderedDegrees = [...orderedDegrees, ...otherDegrees];


    const sortedFacultyNames = Object.keys(report).sort((a, b) => {
      if (a === 'ไม่ระบุคณะ') return 1;
      if (b === 'ไม่ระบุคณะ') return -1;
      return a.localeCompare(b);
    });

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="education report table">
          <TableHead>
            <TableRow>
              <TableCell>{messages['common.facultyUnit'] as string}</TableCell>
              {finalOrderedDegrees.map((degree) => (
                <TableCell key={degree} align="center">{degree}</TableCell>
              ))}
              <TableCell align="center">{messages['common.total'] as string}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFacultyNames.map((facultyName) => {
              const facultyData = report[facultyName];
              let total = 0;
              return (
                <TableRow key={facultyName}>
                  <TableCell component="th" scope="row">
                    {facultyName}
                  </TableCell>
                  {finalOrderedDegrees.map((degree) => {
                    const count = facultyData[degree] || 0;
                    total += count;
                    return <TableCell key={degree} align="center">{count}</TableCell>;
                  })}
                  <TableCell align="center"><strong>{total}</strong></TableCell>
                </TableRow>
              );
            })}
            {/* Total Row */}
            <TableRow sx={{ '& > *': { fontWeight: 'bold !important' } }}>
                <TableCell>{messages['common.grandTotal'] as string}</TableCell>
                {finalOrderedDegrees.map(degree => {
                    let colTotal = 0;
                    Object.values(report).forEach(facultyData => {
                        colTotal += facultyData[degree] || 0;
                    });
                    return <TableCell key={`total-${degree}`} align="center">{colTotal}</TableCell>;
                })}
                <TableCell align="center">
                    {Object.values(report).reduce((accFaculty, facultyData) => {
                        return accFaculty + Object.values(facultyData).reduce((accPos, count) => accPos + count, 0);
                    }, 0)}
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <AppCard
      title={<IntlMessages id="sidebar.hr.hr914" />}
      sxStyle={{ width: '100%' }}
    >
      <Box sx={{ py: 2 }}>
        <Typography variant="h6" gutterBottom>
          {messages['report.staffByHighestDegree'] as string}
        </Typography>
        {renderReportTable(educationReport)}
      </Box>
    </AppCard>
  );
};

export default HR914EducationReports;