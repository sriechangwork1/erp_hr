// rp109/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

import AdministrativePositionsTable from './Table';
import { StaffDataRaw, AdministrativeStaffDisplay, GroupedAdminPositionRow, StaffTypeMapping, Faculty } from './types';
import { exportAdminPositionsToPdf } from './utils/pdfExporter';
import { exportAdminPositionsToExcel } from './utils/excelExporter';

// --- Static Faculty Data (reused) ---
const faculties: Faculty[] = [
  { FACULTYID: "1", FACULTYNAME: "สำนักงานอธิการบดี-กองบริหารงานทั่วไป" },
  { FACULTYID: "2", FACULTYNAME: "สำนักงานอธิการบดี-กองนโยบายและแผน" },
  { FACULTYID: "3", FACULTYNAME: "สำนักงานอธิการบดี-กองพัฒนานักศึกษา" },
  { FACULTYID: "12", FACULTYNAME: "คณะครุศาสตร์" },
  { FACULTYID: "13", FACULTYNAME: "คณะมนุษยศาสตร์และสังคมศาสตร์" },
  { FACULTYID: "14", FACULTYNAME: "คณะวิทยาศาสตร์" },
  { FACULTYID: "15", FACULTYNAME: "คณะวิทยาการจัดการ" },
  { FACULTYID: "16", "FACULTYNAME" : "คณะเทคโนโลยี" },
  { FACULTYID: "17", "FACULTYNAME" : "บัณฑิตวิทยาลัย" },
  { FACULTYID: "18", "FACULTYNAME" : "คณะนิติศาสตร์" },
  { FACULTYID: "19", "FACULTYNAME" : "คณะพยาบาลศาสตร์" },
  { FACULTYID: "20", "FACULTYNAME" : "คณะแพทยศาสตร์" },
  // ... (Full list from sys_faculty_202506192125.json)
];

// Helper functions (reused)
const getRandomInt = (min: number, max: number) => { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min + 1)) + min; };
const getRandomItem = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const mapGender = (genderCode: string): 'ชาย' | 'หญิง' | 'ไม่ระบุ' => {
  if (genderCode === '1') return 'ชาย';
  if (genderCode === '2') return 'หญิง';
  return 'ไม่ระบุ';
};

// --- Initial Raw Staff Data Generation (sufficient for this report) ---
const generateInitialRawStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = ["สมชาย", "สมหญิง", "วีระ", "อรุณี", "ปรีชา", "กัญญา", "มานะ", "ดวงใจ", "ทรงชัย", "สุพรรณี", "อำนาจ", "นภา"];
  const lastNames = ["สุขใจ", "ดีเยี่ยม", "คงทน", "งามยิ่ง", "พอเพียง", "รักชาติ", "เมตตา", "เจริญสุข", "มั่นคง", "สุขสม", "พิทักษ์", "ไพศาล"];
  const academicPositions = ["ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", "อาจารย์", "อาจารย์พิเศษ"];
  const adminPositions = ["ผู้อำนวยการกอง", "หัวหน้างาน", "เลขานุการคณะ", "หัวหน้าภาควิชา", "คณบดี", "รองคณบดี", "ผู้ช่วยคณบดี", "หัวหน้าสำนักงาน", "หัวหน้าศูนย์"]; // More focused admin positions for this report
  const generalPositions = ["นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป", "นักวิเคราะห์นโยบายและแผน", "เจ้าหน้าที่ธุรการ", "พนักงานขับรถ", "แม่บ้าน", "ยาม", "ผู้ช่วยวิจัย"];

  for (let i = 1; i <= count; i++) {
    const genderCode = getRandomItem(["1", "2"]);
    const birthYear = getRandomInt(1965, 2000);
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

    const faculty = getRandomItem(faculties);
    
    let positionAcademic: string | null = null;
    let positionAdmin: string | null = null;
    let positionWork: string | null = null;
    let staffTypeId: number;

    // Simulate staff having either an admin position, academic position, or general work
    const roleTypeRand = Math.random();
    if (roleTypeRand < 0.2) { // 20% chance to be an administrative position
        positionAdmin = getRandomItem(adminPositions);
        // Admin positions are typically ข้าราชการ or พนักงานมหาวิทยาลัย
        staffTypeId = getRandomItem([1, 3]);
        if (Math.random() < 0.3) { // Some administrators might also have an academic title
            positionAcademic = getRandomItem(academicPositions);
        }
    } else if (roleTypeRand < 0.5) { // 30% chance to be a pure academic position
        positionAcademic = getRandomItem(academicPositions);
        staffTypeId = getRandomItem([1, 3]);
    } else { // 50% chance to be a general work position (not administrative)
        positionWork = getRandomItem(generalPositions);
        staffTypeId = getRandomInt(2, 5); // ลูกจ้างประจำ, พนักงานมหาวิทยาลัย, พนักงานราชการ, ลูกจ้างชั่วคราว
    }
    
    // Ensure at least one position field is non-null for the staff record
    if (!positionAcademic && !positionAdmin && !positionWork) {
      positionWork = getRandomItem(generalPositions);
    }

    const startYear = getRandomInt(1985, 2024);
    const startMonth = getRandomInt(1, 12);
    const startDay = getRandomInt(1, 28);
    const dateOfAppointment = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;

    staffData.push({
      staff_id: 8000000 + i,
      citizen_id: `1${String(getRandomInt(10000000000, 99999999999))}`,
      prefixname_id: genderCode === "1" ? 1 : 2,
      academic_title: (positionAcademic && Math.random() < 0.7 && academicPositions.indexOf(positionAcademic) < 3) ? getRandomItem(["ผศ.", "รศ.", "ศ."]) : null,
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
      STAFFTYPE_ID: staffTypeId,
      BUDGET_ID: getRandomInt(1, 2),
      position_academic_name_th: positionAcademic,
      position_admin_name_th: positionAdmin, // This will be the main filter/grouping field
      POSITION_WORK: positionWork,
      date_of_appointment: dateOfAppointment,
      phone_number: `08${getRandomInt(10000000, 99999999)}`,
      email1: `staff${i}@example.com`,
      is_active: Math.random() > 0.1, // 90% active, 10% inactive
    });
  }
  return staffData;
};

const initialRawStaffData: StaffDataRaw[] = generateInitialRawStaffData(500); // More staff records to have enough administrators

const Hr912Page = () => {
  const { messages } = useIntl();
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [filterAdminPosition, setFilterAdminPosition] = useState<string>('');
  const [filterIsActive, setFilterIsActive] = useState<string>('true');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Process raw staff data into a simplified format for display and filter *only administrative staff*
  const administrativeStaff: AdministrativeStaffDisplay[] = useMemo(() => {
    return initialRawStaffData
      .filter(staff => staff.position_admin_name_th !== null && staff.position_admin_name_th !== '') // Only include staff with administrative positions
      .map((staff, index) => {
        return {
          id: staff.staff_id || index,
          staffId: staff.staff_id,
          fullNameTh: `${staff.first_name_th} ${staff.last_name_th}`,
          gender: mapGender(staff.gender),
          facultyName: staff.faculty_name_th,
          adminPositionName: staff.position_admin_name_th!, // We know it's not null here
          academicPositionName: staff.academic_title ? `${staff.academic_title}${staff.position_academic_name_th}` : staff.position_academic_name_th,
          staffTypeDisplay: StaffTypeMapping[staff.STAFFTYPE_ID] || 'ไม่ระบุ',
          dateOfAppointment: staff.date_of_appointment || '-',
          isActive: staff.is_active || false,
        };
      });
  }, []);

  // Filtered Administrative Staff based on user selections
  const allFilteredAdminStaff = useMemo(() => {
    let currentData = administrativeStaff;

    if (filterFacultyName) {
      currentData = currentData.filter(staff =>
        staff.facultyName === filterFacultyName
      );
    }

    if (filterAdminPosition) {
      currentData = currentData.filter(staff =>
        staff.adminPositionName === filterAdminPosition
      );
    }

    if (filterIsActive !== '') {
        const isActive = filterIsActive === 'true';
        currentData = currentData.filter(staff => staff.isActive === isActive);
    }

    return currentData;
  }, [administrativeStaff, filterFacultyName, filterAdminPosition, filterIsActive]);


  // Grouped and sorted data for the table display (Faculty -> Admin Position -> Staff)
  const groupedAndSortedData: GroupedAdminPositionRow[] = useMemo(() => {
    setIsLoading(true);
    const groupedMap = new Map<string, Map<string, AdministrativeStaffDisplay[]>>(); // Faculty -> Admin Position -> Staff List

    allFilteredAdminStaff.forEach(staff => {
      if (!groupedMap.has(staff.facultyName)) {
        groupedMap.set(staff.facultyName, new Map());
      }
      const facultyMap = groupedMap.get(staff.facultyName)!;

      if (!facultyMap.has(staff.adminPositionName)) {
        facultyMap.set(staff.adminPositionName, []);
      }
      facultyMap.get(staff.adminPositionName)!.push(staff);
    });

    const resultRows: GroupedAdminPositionRow[] = [];
    let grandTotalStaff = 0;
    let grandTotalMale = 0;
    let grandTotalFemale = 0;

    const sortedFaculties = Array.from(groupedMap.keys()).sort((a, b) => a.localeCompare(b));

    sortedFaculties.forEach(facultyName => {
      const facultyMap = groupedMap.get(facultyName)!;
      let facultyTotalStaff = 0;
      let facultyTotalMale = 0;
      let facultyTotalFemale = 0;

      // Add Faculty Header
      resultRows.push({
        groupKey: `faculty-${facultyName}`,
        type: 'faculty_header',
        facultyName: facultyName,
      });

      const sortedAdminPositions = Array.from(facultyMap.keys()).sort((a, b) => a.localeCompare(b));

      sortedAdminPositions.forEach(adminPositionName => {
        const staffList = facultyMap.get(adminPositionName)!;
        let adminPosTotalStaff = 0;
        let adminPosTotalMale = 0;
        let adminPosTotalFemale = 0;

        // Add Admin Position Header
        resultRows.push({
          groupKey: `${facultyName}__${adminPositionName}`,
          type: 'admin_position_header',
          facultyName: facultyName, // For consistency, though not displayed here
          adminPositionName: adminPositionName,
        });

        // Add Staff Details
        staffList.sort((a, b) => a.fullNameTh.localeCompare(b.fullNameTh)).forEach(staff => {
          resultRows.push({
            groupKey: `${facultyName}__${adminPositionName}__${staff.id}`,
            type: 'staff_detail',
            facultyName: staff.facultyName, // For consistency
            staffDetail: staff,
          });
          adminPosTotalStaff++;
          if (staff.gender === 'ชาย') adminPosTotalMale++;
          else if (staff.gender === 'หญิง') adminPosTotalFemale++;
        });

        // Add Admin Position Total
        resultRows.push({
          groupKey: `${facultyName}__${adminPositionName}__total`,
          type: 'admin_position_total',
          facultyName: facultyName,
          adminPositionName: adminPositionName,
          totalCount: adminPosTotalStaff,
          maleCount: adminPosTotalMale,
          femaleCount: adminPosTotalFemale,
        });

        facultyTotalStaff += adminPosTotalStaff;
        facultyTotalMale += adminPosTotalMale;
        facultyTotalFemale += adminPosTotalFemale;
      });

      // Add Faculty Total
      resultRows.push({
        groupKey: `faculty-${facultyName}-total`,
        type: 'faculty_total',
        facultyName: facultyName,
        totalCount: facultyTotalStaff,
        maleCount: facultyTotalMale,
        femaleCount: facultyTotalFemale,
      });

      grandTotalStaff += facultyTotalStaff;
      grandTotalMale += facultyTotalMale;
      grandTotalFemale += facultyTotalFemale;
    });

    // Add Grand Total
    if (resultRows.length > 0) {
      resultRows.push({
        groupKey: 'grand-total',
        type: 'grand_total',
        facultyName: 'รวมทั้งหมด', // Used for display
        totalCount: grandTotalStaff,
        maleCount: grandTotalMale,
        femaleCount: grandTotalFemale,
      });
    }
    setIsLoading(false);
    return resultRows;
  }, [allFilteredAdminStaff]);


  // Options for filter dropdowns
  const facultyOptions = useMemo(() => {
    return faculties.map(f => ({ value: f.FACULTYNAME, label: f.FACULTYNAME }));
  }, []);

  const adminPositionOptions = useMemo(() => {
    const positions = new Set<string>();
    administrativeStaff.forEach(staff => {
      if (staff.adminPositionName) {
        positions.add(staff.adminPositionName);
      }
    });
    return Array.from(positions).sort().map(pos => ({ value: pos, label: pos }));
  }, [administrativeStaff]);


  const handleExportPdf = useCallback(() => {
    exportAdminPositionsToPdf(groupedAndSortedData);
  }, [groupedAndSortedData]);

  const handleExportExcel = useCallback(() => {
    exportAdminPositionsToExcel(groupedAndSortedData);
  }, [groupedAndSortedData]);

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.rp01.09" />}
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
        {<IntlMessages id="sidebar.rp01.09" />}
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="หน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => setFilterFacultyName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {facultyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="ตำแหน่งบริหาร"
            value={filterAdminPosition}
            onChange={(e) => setFilterAdminPosition(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {adminPositionOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="สถานะ"
            value={filterIsActive}
            onChange={(e) => setFilterIsActive(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">-- ทั้งหมด --</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={() => {
              setFilterFacultyName('');
              setFilterAdminPosition('');
              setFilterIsActive('true');
            }}
          >
            ล้างตัวกรอง
          </Button>
        </Box>

        {/* Table Component */}
        <AdministrativePositionsTable
          groupedData={groupedAndSortedData}
          isLoading={isLoading}
          handleExportToPdf={handleExportPdf}
          handleExportToExcel={handleExportExcel}
        />
        <AppInfoView />
      </Box>
    </AppsContent>
  );
};

export default Hr912Page;