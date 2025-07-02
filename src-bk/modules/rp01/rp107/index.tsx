// rp107/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

import Table from './Table';
import { StaffDataRaw, StaffDetailForPositionReport, PositionByFacultySummaryRow, StaffTypeMapping } from './types';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew'; // Enable if font is set up.

import * as XLSX from 'xlsx';

// --- Static Faculty Data (reused from previous reports) ---
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

// Helper functions (reused)
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = <T extends unknown>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// --- Simulated Raw Staff Data Generation (adapted to include various positions) ---
const generateSimulatedStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = ["สมชาย", "สมหญิง", "วีระ", "อรุณี", "ปรีชา", "กัญญา", "มานะ", "ดวงใจ", "ทรงชัย", "สุพรรณี", "อำนาจ", "นภา"];
  const lastNames = ["สุขใจ", "ดีเยี่ยม", "คงทน", "งามยิ่ง", "พอเพียง", "รักชาติ", "เมตตา", "เจริญสุข", "มั่นคง", "สุขสม", "พิทักษ์", "ไพศาล"];
  const academicPositions = ["ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", "อาจารย์", "อาจารย์พิเศษ"];
  const adminPositions = ["นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป", "นักวิเคราะห์นโยบายและแผน", "เจ้าหน้าที่ธุรการ", "ผู้อำนวยการกอง", "หัวหน้างาน", "พนักงานขับรถ", "แม่บ้าน", "ยาม", "ผู้ช่วยวิจัย"];

  for (let i = 1; i <= count; i++) {
    const genderCode = getRandomItem(["1", "2"]);
    const birthYear = getRandomInt(1965, 2000); // Broader age range
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

    const faculty = getRandomItem(faculties);

    let positionAcademic: string | null = null;
    let positionAdmin: string | null = null;
    let positionWork: string | null = null;
    let staffTypeId: number;

    // First, determine if it's an academic or administrative role for simulation
    if (Math.random() < 0.4) { // 40% chance for academic role
        positionAcademic = getRandomItem(academicPositions);
    } else { // 60% chance for administrative role
        positionAdmin = getRandomItem(adminPositions);
    }

    // Assign staffTypeId based on the determined position
    if (positionAcademic) {
        if (positionAcademic === 'อาจารย์พิเศษ') {
            staffTypeId = 3; // อาจารย์พิเศษ is typically พนักงานมหาวิทยาลัย
        } else {
            // Other academic positions could be ข้าราชการ or พนักงานมหาวิทยาลัย
            staffTypeId = getRandomItem([1, 3]);
        }
    } else if (positionAdmin) {
        // Administrative positions can be various staff types
        if (['ผู้อำนวยการกอง', 'หัวหน้างาน'].includes(positionAdmin)) {
            staffTypeId = getRandomItem([1, 3, 4]); // ข้าราชการ, พนักงานมหาวิทยาลัย, พนักงานราชการ
        } else if (['นักวิชาการศึกษา', 'นักวิเคราะห์นโยบายและแผน'].includes(positionAdmin)) {
            staffTypeId = getRandomItem([1, 3, 4]); // ข้าราชการ, พนักงานมหาวิทยาลัย, พนักงานราชการ
        }
        else {
            // Lower-level administrative/support roles
            staffTypeId = getRandomItem([2, 4, 5]); // ลูกจ้างประจำ, พนักงานราชการ, ลูกจ้างชั่วคราว
        }
    } else {
        // Fallback if somehow no position was assigned, assign a random staffTypeId
        staffTypeId = getRandomInt(1, 5);
        positionWork = getRandomItem(adminPositions); // Ensure POSITION_WORK is populated if no academic/admin position
    }
    
    // Ensure at least one position field is non-null for the staff record
    // This helps in getPositionNameAndType to always find a position
    if (!positionAcademic && !positionAdmin && !positionWork) {
      // This case should ideally not happen with the logic above, but as a safeguard
      positionWork = getRandomItem(adminPositions);
    }

    const startYear = getRandomInt(1985, 2024);
    const startMonth = getRandomInt(1, 12);
    const startDay = getRandomInt(1, 28);
    const dateOfAppointment = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;

    staffData.push({
      staff_id: 8000000 + i, // Use a new range for staff IDs
      citizen_id: `1${String(getRandomInt(10000000000, 99999999999))}`,
      prefixname_id: genderCode === "1" ? 1 : 2,
      academic_title: (positionAcademic && Math.random() < 0.7 && academicPositions.indexOf(positionAcademic) < 3) ? getRandomItem(["ผศ.", "รศ.", "ศ."]) : null, // Only senior academic titles for Prof, Assoc Prof, Asst Prof
      first_name_th: getRandomItem(firstNames),
      last_name_th: getRandomItem(lastNames),
      middle_name_th: null,
      first_name_en: null,
      last_name_en: null,
      middle_name_en: null,
      gender: genderCode,
      date_of_birth: dateOfBirth,
      faculty_id: parseInt(faculty.FACULTYID),
      faculty_name_th: faculty.FACULTYNAME,
      STAFFTYPE_ID: staffTypeId, // ใช้ค่าที่ถูกคำนวณแล้ว
      BUDGET_ID: getRandomInt(1, 2),
      position_academic_name_th: positionAcademic,
      position_admin_name_th: positionAdmin,
      POSITION_WORK: positionWork,
      date_of_appointment: dateOfAppointment,
      phone_number: `08${getRandomInt(10000000, 99999999)}`,
      email1: `staff${i}@example.com`,
      is_active: Math.random() > 0.1, // 90% active, 10% inactive
    });
  }
  return staffData;
};

const initialStaffData: StaffDataRaw[] = generateSimulatedStaffData(300); // More staff records


// Helper functions
const mapGender = (genderCode: string): 'ชาย' | 'หญิง' | 'ไม่ระบุ' => {
  if (genderCode === '1') return 'ชาย';
  if (genderCode === '2') return 'หญิง';
  return 'ไม่ระบุ';
};

const getPositionNameAndType = (staff: StaffDataRaw): { positionName: string; positionType: 'สายวิชาการ' | 'สายสนับสนุน' | 'ไม่ระบุ' } => {
  let positionName = 'ไม่ระบุตำแหน่ง';
  let positionType: 'สายวิชาการ' | 'สายสนับสนุน' | 'ไม่ระบุ' = 'ไม่ระบุ';

  if (staff.position_academic_name_th) {
    positionName = staff.academic_title ? `${staff.academic_title}${staff.position_academic_name_th}` : staff.position_academic_name_th;
    positionType = 'สายวิชาการ';
  } else if (staff.position_admin_name_th) {
    positionName = staff.position_admin_name_th;
    positionType = 'สายสนับสนุน';
  } else if (staff.POSITION_WORK) {
    positionName = staff.POSITION_WORK;
    positionType = 'สายสนับสนุน'; // Assume POSITION_WORK is generally support
  }

  // Handle case where position name is null/empty but staff type implies a role
  if (positionName === 'ไม่ระบุตำแหน่ง' && staff.STAFFTYPE_ID) {
      const type = StaffTypeMapping[staff.STAFFTYPE_ID];
      if (type === 'ข้าราชการ' || type === 'พนักงานมหาวิทยาลัย') {
          positionType = 'สายวิชาการ'; // Default academic if no specific position but staff type is academic-like
      } else {
          positionType = 'สายสนับสนุน'; // Default support for other staff types
      }
      // If positionName is still 'ไม่ระบุตำแหน่ง', use the staff type as a fallback
      if (positionName === 'ไม่ระบุตำแหน่ง') {
          positionName = type;
      }
  }

  return { positionName, positionType };
};


const Rp107Page = () => {
  const { messages } = useIntl();
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterPositionType, setFilterPositionType] = useState<string>(''); // 'สายวิชาการ', 'สายสนับสนุน'
  const [filterIsActive, setFilterIsActive] = useState<string>('true'); // Default to active staff


  // Process raw staff data into a simplified format for this report
  const processedStaffData: StaffDetailForPositionReport[] = useMemo(() => {
    return initialStaffData.map((staff, index) => {
      const { positionName, positionType } = getPositionNameAndType(staff);
      return {
        id: staff.staff_id || index,
        staffId: staff.staff_id,
        fullNameTh: `${staff.first_name_th} ${staff.last_name_th}`,
        gender: mapGender(staff.gender),
        positionName: positionName,
        positionType: positionType,
        facultyName: staff.faculty_name_th,
      };
    });
  }, []);

  // Filtered Staff Data
  const allFilteredStaff = useMemo(() => {
    let currentData = processedStaffData;

    // Filter by faculty name
    if (filterFacultyName) {
      const lowerCaseFilter = filterFacultyName.toLowerCase();
      currentData = currentData.filter(staff =>
        staff.facultyName.toLowerCase().includes(lowerCaseFilter)
      );
    }

    // Filter by position type
    if (filterPositionType) {
      currentData = currentData.filter(staff =>
        staff.positionType === filterPositionType
      );
    }

    // Filter by active status
    if (filterIsActive !== '') {
        const isActive = filterIsActive === 'true';
        currentData = currentData.filter(staff => {
            const originalStaff = initialStaffData.find(s => s.staff_id === staff.staffId);
            return originalStaff ? originalStaff.is_active === isActive : false; // Default to inactive if original not found
        });
    }

    return currentData;
  }, [processedStaffData, filterFacultyName, filterPositionType, filterIsActive]);


  // Calculate Summary Data (PositionByFacultySummaryRow)
  const positionByFacultySummary: PositionByFacultySummaryRow[] = useMemo(() => {
    const summaryMap = new Map<string, Map<string, { total: number; male: number; female: number }>>(); // facultyName -> positionName -> counts

    allFilteredStaff.forEach(staff => {
      if (!summaryMap.has(staff.facultyName)) {
        summaryMap.set(staff.facultyName, new Map());
      }
      const facultyMap = summaryMap.get(staff.facultyName)!;

      if (!facultyMap.has(staff.positionName)) {
        facultyMap.set(staff.positionName, { total: 0, male: 0, female: 0 });
      }
      const positionStats = facultyMap.get(staff.positionName)!;

      positionStats.total++;
      if (staff.gender === 'ชาย') {
        positionStats.male++;
      } else if (staff.gender === 'หญิง') {
        positionStats.female++;
      }
    });

    const summaryRows: PositionByFacultySummaryRow[] = [];
    let grandTotalStaff = 0;
    let grandTotalMale = 0;
    let grandTotalFemale = 0;

    // Sort faculties alphabetically
    const sortedFaculties = Array.from(summaryMap.keys()).sort((a, b) => a.localeCompare(b));

    sortedFaculties.forEach(facultyName => {
      const facultyMap = summaryMap.get(facultyName)!;
      let facultyTotalStaff = 0;
      let facultyTotalMale = 0;
      let facultyTotalFemale = 0;

      // Add faculty header row
      summaryRows.push({
        groupKey: `faculty-${facultyName}`,
        type: 'faculty',
        facultyName: facultyName,
        positionName: 'รวม', // This will be ignored in rendering, but kept for type
        totalStaff: 0, maleCount: 0, femaleCount: 0, // Will be filled after summing positions
      });

      // Sort positions alphabetically for consistent display
      const sortedPositions = Array.from(facultyMap.keys()).sort((a, b) => a.localeCompare(b));

      sortedPositions.forEach(positionName => {
        const stats = facultyMap.get(positionName)!;
        summaryRows.push({
          groupKey: `${facultyName}__${positionName}`,
          type: 'position',
          facultyName: '', // Empty for sub-rows
          positionName: positionName,
          totalStaff: stats.total,
          maleCount: stats.male,
          femaleCount: stats.female,
        });
        facultyTotalStaff += stats.total;
        facultyTotalMale += stats.male;
        facultyTotalFemale += stats.female;
      });

      // Update faculty total row
      const facultyTotalRow = summaryRows.find(row => row.groupKey === `faculty-${facultyName}`);
      if (facultyTotalRow) {
        facultyTotalRow.totalStaff = facultyTotalStaff;
        facultyTotalRow.maleCount = facultyTotalMale;
        facultyTotalRow.femaleCount = facultyTotalFemale;
      }

      grandTotalStaff += facultyTotalStaff;
      grandTotalMale += facultyTotalMale;
      grandTotalFemale += facultyTotalFemale;
    });

    // Add Grand Total row at the very end
    if (summaryRows.length > 0) { // Only add if there's data
      summaryRows.push({
        groupKey: 'grand-total',
        type: 'grand_total',
        facultyName: 'รวมทั้งหมด',
        positionName: 'รวม', // Ignored in rendering
        totalStaff: grandTotalStaff,
        maleCount: grandTotalMale,
        femaleCount: grandTotalFemale,
      });
    }

    return summaryRows;
  }, [allFilteredStaff]);


  // Options for filter dropdowns
  const facultyOptions = useMemo(() => {
    return faculties.map(f => ({ value: f.FACULTYID, label: f.FACULTYNAME }));
  }, []);

  const positionTypeOptions = useMemo(() => {
    return [
      { value: 'สายวิชาการ', label: 'สายวิชาการ' },
      { value: 'สายสนับสนุน', label: 'สายสนับสนุน' },
    ];
  }, []);


  const handleExportAllToPdf = useCallback(() => {
    const doc = new jsPDF('p', 'mm', 'a4');
    // doc.setFont('THSarabunNew'); // Enable if font is set up.
    // doc.setR2L(false);

    let currentY = 10;
    const margin = 14;

    // --- Report Header ---
    doc.setFontSize(14);
    doc.text('รายงานสรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน', margin, currentY);
    currentY += 7;
    doc.setFontSize(12);
    doc.text(`ข้อมูล ณ วันที่ ${new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, currentY);
    currentY += 10;

    // --- Summary Table for PDF ---
    const pdfHeaders = [
      { header: 'หน่วยงาน / ตำแหน่ง', dataKey: 'facultyPosition' },
      { header: 'รวม (คน)', dataKey: 'totalStaff' },
      { header: 'ชาย', dataKey: 'maleCount' },
      { header: 'หญิง', dataKey: 'femaleCount' },
    ];

    const pdfBody = positionByFacultySummary.map(row => {
      let facultyPosition = '';
      if (row.type === 'faculty' || row.type === 'grand_total') {
        facultyPosition = row.facultyName;
      } else {
        facultyPosition = `    - ${row.positionName}`; // Indent for positions
      }

      return {
        facultyPosition: facultyPosition,
        totalStaff: row.totalStaff,
        maleCount: row.maleCount,
        femaleCount: row.femaleCount,
        _rowType: row.type, // Custom key for styling in didParseCell
      };
    });

    (doc as any).autoTable({
      head: [pdfHeaders.map(col => col.header)],
      body: pdfBody.map(row => pdfHeaders.map(col => row[col.dataKey as keyof typeof row])),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: { font: 'THSarabunNew', fontSize: 8, cellPadding: 1, overflow: 'linebreak' }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0,0,0] },
      didParseCell: (data: any) => {
        // Apply styling for faculty total rows and grand total row
        if (data.row.raw._rowType === 'faculty') {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [240, 240, 240];
        } else if (data.row.raw._rowType === 'grand_total') {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [220, 220, 220];
          data.cell.styles.lineWidth = 0.5; // Double border effect
        }
        if (data.column.dataKey === 'facultyPosition' && data.row.raw._rowType === 'position') {
            data.cell.styles.indent = 5; // Indent for position names
        }
      },
      didDrawPage: (data: any) => {
        doc.setFontSize(8);
        doc.text(`หน้า ${data.pageNumber}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    });

    doc.save('รายงานสรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน.pdf');
    Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
  }, [positionByFacultySummary]);

  const handleExportAllToExcel = useCallback(() => {
    // Prepare data for Excel
    const dataForExcel = positionByFacultySummary.map(row => {
      let facultyCol = '';
      let positionCol = '';
      if (row.type === 'faculty' || row.type === 'grand_total') {
        facultyCol = row.facultyName;
        positionCol = ''; // Position column is empty for faculty totals
      } else {
        facultyCol = ''; // Faculty column is empty for position rows
        positionCol = row.positionName;
      }

      return {
        'หน่วยงาน': facultyCol,
        'ตำแหน่ง': positionCol,
        'รวม (คน)': row.totalStaff,
        'ชาย': row.maleCount,
        'หญิง': row.femaleCount,
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);

    // Add some styling or formatting (optional)
    // For example, make total rows bold in Excel (requires more complex logic or manual formatting after export)
    // Or add header row formatting.

    XLSX.utils.book_append_sheet(workbook, worksheet, 'สรุปอัตรากำลัง');
    XLSX.writeFile(workbook, 'รายงานสรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน.xlsx');
    Swal.fire('สำเร็จ!', 'ส่งออก Excel เรียบร้อยแล้ว', 'success');
  }, [positionByFacultySummary]);

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.rp01.07" />}
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
        {<IntlMessages id="sidebar.rp01.07" />}
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="หน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => {
                setFilterFacultyName(e.target.value);
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 250 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {facultyOptions.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="ประเภทตำแหน่ง"
            value={filterPositionType}
            onChange={(e) => {
                setFilterPositionType(e.target.value);
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {positionTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="สถานะ"
            value={filterIsActive}
            onChange={(e) => {
                setFilterIsActive(e.target.value);
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">-- ทั้งหมด --</MenuItem>
            <MenuItem value="true">ปกติ</MenuItem>
            <MenuItem value="false">ไม่ปกติ</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={() => {
              setFilterFacultyName('');
              setFilterPositionType('');
              setFilterIsActive('true'); // Reset to default active
            }}
          >
            ล้างตัวกรอง
          </Button>
        </Box>

        {/* Table Component */}
        <Table
          summaryData={positionByFacultySummary}
          handleExportAllToPdf={handleExportAllToPdf}
          handleExportAllToExcel={handleExportAllToExcel}
        />
        <AppInfoView />
      </Box>
    </AppsContent>
  );
};

export default Rp107Page;