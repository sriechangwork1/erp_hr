// rp105/index.tsx
 // Rp108/index.tsx
'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import StaffSelector from './components/StaffSelector';
import PersonalInfoSection from './components/PersonalInfoSection';
import ServiceHistorySection from './components/ServiceHistorySection';
import EducationSection from './components/EducationSection';
import TrainingSection from './components/TrainingSection';
import AwardSection from './components/AwardSection';
import { StaffDataRaw, Gp7StaffData, StaffOption, StaffTypeMapping } from './types';
import { generateDetailedGp7StaffData } from './utils/dataSimulator';
import { exportGp7ToPdf } from './utils/pdfExporter';

// --- Static Faculty Data (reused from previous reports) ---
const faculties = [
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

// Helper to get position display name from raw staff data
const getPositionName = (staff: StaffDataRaw): string => {
  if (staff.position_academic_name_th) {
    return staff.academic_title ? `${staff.academic_title}${staff.position_academic_name_th}` : staff.position_academic_name_th;
  }
  if (staff.position_admin_name_th) {
    return staff.position_admin_name_th;
  }
  if (staff.POSITION_WORK) {
    return staff.POSITION_WORK;
  }
  return StaffTypeMapping[staff.STAFFTYPE_ID] || 'ไม่ระบุตำแหน่ง';
};

// --- Initial Raw Staff Data Generation (similar to hr910, but will be processed further) ---
const getRandomInt = (min: number, max: number) => { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min + 1)) + min; };
const getRandomItem = <T extends unknown>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateInitialRawStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = ["สมชาย", "สมหญิง", "วีระ", "อรุณี", "ปรีชา", "กัญญา", "มานะ", "ดวงใจ", "ทรงชัย", "สุพรรณี", "อำนาจ", "นภา"];
  const lastNames = ["สุขใจ", "ดีเยี่ยม", "คงทน", "งามยิ่ง", "พอเพียง", "รักชาติ", "เมตตา", "เจริญสุข", "มั่นคง", "สุขสม", "พิทักษ์", "ไพศาล"];
  const academicPositions = ["ศาสตราจารย์", "รองศาสตราจารย์", "ผู้ช่วยศาสตราจารย์", "อาจารย์", "อาจารย์พิเศษ"];
  const adminPositions = ["นักวิชาการศึกษา", "เจ้าหน้าที่บริหารงานทั่วไป", "นักวิเคราะห์นโยบายและแผน", "เจ้าหน้าที่ธุรการ", "ผู้อำนวยการกอง", "หัวหน้างาน", "พนักงานขับรถ", "แม่บ้าน", "ยาม", "ผู้ช่วยวิจัย"];

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

    if (Math.random() < 0.4) {
        positionAcademic = getRandomItem(academicPositions);
    } else {
        positionAdmin = getRandomItem(adminPositions);
    }

    if (positionAcademic) {
        if (positionAcademic === 'อาจารย์พิเศษ') {
            staffTypeId = 3;
        } else {
            staffTypeId = getRandomItem([1, 3]);
        }
    } else if (positionAdmin) {
        if (['ผู้อำนวยการกอง', 'หัวหน้างาน', 'นักวิชาการศึกษา'].includes(positionAdmin) && Math.random() < 0.4) {
            staffTypeId = getRandomItem([1, 3]);
        } else {
            staffTypeId = getRandomItem([2, 4, 5]);
        }
    } else {
        staffTypeId = getRandomInt(1, 5);
        positionWork = getRandomItem(adminPositions);
    }
    
    if (!positionAcademic && !positionAdmin && !positionWork) {
      positionWork = getRandomItem(adminPositions);
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
      position_admin_name_th: positionAdmin,
      POSITION_WORK: positionWork,
      date_of_appointment: dateOfAppointment,
      phone_number: `08${getRandomInt(10000000, 99999999)}`,
      email1: `staff${i}@example.com`,
      is_active: Math.random() > 0.1,
    });
  }
  return staffData;
};

const initialRawStaffData: StaffDataRaw[] = generateInitialRawStaffData(300); // Generate a base set of 300 staff

const Rp108Page = () => {
  const { messages } = useIntl();
  const [filterFacultyName, setFilterFacultyName] = useState<string>('');
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // All detailed GP7 data (pre-generated once for efficiency)
  const allGp7DetailedData: Gp7StaffData[] = useMemo(() => {
    setIsLoading(true);
    // Simulate a slight delay for data processing
    const data = generateDetailedGp7StaffData(initialRawStaffData);
    setIsLoading(false);
    return data;
  }, []); // Only runs once on mount

  // Filtered staff options for the selector dropdown
  const filteredStaffOptions: StaffOption[] = useMemo(() => {
    return allGp7DetailedData
      .filter(staff => 
        filterFacultyName ? staff.faculty_name_th.includes(filterFacultyName) : true
      )
      .map(staff => ({
        staff_id: staff.staff_id,
        fullNameTh: staff.fullNameTh,
        facultyName: staff.faculty_name_th,
        currentPositionName: staff.currentPositionDisplay,
      }))
      .sort((a,b) => a.fullNameTh.localeCompare(b.fullNameTh)); // Sort by name
  }, [allGp7DetailedData, filterFacultyName]);

  // Currently selected staff's full GP7 data
  const currentSelectedStaffData: Gp7StaffData | undefined = useMemo(() => {
    if (selectedStaffId === null) return undefined;
    return allGp7DetailedData.find(staff => staff.staff_id === selectedStaffId);
  }, [selectedStaffId, allGp7DetailedData]);

  // Handle staff selection from the dropdown
  const handleSelectStaff = useCallback((staffId: number | null) => {
    setSelectedStaffId(staffId);
  }, []);

  // Handle PDF Export
  const handleExportToPdf = useCallback(() => {
    if (currentSelectedStaffData) {
      Swal.fire({
        title: 'กำลังสร้าง PDF...',
        html: 'โปรดรอสักครู่ ระบบกำลังประมวลผล',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          // Delay to show loading spinner (optional, remove for faster response)
          setTimeout(() => {
            exportGp7ToPdf(currentSelectedStaffData);
            Swal.close();
            Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
          }, 500); // Simulate processing time
        }
      });
    } else {
      Swal.fire('ข้อผิดพลาด', 'กรุณาเลือกบุคลากรก่อนส่งออก', 'warning');
    }
  }, [currentSelectedStaffData]);

  // Options for faculty filter dropdown
  const facultyOptions = useMemo(() => {
    return faculties.map(f => ({ value: f.FACULTYID, label: f.FACULTYNAME }));
  }, []);

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.rp01.08" />}
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
        {<IntlMessages id="sidebar.rp01.08" />}
        </Typography>

        {/* Filter and Staff Selector Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
          <TextField
            select
            label="กรองตามหน่วยงาน"
            value={filterFacultyName}
            onChange={(e) => {
              setFilterFacultyName(e.target.value);
              setSelectedStaffId(null); // Clear selected staff when faculty filter changes
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
          
          <StaffSelector 
            staffList={filteredStaffOptions} 
            selectedStaffId={selectedStaffId} 
            onSelectStaff={handleSelectStaff}
            isLoading={isLoading}
          />

          <Button
            variant="contained"
            onClick={() => {
              setFilterFacultyName('');
              setSelectedStaffId(null);
            }}
          >
            ล้างตัวกรอง
          </Button>

          <Button
            variant="outlined"
            onClick={handleExportToPdf}
            disabled={!currentSelectedStaffData}
          >
            พิมพ์ ก.พ.7 (PDF)
          </Button>
        </Box>

        {/* G.P.7 Details Display */}
        {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <CircularProgress />
                <Typography sx={{ml: 2}}>กำลังประมวลผลข้อมูลจำลอง...</Typography>
            </Box>
        ) : (
            currentSelectedStaffData ? (
                <Box>
                    <PersonalInfoSection data={currentSelectedStaffData} />
                    <ServiceHistorySection data={currentSelectedStaffData} />
                    <EducationSection data={currentSelectedStaffData} />
                    <TrainingSection data={currentSelectedStaffData} />
                    <AwardSection data={currentSelectedStaffData} />
                </Box>
            ) : (
                <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                    โปรดเลือกบุคลากรเพื่อแสดงข้อมูล ก.พ.7
                </Typography>
            )
        )}
        <AppInfoView />
      </Box>
    </AppsContent>
  );
};

export default Rp108Page;