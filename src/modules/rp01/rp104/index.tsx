// rp104/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

// Import the new Table component from the table folder
import Table from './Table';

// Exporting types directly from types.ts
import { StaffDataRaw, RetiredStaffDetail, RetirementSummaryRow, Column } from './types';

// For Export All (can combine multiple sheets/pages)
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // อย่าลืมติดตั้งและตั้งค่า Font THSarabunNew สำหรับ PDF
import * as XLSX from 'xlsx';

// --- Static Faculty Data (from sys_faculty_202506192125.json) ---
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
  // ... เพิ่มคณะอื่นๆ ตามข้อมูล sys_faculty_202506192125.json ได้
];

// Helper for generating random data
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = <T extends unknown>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// --- Simulated Raw Staff Data Generation (approx. 100 entries) ---
const generateSimulatedStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = ["สมชาย", "สมหญิง", "วีระ", "อรุณี", "ปรีชา", "กัญญา", "มานะ", "ดวงใจ", "ทรงชัย", "สุพรรณี"];
  const lastNames = ["สุขใจ", "ดีเยี่ยม", "คงทน", "งามยิ่ง", "พอเพียง", "รักชาติ", "เมตตา", "เจริญสุข", "มั่นคง", "สุขสม"];
  const academicPositions = ["ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", "อาจารย์"];
  const adminPositions = ["นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป", "นักวิเคราะห์นโยบายและแผน", "เจ้าหน้าที่ธุรการ", "ผู้อำนวยการกอง"];

  for (let i = 1; i <= count; i++) {
    const genderCode = getRandomItem(["1", "2"]); // "1" for Male, "2" for Female
    const birthYear = getRandomInt(1955, 1975); // To get retirement years from 2015 to 2035 (approx)
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28); // Max 28 to avoid issues with months having fewer days
    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

    const faculty = getRandomItem(faculties);
    const staffTypeId = getRandomInt(1, 4); // 1-ข้าราชการ, 2-พนักงานมหาวิทยาลัย, 3-พนักงานราชการ, 4-ลูกจ้างประจำ
    const budgetId = getRandomInt(1, 2); // 1-งบประมาณ, 2-รายได้

    let positionAcademic = null;
    let positionAdmin = null;
    let positionWork = null;

    if (staffTypeId === 1 || staffTypeId === 2) { // Assume Khon Ratchakan and Univ Employees can be academic
      if (Math.random() > 0.5) { // 50% chance for academic position
        positionAcademic = getRandomItem(academicPositions);
      } else {
        positionAdmin = getRandomItem(adminPositions);
      }
    } else {
      positionAdmin = getRandomItem(adminPositions);
    }

    // Fallback if both academic and admin are null, or for type 3/4
    if (!positionAcademic && !positionAdmin) {
        positionWork = getRandomItem(adminPositions); // Use admin positions as general work
    }

    staffData.push({
      staff_id: 5000000 + i,
      citizen_id: `1${String(getRandomInt(10000000000, 99999999999))}`,
      prefixname_id: genderCode === "1" ? 1 : 2, // 1: นาย, 2: นาง/นางสาว
      academic_title: positionAcademic ? getRandomItem(["", "ผศ.", "รศ.", "ศ."]) : "", // Simple academic title
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
    });
  }
  return staffData;
};

const initialStaffData: StaffDataRaw[] = generateSimulatedStaffData(100); // Generate 100 staff records


const getRetirementYear = (dob: string): number => {
  const birthDate = new Date(dob);
  const retirementAge = 60;
  const retirementYear = birthDate.getFullYear() + retirementAge;

  // Thai fiscal year retirement rule:
  // If born on or before September 30, retire at the end of the fiscal year when turning 60.
  // If born after September 30, retire at the end of the fiscal year when turning 61.
  const birthMonth = birthDate.getMonth() + 1; // 1-12
  const birthDay = birthDate.getDate();

  if (birthMonth > 9 || (birthMonth === 9 && birthDay > 30)) {
    return retirementYear + 1; // Retire in the next fiscal year
  }
  return retirementYear; // Retire in the same fiscal year
};

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


const Rp104Page = () => {
  const { messages } = useIntl();
  const [filterRetirementYear, setFilterRetirementYear] = useState<string>('');
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterStaffType, setFilterStaffType] = useState<string>('');

  // --- Pagination states ---
  const [page, setPage] = useState(0); // Current page, starts at 0 (first page)
  const [rowsPerPage, setRowsPerPage] = useState(15); // Number of items per page, defaults to 15

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  }, []);


  // Process raw staff data into RetiredStaffDetail objects
  const processedStaffData: RetiredStaffDetail[] = useMemo(() => {
    return initialStaffData.map((staff, index) => {
      const retirementYear = getRetirementYear(staff.date_of_birth);
      return {
        id: staff.staff_id || index, // Use staff_id or index as fallback
        staffId: staff.staff_id,
        retirementYear: retirementYear,
        fullNameTh: `${staff.first_name_th} ${staff.last_name_th}`,
        gender: mapGender(staff.gender),
        positionName: getPositionName(staff),
        staffTypeName: mapStaffType(staff.STAFFTYPE_ID),
        budgetName: mapBudget(staff.BUDGET_ID),
        facultyName: staff.faculty_name_th,
        facultyId: staff.faculty_id,
        dateOfBirth: staff.date_of_birth,
      };
    });
  }, []);

  // Filtered Retired Staff Data (before pagination)
  const allFilteredRetiredStaff = useMemo(() => {
    let currentData = processedStaffData;

    // Filter by retirement year
    if (filterRetirementYear) {
      currentData = currentData.filter(staff =>
        staff.retirementYear === parseInt(filterRetirementYear)
      );
    }

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

    return currentData.sort((a, b) => a.retirementYear - b.retirementYear || a.facultyName.localeCompare(b.facultyName) || a.fullNameTh.localeCompare(b.fullNameTh));
  }, [processedStaffData, filterRetirementYear, filterFacultyName, filterStaffType]);

  // Data for current page (paginated)
  const paginatedRetiredStaff = useMemo(() => {
    return allFilteredRetiredStaff.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [allFilteredRetiredStaff, page, rowsPerPage]);


  // Calculate Retirement Summary
  const retirementSummary: RetirementSummaryRow[] = useMemo(() => {
    const summaryMap = new Map<string, number>();
    const academicStaffTypes = ['ข้าราชการ', 'พนักงานมหาวิทยาลัย']; // Assumption for academic types based on common roles
    const supportStaffTypes = ['พนักงานราชการ', 'ลูกจ้างประจำ']; // Assumption for support types

    let totalAll = 0;
    let totalAcademic = 0;
    let totalSupport = 0;

    // Use allFilteredRetiredStaff for summary, not paginated data
    allFilteredRetiredStaff.forEach(staff => {
      totalAll++;
      summaryMap.set('รวมทั้งหมด', (summaryMap.get('รวมทั้งหมด') || 0) + 1);

      if (academicStaffTypes.includes(staff.staffTypeName)) {
        totalAcademic++;
      } else if (supportStaffTypes.includes(staff.staffTypeName)) {
        totalSupport++;
      }

      summaryMap.set(staff.staffTypeName, (summaryMap.get(staff.staffTypeName) || 0) + 1);
    });

    // Manually add academic and support totals if they exist
    if (totalAcademic > 0) summaryMap.set('สายวิชาการ', totalAcademic);
    if (totalSupport > 0) summaryMap.set('สายสนับสนุนวิชาการ', totalSupport);


    const categoriesOrder = [
      'รวมทั้งหมด',
      'สายวิชาการ',
      'สายสนับสนุนวิชาการ',
      'ข้าราชการ',
      'พนักงานมหาวิทยาลัย',
      'พนักงานราชการ',
      'ลูกจ้างประจำ',
      'อื่นๆ'
    ];

    return categoriesOrder
      .map(cat => ({
        category: cat as RetirementSummaryRow['category'],
        totalRetired: summaryMap.get(cat) || 0,
      }))
      .filter(row => row.totalRetired > 0 || row.category === 'รวมทั้งหมด'); // Keep 'รวมทั้งหมด' even if 0
  }, [allFilteredRetiredStaff]); // Depend on allFilteredRetiredStaff

  // Options for filter dropdowns (for demo purposes)
  const retirementYearsOptions = useMemo(() => {
    const years = new Set<number>();
    processedStaffData.forEach(staff => years.add(staff.retirementYear));
    return Array.from(years).sort((a, b) => a - b).map(year => ({ value: String(year), label: String(year) }));
  }, [processedStaffData]);

  const facultyOptions = useMemo(() => {
    const faculties = new Map<number, string>();
    processedStaffData.forEach(staff => faculties.set(staff.facultyId, staff.facultyName));
    return Array.from(faculties.entries())
      .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
      .map(([id, name]) => ({ value: String(id), label: name }));
  }, [processedStaffData]);

  const staffTypeOptions = useMemo(() => {
    const types = new Set<string>();
    processedStaffData.forEach(staff => types.add(staff.staffTypeName));
    return Array.from(types).sort().map(type => ({ value: type, label: type }));
  }, [processedStaffData]);


  const handleExportAllToPdf = useCallback(() => {
    const doc = new jsPDF('p', 'mm', 'a4');
    // doc.setFont('THSarabunNew'); // Enable if font is set up. You need to install jspdf-autotable-font-loader and add the font.
    // doc.setR2L(false); // For Thai, it's LTR.

    let currentY = 10;
    const margin = 14;

    // --- Add Report Header ---
    doc.setFontSize(14);
    doc.text('รายงานรายชื่อบุคลากรที่เกษียณอายุ', margin, currentY);
    currentY += 7;
    doc.setFontSize(12);
    doc.text(`ณ วันที่ 30 กันยายน ${new Date().getFullYear() + 543}`, margin, currentY); // Example date (Thai year)
    currentY += 10;

    // --- Add Summary Section ---
    doc.setFontSize(12);
    doc.text('1. สรุปจำนวนบุคลากรที่เกษียณอายุ', margin, currentY);
    currentY += 5;

    const summaryColumnsForPdf = [
      { header: 'ประเภท', dataKey: 'category' },
      { header: 'จำนวน (คน)', dataKey: 'totalRetired' },
    ];
    const summaryRowsForPdf = retirementSummary.map(row => ({
      category: row.category,
      totalRetired: row.totalRetired,
    }));

    (doc as any).autoTable({
      head: [summaryColumnsForPdf.map(col => col.header)],
      body: summaryRowsForPdf.map(row => summaryColumnsForPdf.map(col => row[col.dataKey as keyof typeof row])),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1, overflow: 'linebreak' }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0] },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y;
      }
    });
    currentY = (doc as any).autoTable.previous.finalY + 10;

    // --- Add Detailed List Section ---
    doc.setFontSize(12);
    doc.text('2. รายชื่อบุคลากรที่เกษียณอายุ', margin, currentY);
    currentY += 5;

    const detailColumnsForPdf = [
      { header: 'ลำดับ', dataKey: 'index' },
      { header: 'ปีที่เกษียณ', dataKey: 'retirementYear' },
      { header: 'รหัสบุคลากร', dataKey: 'staffId' },
      { header: 'ชื่อ-นามสกุล', dataKey: 'fullNameTh' },
      { header: 'เพศ', dataKey: 'gender' },
      { header: 'ตำแหน่ง', dataKey: 'positionName' },
      { header: 'ประเภทบุคลากร', dataKey: 'staffTypeName' },
      { header: 'ประเภทเงิน', dataKey: 'budgetName' },
      { header: 'หน่วยงาน', dataKey: 'facultyName' },
    ];

    const detailRowsForPdf = allFilteredRetiredStaff.map((staff, index) => ({ // Use allFilteredRetiredStaff for export all data
      index: index + 1,
      retirementYear: staff.retirementYear,
      staffId: staff.staffId,
      fullNameTh: staff.fullNameTh,
      gender: staff.gender,
      positionName: staff.positionName,
      staffTypeName: staff.staffTypeName,
      budgetName: staff.budgetName,
      facultyName: staff.facultyName,
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
        1: { cellWidth: 15 }, // ปีที่เกษียณ
        2: { cellWidth: 15 }, // รหัสบุคลากร
        3: { cellWidth: 30 }, // ชื่อ-นามสกุล
        4: { cellWidth: 10 }, // เพศ
        5: { cellWidth: 25 }, // ตำแหน่ง
        6: { cellWidth: 20 }, // ประเภทบุคลากร
        7: { cellWidth: 15 }, // ประเภทเงิน
        8: { cellWidth: 40 }, // หน่วยงาน
      },
      didDrawPage: (data: any) => {
        // Footer (page number)
        doc.setFontSize(8);
        doc.text(`หน้า ${data.pageNumber}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    });

    doc.save('รายงานรายชื่อบุคลากรที่เกษียณอายุ.pdf');
    Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
  }, [allFilteredRetiredStaff, retirementSummary]); // Depend on allFilteredRetiredStaff for export

  const handleExportAllToExcel = useCallback(() => {
    // Prepare Summary data
    const summaryDataForExcel = retirementSummary.map(row => ({
      ประเภท: row.category,
      'จำนวน (คน)': row.totalRetired,
    }));

    // Prepare Detailed data
    const detailDataForExcel = allFilteredRetiredStaff.map((staff, index) => ({ // Use allFilteredRetiredStaff for export all data
      'ลำดับ': index + 1,
      'ปีที่เกษียณ': staff.retirementYear,
      'รหัสบุคลากร': staff.staffId,
      'ชื่อ-นามสกุล': staff.fullNameTh,
      'เพศ': staff.gender,
      'ตำแหน่ง': staff.positionName,
      'ประเภทบุคลากร': staff.staffTypeName,
      'ประเภทเงิน': staff.budgetName,
      'หน่วยงาน': staff.facultyName,
    }));

    const workbook = XLSX.utils.book_new();

    // Add Summary sheet
    const summarySheet = XLSX.utils.json_to_sheet(summaryDataForExcel);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'สรุปจำนวนเกษียณ');

    // Add Detailed List sheet
    const detailSheet = XLSX.utils.json_to_sheet(detailDataForExcel);
    XLSX.utils.book_append_sheet(workbook, detailSheet, 'รายชื่อบุคลากรเกษียณ');

    XLSX.writeFile(workbook, 'รายงานรายชื่อบุคลากรที่เกษียณอายุ.xlsx');
    Swal.fire('สำเร็จ!', 'ส่งออก Excel เรียบร้อยแล้ว', 'success');
  }, [allFilteredRetiredStaff, retirementSummary]); // Depend on allFilteredRetiredStaff for export


  return (
    <AppsContent
      title={<IntlMessages id="sidebar.hr.retiredStaffReport" />}
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
        {<IntlMessages id="sidebar.rp01.04" />}
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="ปีที่เกษียณ"
            value={filterRetirementYear}
            onChange={(e) => setFilterRetirementYear(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {retirementYearsOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="หน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => setFilterFacultyName(e.target.value)}
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
            onChange={(e) => setFilterStaffType(e.target.value)}
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

          <Button
            variant="contained"
            onClick={() => {
              setFilterRetirementYear('');
              setFilterFacultyName('');
              setFilterStaffType('');
              setPage(0); // Reset pagination on filter clear
            }}
          >
            ล้างตัวกรอง
          </Button>
        </Box>

        {/* Table Component */}
        <Table
          filteredRetiredStaff={paginatedRetiredStaff} // Pass paginated data
          totalFilteredCount={allFilteredRetiredStaff.length} // Pass total count for pagination control
          retirementSummary={retirementSummary}
          handleExportAllToPdf={handleExportAllToPdf}
          handleExportAllToExcel={handleExportAllToExcel}
          page={page} // Pass page state
          rowsPerPage={rowsPerPage} // Pass rowsPerPage state
          onPageChange={handleChangePage} // Pass page change handler
          onRowsPerPageChange={handleChangeRowsPerPage} // Pass rows per page change handler
        />
        <AppInfoView />
      </Box>
    </AppsContent>
  );
};

export default Rp104Page;