// rp112/SalaryCertificate.tsx
import React, { useEffect, useState, useRef } from 'react'; // เพิ่ม useRef
import { Box, Typography, Divider, Grid, Button } from '@mui/material'; // เพิ่ม Button
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

import { mockRawStaffData, mockFacultyData } from './index'; // นำเข้า mockRawStaffData และ mockFacultyData
import { CertificateStaffData, RawStaffData } from './types'; // นำเข้า RawStaffData type ด้วย

interface SalaryCertificateProps {
  staffId: number | null;
}

const SalaryCertificate: React.FC<SalaryCertificateProps> = ({ staffId }) => {
  const [certificateData, setCertificateData] = useState<CertificateStaffData | null>(null);
  const printRef = useRef<HTMLDivElement>(null); // สร้าง ref สำหรับส่วนที่จะพิมพ์

  useEffect(() => {
    if (staffId) {
      const staffData = mockRawStaffData.find(staff => staff.staff_id === staffId);

      if (staffData) {
        // กำหนดคำนำหน้าชื่อ (ตัวอย่าง)
        let prefixName = '';
        if (staffData.STAFFTYPE_ID === 1) { // สมมติว่า '1' คือชาย
          if (staffData.academic_title) {
            prefixName = staffData.academic_title; // ใช้ academic_title ถ้ามี
          } else {
            prefixName = 'นาย';
          }
        } else if (staffData.STAFFTYPE_ID === 2) { // สมมติว่า '2' คือหญิง
          if (staffData.academic_title) {
            prefixName = staffData.academic_title; // ใช้ academic_title ถ้ามี
          } else {
            prefixName = 'นางสาว';
          }
        }
        // ถ้าไม่ตรงเงื่อนไขหรือไม่มี gender ให้ใช้ academic_title หรือ position_work
        if (!prefixName && staffData.academic_title) {
          prefixName = staffData.academic_title;
        } else if (!prefixName && staffData.position_work) {
          // หากไม่มีคำนำหน้าชื่อ และไม่มี academic_title ให้ใช้ตำแหน่งงานแทน (ถ้าต้องการ)
          // prefixName = staffData.position_work;
        }


        // หาชื่อคณะจาก mockFacultyData
        const faculty = mockFacultyData.find(f => f.FACULTYID === staffData.faculty_id);
        const facultyName = faculty ? faculty.FACULTYNAME : 'ไม่ระบุคณะ';

        const data: CertificateStaffData = {
          staff_id: staffData.staff_id,
          citizen_id: staffData.citizen_id,
          title: prefixName, // ใช้ prefixName ที่คำนวณไว้
          firstName: staffData.first_name_th,
          lastName: staffData.last_name_th,
          position: staffData.academic_title || staffData.position_work || 'ไม่ระบุตำแหน่ง',
          facultyName: facultyName,
          baseSalary: staffData.base_salary,
          positionAllowance: staffData.position_allowance,
          otherAllowance: staffData.other_allowance,
          totalSalary: staffData.total_salary,
        };
        setCertificateData(data);
      }
    }
  }, [staffId]);


  // ฟังก์ชันสำหรับพิมพ์เอกสาร
  const handlePrint = () => {
    // window.print();
    const printContent = printRef.current;

    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents; // คืนค่าเนื้อหาเดิมหลังจากพิมพ์
      // เพื่อให้แน่ใจว่าหน้าจอแสดงผลกลับมาถูกต้องหลังจากปิดหน้าต่างพิมพ์
      // โดยปกติแล้วเบราว์เซอร์จะจัดการให้เอง แต่การคืนค่าด้วยตัวเองจะช่วยให้มั่นใจได้มากขึ้น
      window.location.reload(); // อาจจำเป็นต้องรีโหลดหน้าเพื่อคืนค่า UI เต็มรูปแบบ
    }
  };


  if (!certificateData) {
    return (
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        กำลังโหลดข้อมูลหนังสือรับรอง...
      </Typography>
    );
  }

  // วันที่ปัจจุบัน (วันที่ออกหนังสือรับรอง)
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'dd MMMM yyyy', { locale: th });

  // แปลงตัวเลขเป็นข้อความภาษาไทย
  const numberToThaiText = (num: number): string => {
    const units = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
    const nums = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];

    let s = String(num);
    let result = "";
    let len = s.length;

    for (let i = 0; i < len; i++) {
      let n = parseInt(s[i]);
      if (n === 0) continue;
      if (len - i === 2 && n === 1) { // 10, 11-19
        result += "สิบ";
        continue;
      }
      if (len - i === 1 && n === 1 && len > 1) { // 21, 31, ...
        result += "เอ็ด";
        continue;
      }
      if (len - i === 1 && n === 2 && len > 1) { // 22, 32, ...
        result += "ยี่";
        continue;
      }
      result += nums[n] + units[len - 1 - i];
    }

    if (result === "") {
        return "ศูนย์บาทถ้วน";
    }

    if (s.includes(".")) {
      const [intPart, decPart] = s.split('.');
      let decimalText = "";
      if (decPart && parseInt(decPart) > 0) {
        let decNum = parseInt(decPart);
        if (decNum >= 10 && decNum <= 99) {
          // ถ้าเป็นเลขสองหลัก
          if (String(decNum)[0] === '1') decimalText += "สิบ";
          else if (String(decNum)[0] === '2') decimalText += "ยี่สิบ";
          else decimalText += nums[parseInt(String(decNum)[0])] + "สิบ";

          if (String(decNum)[1] === '1') decimalText += "เอ็ด";
          else if (parseInt(String(decNum)[1]) > 0) decimalText += nums[parseInt(String(decNum)[1])];
        } else if (decNum >= 1 && decNum <= 9) {
          decimalText += nums[decNum];
        }

        if (decimalText) {
          return `${result}บาท${decimalText}สตางค์`;
        }
      }
    }

    return `${result}บาทถ้วน`;
  };


  const totalSalaryInThai = numberToThaiText(certificateData.totalSalary);

  return (
    <Box sx={{ p: 4, bgcolor: 'white' }}>
      {/* ปุ่มสำหรับพิมพ์เอกสาร */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, '@media print': { display: 'none' } }}>
        <Button variant="contained" onClick={handlePrint}>
          พิมพ์เอกสาร / ส่งออก PDF
        </Button>
      </Box>

      {/* ส่วนเนื้อหาที่ต้องการพิมพ์ */}
      <Box ref={printRef} sx={{ p: { xs: 2, sm: 4 }, border: '1px solid #ddd', minHeight: '600px' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
          หนังสือรับรองเงินเดือน
        </Typography>

        <Typography variant="body1" paragraph sx={{ textIndent: 30 }}>
          เรียน อธิการบดี
        </Typography>

        <Typography variant="body1" paragraph sx={{ textIndent: 30 }}>
          ข้าพเจ้า {certificateData.title} {certificateData.firstName} {certificateData.lastName}
          ปัจจุบันดำรงตำแหน่ง {certificateData.position} สังกัด {certificateData.facultyName}
          ได้รับเงินเดือนรวมค่าตอบแทนและเงินประจำตำแหน่ง เป็นจำนวนเงินเดือนรวมทั้งสิ้น
          {certificateData.totalSalary?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
          ({totalSalaryInThai}) (ตัวอย่างข้อมูลจาก Mock Data)
        </Typography>

        <Grid container spacing={1} sx={{ pl: 5, mb: 2 }}>
          <Grid item xs={12}>
            <Typography variant="body2">เงินเดือน: {certificateData.baseSalary?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</Typography>
          </Grid>
          {certificateData.positionAllowance > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2">เงินประจำตำแหน่ง: {certificateData.positionAllowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</Typography>
            </Grid>
          )}
          {certificateData.otherAllowance > 0 && (
            <Grid item xs={12}>
              <Typography variant="body2">ค่าตอบแทนอื่นๆ: {certificateData.otherAllowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="body1" paragraph sx={{ textIndent: 30 }}>
          จึงเรียนมาเพื่อโปรดพิจารณา
        </Typography>

        <Box sx={{ mt: 5, textAlign: 'right' }}>
          <Typography variant="body1">ขอแสดงความนับถือ</Typography>
          <Typography variant="body1" sx={{ mt: 3 }}>({certificateData.title} {certificateData.firstName} {certificateData.lastName})</Typography>
          <Typography variant="body2">วันที่ออกเอกสาร: {formattedDate}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SalaryCertificate;