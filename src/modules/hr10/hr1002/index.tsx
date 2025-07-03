// hr1002/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

import Table from './Table';
import { StaffDataRaw, StaffDetailByFaculty } from './types';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // Enable if font is set up.

import * as XLSX from 'xlsx';

// --- Static Faculty Data (from sys_faculty_202506192125.json) ---
// Note: In a real app, this might come from an API
const faculties = [
  { FACULTYID: "1", FACULTYNAME: "สำนักงานอธิการบดี-กองบริหารงานทั่วไป" },
  { FACULTYID: "2", FACULTYNAME: "สำนักงานอธิการบดี-กองนโยบายและแผน" },
  { FACULTYID: "3", FACULTYNAME: "สำนักงานอธิการบดี-กองพัฒนานักศึกษา" },
  { FACULTYID: "12", FACULTYNAME: "คณะครุศาสตร์" },
  { FACULTYID: "13", FACULTYNAME: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
  { FACULTYID: "14", FACULTYNAME: "คณะวิทยาศาสตร์" },
  { FACULTYID: "15", FACULTYNAME: "คณะวิทยาการจัดการ" },
  { FACULTYID: "16", FACULTYNAME: "คณะเทคโนโลยี" },
  { FACULTYID: "17", FACULTYNAME: "บัณฑิตวิทยาลัย" },
  { FACULTYID: "18", FACULTYNAME: "คณะนิติศาสตร์" },
  { FACULTYID: "19", FACULTYNAME: "คณะพยาบาลศาสตร์" },
  { FACULTYID: "20", FACULTYNAME: "คณะแพทยศาสตร์" },
  // ... (Full list from sys_faculty_202506192125.json)
];

// Helper for generating random data (reused from hr907)
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomItem = <T extends unknown>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// --- Simulated Raw Staff Data Generation (similar to hr907 but with more fields) ---
const generateSimulatedStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = ["สมชาย", "สมหญิง", "วีระ", "อรุณี", "ปรีชา", "กัญญา", "มานะ", "ดวงใจ", "ทรงชัย", "สุพรรณี"];
  const lastNames = ["สุขใจ", "ดีเยี่ยม", "คงทน", "งามยิ่ง", "พอเพียง", "รักชาติ", "เมตตา", "เจริญสุข", "มั่นคง", "สุขสม"];
  const academicPositions = ["ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", "อาจารย์"];
  const adminPositions = ["นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป", "นักวิเคราะห์นโยบายและแผน", "เจ้าหน้าที่ธุรการ", "ผู้อำนวยการกอง"];
  const employmentStatuses: ('ปกติ' | 'ลาออก' | 'เกษียณ' | 'พักงาน')[] = ['ปกติ', 'ลาออก', 'เกษียณ', 'พักงาน'];
  const educationLevels: ('ต่ำกว่าปริญญาตรี' | 'ปริญญาตรี' | 'ปริญญาโท' | 'ปริญญาเอก')[] = ['ต่ำกว่าปริญญาตรี', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'];


  for (let i = 1; i <= count; i++) {
    const genderCode = getRandomItem(["1", "2"]);
    const birthYear = getRandomInt(1970, 2000);
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

    const faculty = getRandomItem(faculties);
    const staffTypeId = getRandomInt(1, 4);
    const budgetId = getRandomInt(1, 2);
    let positionAcademic = null;
    let positionAdmin = null;
    let positionWork = null;
    if (staffTypeId === 1 || staffTypeId === 2) {
      if (Math.random() > 0.5) {
        positionAcademic = getRandomItem(academicPositions);
      } else {
        positionAdmin = getRandomItem(adminPositions);
      }
    } else {
      positionAdmin = getRandomItem(adminPositions);
    }
    if (!positionAcademic && !positionAdmin) {
        positionWork = getRandomItem(adminPositions);
    }

    const startYear = getRandomInt(1990, 2024);
    const startMonth = getRandomInt(1, 12);
    const startDay = getRandomInt(1, 28);
    const dateOfAppointment = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;

    // Simulated new fields
    const salaryAmount = getRandomInt(15000, 80000); // Random salary
    const employmentStatus = getRandomItem(employmentStatuses);
    const educationLevel = getRandomItem(educationLevels);


    staffData.push({
      staff_id: 6000000 + i, // Use a different range for new staff IDs
      citizen_id: `1${String(getRandomInt(10000000000, 99999999999))}`,
      prefixname_id: genderCode === "1" ? 1 : 2,
      academic_title: positionAcademic ? getRandomItem(["", "ผศ.", "รศ.", "ศ."]) : "",
      first_name_th: getRandomItem(firstNames),
      last_name_th: getRandomItem(lastNames),
      middle_name_th: "",
      first_name_en: "",
      last_name_en: "",
      middle_name_en: "",
      gender: genderCode,
      date_of_birth: dateOfBirth,
      faculty_id: parseInt(faculty.FACULTYID),
      faculty_name_th: faculty.FACULTYNAME,
      STAFFTYPE_ID: staffTypeId,
      BUDGET_ID: budgetId,
      position_academic_name_th: positionAcademic,
      position_admin_name_th: positionAdmin,
      POSITION_WORK: positionWork,
      date_of_appointment: dateOfAppointment, // Simulated date of appointment
      phone_number: `08${getRandomInt(10000000, 99999999)}`, // Simulated phone
      email1: `staff${i}@example.com`, // Simulated email
      is_active: Math.random() > 0.1, // 90% active, 10% inactive for demonstration
      
      // Add new simulated fields
      salary_amount: salaryAmount,
      employment_status: employmentStatus,
      education_level: educationLevel,
    });
  }
  return staffData;
};

const initialStaffData: StaffDataRaw[] = generateSimulatedStaffData(200); // Generate 200 staff records


// Helper functions (reused from hr907 or adapted)
const mapGender = (genderCode: string): 'ชาย' | 'หญิง' | 'ไม่ระบุ' => {
  if (genderCode === '1') return 'ชาย';
  if (genderCode === '2') return 'หญิง';
  return 'ไม่ระบุ';
};
const mapStaffType = (staffTypeId: number): string => {
  switch (staffTypeId) {
    case 1: return 'ข้าราชการ';
    case 2: return 'พนักงานมหาวิทยาลัย';
    case 3: return 'พนักงานราชการ';
    case 4: return 'ลูกจ้างประจำ';
    default: return 'อื่นๆ';
  }
};
const mapBudget = (budgetId: number): string => {
  switch (budgetId) {
    case 1: return 'เงินงบประมาณ';
    case 2: return 'เงินรายได้';
    default: return 'ไม่ระบุ';
  }
};

const getPositionName = (staff: StaffDataRaw): string => {
  if (staff.position_academic_name_th) return staff.position_academic_name_th;
  if (staff.position_admin_name_th) return staff.position_admin_name_th;
  if (staff.POSITION_WORK) return staff.POSITION_WORK;
  return 'ไม่ระบุตำแหน่ง';
};

const Hr1002Page = () => {
  const { messages } = useIntl();
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterStaffType, setFilterStaffType] = useState<string>('');
  // Removed filterIsActive state
  const [filterEmploymentStatus, setFilterEmploymentStatus] = useState<string>(''); // New filter state

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Process raw staff data into StaffDetailByFaculty objects
  const processedStaffData: StaffDetailByFaculty[] = useMemo(() => {
    return initialStaffData.map((staff, index) => {
      return {
        id: staff.staff_id || index,
        staffId: staff.staff_id,
        fullNameTh: `${staff.prefixname_id === 1 ? 'นาย' : staff.prefixname_id === 2 ? 'นางสาว' : ''}${staff.academic_title ? staff.academic_title + ' ' : ''}${staff.first_name_th} ${staff.last_name_th}`,
        gender: mapGender(staff.gender),
        positionName: getPositionName(staff),
        staffTypeName: mapStaffType(staff.STAFFTYPE_ID),
        budgetName: mapBudget(staff.BUDGET_ID),
        facultyName: staff.faculty_name_th,
        dateOfAppointment: staff.date_of_appointment,
        phoneNumber: staff.phone_number,
        email: staff.email1,
        // Add new fields
        salaryAmount: staff.salary_amount,
        employmentStatus: staff.employment_status,
        educationLevel: staff.education_level,
      };
    })
    // Removed default filtering by is_active for display, as per user's request to remove "สถานะ" filter
    /* .filter(staff => {
      const originalStaff = initialStaffData.find(s => s.staff_id === staff.staffId);
      return originalStaff ? originalStaff.is_active : true;
    }); */
  }, []);

  // Filtered Staff Data (before pagination)
  const allFilteredStaff = useMemo(() => {
    let currentData = processedStaffData;

    // Filter by faculty name
    if (filterFacultyName) {
      const lowerCaseFilter = filterFacultyName.toLowerCase();
      currentData = currentData.filter(staff =>
        staff.facultyName.toLowerCase().includes(lowerCaseFilter)
      );
    }

    // Filter by staff type
    if (filterStaffType) {
      const lowerCaseFilter = filterStaffType.toLowerCase();
      currentData = currentData.filter(staff =>
        staff.staffTypeName.toLowerCase().includes(lowerCaseFilter)
      );
    }

    // Removed Filter by active status
    /* if (filterIsActive !== '') {
        const isActive = filterIsActive === 'true';
        currentData = currentData.filter(staff => {
            const originalStaff = initialStaffData.find(s => s.staff_id === staff.staffId);
            return originalStaff ? originalStaff.is_active === isActive : false;
        });
    } */

    // New: Filter by employment status
    if (filterEmploymentStatus) {
        currentData = currentData.filter(staff =>
            staff.employmentStatus === filterEmploymentStatus
        );
    }

    return currentData.sort((a, b) => a.facultyName.localeCompare(b.facultyName) || a.fullNameTh.localeCompare(b.fullNameTh));
  }, [processedStaffData, filterFacultyName, filterStaffType, filterEmploymentStatus]); // Removed filterIsActive from dependency array

  // Data for current page (paginated)
  const paginatedStaff = useMemo(() => {
    return allFilteredStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [allFilteredStaff, page, rowsPerPage]);

  // Options for filter dropdowns
  const facultyOptions = useMemo(() => {
    return faculties.map(f => ({ value: f.FACULTYID, label: f.FACULTYNAME }));
  }, []);
  const staffTypeOptions = useMemo(() => {
    const types = new Set<string>();
    initialStaffData.forEach(staff => types.add(mapStaffType(staff.STAFFTYPE_ID)));
    return Array.from(types).sort().map(type => ({ value: type, label: type }));
  }, []);

  const employmentStatusOptions = useMemo(() => {
    const statuses = new Set<string>();
    initialStaffData.forEach(staff => {
      if (staff.employment_status) {
        statuses.add(staff.employment_status);
      }
    });
    return Array.from(statuses).sort().map(status => ({ value: status, label: status }));
  }, []);


  const handleExportAllToPdf = useCallback(() => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Changed to landscape 'l'
    // doc.setFont('THSarabunNew'); // Enable if font is set up.
    // doc.setR2L(false);

    let currentY = 10;
    const margin = 14;

    // --- Report Header ---
    doc.setFontSize(14);
    doc.text('รายงานชุดข้อมูลบุคลากร', margin, currentY);
    currentY += 7;
    doc.setFontSize(12);
    doc.text(`ข้อมูล ณ วันที่ ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, currentY);
    currentY += 10;

    // --- Detailed List Section ---
    doc.setFontSize(12);
    doc.text('รายชื่อบุคลากร', margin, currentY); // Adjusted heading
    currentY += 5;
    const detailColumnsForPdf = [
      { header: 'ลำดับ', dataKey: 'index' },
      { header: 'ชื่อ-นามสกุล', dataKey: 'fullNameTh' },
      { header: 'เพศ', dataKey: 'gender' },
      { header: 'ตำแหน่ง', dataKey: 'positionName' },
      { header: 'สังกัด', dataKey: 'facultyName' },
      { header: 'ประเภทบุคลากร', dataKey: 'staffTypeName' },
      { header: 'ประเภทเงิน', dataKey: 'budgetName' },
      { header: 'เงินเดือน', dataKey: 'salaryAmount' },
      { header: 'วันบรรจุ', dataKey: 'dateOfAppointment' },
      { header: 'สถานภาพ', dataKey: 'employmentStatus' },
      { header: 'ระดับการศึกษา', dataKey: 'educationLevel' },
      // { header: 'เบอร์โทร', dataKey: 'phoneNumber' }, // Add if used
      // { header: 'อีเมล', dataKey: 'email' }, // Add if used
    ];
    const detailRowsForPdf = allFilteredStaff.map((staff, index) => ({
      index: index + 1,
      fullNameTh: staff.fullNameTh,
      gender: staff.gender,
      positionName: staff.positionName,
      facultyName: staff.facultyName,
      staffTypeName: staff.staffTypeName,
      budgetName: staff.budgetName,
      salaryAmount: staff.salaryAmount?.toLocaleString('th-TH'), // Format salary
      dateOfAppointment: staff.dateOfAppointment,
      employmentStatus: staff.employmentStatus,
      educationLevel: staff.educationLevel,
      // phoneNumber: staff.phoneNumber, // Add if used
      // email: staff.email, // Add if used
    }));

    (doc as any).autoTable({
      head: [detailColumnsForPdf.map(col => col.header)],
      body: detailRowsForPdf.map(row => detailColumnsForPdf.map(col => row[col.dataKey as keyof typeof row])),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 7, cellPadding: 1, overflow: 'linebreak' }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0] },
      columnStyles: {
        0: { cellWidth: 10 }, // ลำดับ
        1: { cellWidth: 35 }, // ชื่อ-นามสกุล
        2: { cellWidth: 10 }, // เพศ
        3: { cellWidth: 25 }, // ตำแหน่ง
        4: { cellWidth: 35 }, // สังกัด (หน่วยงาน)
        5: { cellWidth: 20 }, // ประเภทบุคลากร
        6: { cellWidth: 15 }, // ประเภทเงิน
        7: { cellWidth: 15, halign: 'right' }, // เงินเดือน
        8: { cellWidth: 20 }, // วันบรรจุ
        9: { cellWidth: 18 }, // สถานภาพ
        10: { cellWidth: 20 }, // ระดับการศึกษา
      },
      didDrawPage: (data: any) => {
        doc.setFontSize(8);
        doc.text(`หน้า ${data.pageNumber}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    });

    doc.save('รายงานชุดข้อมูลบุคลากร.pdf');
    Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
  }, [allFilteredStaff]);

  const handleExportAllToExcel = useCallback(() => {
    // Prepare Detailed data
    const detailDataForExcel = allFilteredStaff.map((staff, index) => ({
      'ลำดับ': index + 1,
      'ชื่อ-นามสกุล': staff.fullNameTh,
      'เพศ': staff.gender,
      'ตำแหน่ง': staff.positionName,
      'สังกัด': staff.facultyName,
      'ประเภทบุคลากร': staff.staffTypeName,
      'ประเภทเงิน': staff.budgetName,
      'เงินเดือน': staff.salaryAmount,
      'วันบรรจุ': staff.dateOfAppointment,
      'สถานภาพการทำงาน': staff.employmentStatus,
      'ระดับการศึกษา': staff.educationLevel,
      // 'เบอร์โทร': staff.phoneNumber, // Add if used
      // 'อีเมล': staff.email, // Add if used
    }));

    const workbook = XLSX.utils.book_new();

    // Add Detailed List sheet
    const detailSheet = XLSX.utils.json_to_sheet(detailDataForExcel);
    XLSX.utils.book_append_sheet(workbook, detailSheet, 'รายชื่อบุคลากร');

    XLSX.writeFile(workbook, 'รายงานชุดข้อมูลบุคลากร.xlsx');
    Swal.fire('สำเร็จ!', 'ส่งออก Excel เรียบร้อยแล้ว', 'success');
  }, [allFilteredStaff]);

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.hr10.02" />}
      sx={{
        mb: 2,
        mt: 2,
        py: 0,
        flex: 1,
        "& .apps-content": {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h2" variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        {<IntlMessages id="sidebar.hr10.02" />}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="หน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => {
                setFilterFacultyName(e.target.value);
                setPage(0); // Reset page on filter change
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 250 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {facultyOptions.map((option) => (
              <MenuItem key={option.value} value={option.label}> {/* Filter by label for now, could be ID */}
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="ประเภทบุคลากร"
            value={filterStaffType}
            onChange={(e) => {
                setFilterStaffType(e.target.value);
                setPage(0); // Reset page on filter change
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {staffTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Removed Filter: สถานะ (ปกติ/ไม่ปกติ) */}
          {/* <TextField
            select
            label="สถานะ"
            value={filterIsActive}
            onChange={(e) => {
                setFilterIsActive(e.target.value);
                setPage(0); // Reset page on filter change
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">-- ทั้งหมด --</MenuItem>
            <MenuItem value="true">ปกติ</MenuItem>
            <MenuItem value="false">ไม่ปกติ</MenuItem>
          </TextField> */}

          {/* New Filter: Employment Status */}
          <TextField
            select
            label="สถานภาพการทำงาน"
            value={filterEmploymentStatus}
            onChange={(e) => {
                setFilterEmploymentStatus(e.target.value);
                setPage(0); // Reset page on filter change
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {employmentStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            onClick={() => {
              setFilterFacultyName('');
              setFilterStaffType('');
              // setFilterIsActive(''); // Clear new filter
              setFilterEmploymentStatus(''); // Clear new filter
              setPage(0); // Reset pagination on filter clear
            }}
          >
            ล้างตัวกรอง
          </Button>
        </Box>

        {/* Table Component */}
        <Table
          filteredStaff={paginatedStaff}
          totalFilteredCount={allFilteredStaff.length}
          handleExportAllToPdf={handleExportAllToPdf}
          handleExportAllToExcel={handleExportAllToExcel}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AppInfoView />
      </Box>
    </AppsContent>
  );
};

export default Hr1002Page;