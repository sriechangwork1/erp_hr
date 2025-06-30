// hr1003/index.tsx
'use client';
import React, { useState, useMemo, useCallback } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';

import Table from './Table';
import {
  StaffDataRaw,
  StaffDetailByType,
  StaffTypeSummaryRow,
  StaffJobCategorySummaryRow,
  StaffTypeMapping,
  JobCategoryMapping,
} from './types';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import 'jspdf-autotable-font-loader/font/THSarabunNew';
// Enable if font is set up.

import * as XLSX from 'xlsx';

// --- Static Faculty Data (reused from previous reports) ---
const faculties = [
  { FACULTYID: '1', FACULTYNAME: 'สำนักงานอธิการบดี-กองบริหารงานทั่วไป' },
  { FACULTYID: '2', FACULTYNAME: 'สำนักงานอธิการบดี-กองนโยบายและแผน' },
  { FACULTYID: '3', FACULTYNAME: 'สำนักงานอธิการบดี-กองพัฒนานักศึกษา' },
  { FACULTYID: '12', FACULTYNAME: 'คณะครุศาสตร์' },
  { FACULTYID: '13', FACULTYNAME: 'คณะมนุษยศาสตร์และสังคมศาสตร์' },
  { FACULTYID: '14', FACULTYNAME: 'คณะวิทยาศาสตร์' },
  { FACULTYID: '15', FACULTYNAME: 'คณะวิทยาการจัดการ' },
  { FACULTYID: '16', FACULTYNAME: 'คณะเทคโนโลยี' },
  { FACULTYID: '17', FACULTYNAME: 'บัณฑิตวิทยาลัย' },
  { FACULTYID: '18', FACULTYNAME: 'คณะนิติศาสตร์' },
  { FACULTYID: '19', FACULTYNAME: 'คณะพยาบาลศาสตร์' },
  { FACULTYID: '20', FACULTYNAME: 'คณะแพทยศาสตร์' },
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

// --- Simulated Raw Staff Data Generation (adapted for new STAFFTYPE_ID and JOB_CATEGORY_ID) ---
const generateSimulatedStaffData = (count: number): StaffDataRaw[] => {
  const staffData: StaffDataRaw[] = [];
  const firstNames = [
    'สมชาย',
    'สมหญิง',
    'วีระ',
    'อรุณี',
    'ปรีชา',
    'กัญญา',
    'มานะ',
    'ดวงใจ',
    'ทรงชัย',
    'สุพรรณี',
    'อำนาจ',
    'นภา',
  ];
  const lastNames = [
    'สุขใจ',
    'ดีเยี่ยม',
    'คงทน',
    'งามยิ่ง',
    'พอเพียง',
    'รักชาติ',
    'เมตตา',
    'เจริญสุข',
    'มั่นคง',
    'สุขสม',
    'พิทักษ์',
    'ไพศาล',
  ];
  const academicPositions = [
    'ศาสตราจารย์',
    'รองศาสตราจารย์',
    'ผู้ช่วยศาสตราจารย์',
    'อาจารย์',
  ];
  const adminPositions = [
    'นักวิชาการศึกษา',
    'เจ้าหน้าที่บริหารงานทั่วไป',
    'นักวิเคราะห์นโยบายและแผน',
    'เจ้าหน้าที่ธุรการ',
    'ผู้อำนวยการกอง',
    'พนักงานขับรถ',
    'แม่บ้าน',
  ];

  for (let i = 1; i <= count; i++) {
    const genderCode = getRandomItem(['1', '2']);
    const birthYear = getRandomInt(1970, 2000);
    const birthMonth = getRandomInt(1, 12);
    const birthDay = getRandomInt(1, 28);
    const dateOfBirth = `${birthYear}-${String(birthMonth).padStart(
      2,
      '0',
    )}-${String(birthDay).padStart(2, '0')}`;

    const faculty = getRandomItem(faculties);

    // Include all 5 STAFFTYPE_ID values, biasing some types for variety
    let staffTypeId: number;
    const randomType = Math.random();
    if (randomType < 0.3) staffTypeId = 1; // ข้าราชการ
    else if (randomType < 0.5) staffTypeId = 3; // พนักงานมหาวิทยาลัย
    else if (randomType < 0.7) staffTypeId = 4; // พนักงานราชการ
    else if (randomType < 0.85) staffTypeId = 2; // ลูกจ้างประจำ
    else staffTypeId = 5; // ลูกจ้างชั่วคราว

    // Assign JOB_CATEGORY_ID based on staff type and position for more realistic data
    let jobCategoryId: number;
    if (staffTypeId === 1 || staffTypeId === 3) {
      // ข้าราชการ, พนักงานมหาวิทยาลัย (มักจะมีสายงานสอนและวิจัย หรือบริหาร)
      if (Math.random() < 0.7) {
        jobCategoryId = 1; // สอนและวิจัย
      } else {
        jobCategoryId = getRandomItem([2, 3, 4, 5, 6]); // ผู้บริหาร, บริหารงานทั่วไป, บริการวิชาการ, วิจัยและพัฒนา, สนับสนุนวิชาการ
      }
    } else {
      // ลูกจ้างประจำ, พนักงานราชการ, ลูกจ้างชั่วคราว (มักจะเป็นสายสนับสนุน)
      jobCategoryId = getRandomItem([3, 4, 6]); // บริหารงานทั่วไป, บริการวิชาการ, สนับสนุนวิชาการ
    }

    const budgetId = getRandomInt(1, 2);
    let positionAcademic = null;
    let positionAdmin = null;
    let positionWork = null;

    if (staffTypeId === 1 || staffTypeId === 3) {
      // ข้าราชการ, พนักงานมหาวิทยาลัย (มักมีตำแหน่งวิชาการ)
      if (Math.random() > 0.4) {
        // More likely to be academic for these types
        positionAcademic = getRandomItem(academicPositions);
      } else {
        positionAdmin = getRandomItem(adminPositions);
      }
    } else {
      // ลูกจ้างประจำ, พนักงานราชการ, ลูกจ้างชั่วคราว (มักเป็นสายสนับสนุน)
      positionAdmin = getRandomItem(adminPositions);
    }
    if (!positionAcademic && !positionAdmin) {
      positionWork = getRandomItem(adminPositions); // Fallback for position
    }

    const startYear = getRandomInt(1990, 2024);
    const startMonth = getRandomInt(1, 12);
    const startDay = getRandomInt(1, 28);
    const dateOfAppointment = `${startYear}-${String(startMonth).padStart(
      2,
      '0',
    )}-${String(startDay).padStart(2, '0')}`;

    staffData.push({
      staff_id: 7000000 + i, // Use a new range for staff IDs
      citizen_id: `1${String(getRandomInt(10000000000, 99999999999))}`,
      prefixname_id: genderCode === '1' ? 1 : 2,
      academic_title: positionAcademic
        ? getRandomItem(['', 'ผศ.', 'รศ.', 'ศ.'])
        : null,
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
      JOB_CATEGORY_ID: jobCategoryId,
      BUDGET_ID: budgetId,
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

const initialStaffData: StaffDataRaw[] = generateSimulatedStaffData(250); // Generate more staff records

// Helper functions
const mapGender = (genderCode: string): 'ชาย' | 'หญิง' | 'ไม่ระบุ' => {
  if (genderCode === '1') return 'ชาย';
  if (genderCode === '2') return 'หญิง';
  return 'ไม่ระบุ';
};
const getPositionName = (staff: StaffDataRaw): string => {
  if (staff.academic_title && staff.position_academic_name_th)
    return `${staff.academic_title}${staff.position_academic_name_th}`;
  if (staff.position_academic_name_th) return staff.position_academic_name_th;
  if (staff.position_admin_name_th) return staff.position_admin_name_th;
  if (staff.POSITION_WORK) return staff.POSITION_WORK;
  return 'ไม่ระบุตำแหน่ง';
};

const Hr1003Page = () => {
  const { messages } = useIntl();
  const [filterStaffType, setFilterStaffType] = useState<string>(''); // Filter by Staff Type Name
  const [filterJobCategory, setFilterJobCategory] = useState<string>(''); // Filter by Job Category Name
  const [filterFacultyName, setFilterFacultyName] = useState<string>(''); // Filter by Faculty Name
  const [filterIsActive, setFilterIsActive] = useState<string>('true'); // Default to active staff

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  // Process raw staff data into StaffDetailByType objects
  const processedStaffData: StaffDetailByType[] = useMemo(() => {
    return initialStaffData.map((staff, index) => {
      return {
        id: staff.staff_id || index,
        staffId: staff.staff_id,
        fullNameTh: `${staff.first_name_th} ${staff.last_name_th}`,
        gender: mapGender(staff.gender),
        positionName: getPositionName(staff),
        staffTypeName: StaffTypeMapping[staff.STAFFTYPE_ID] || 'ไม่ระบุประเภท',
        jobCategoryName:
          JobCategoryMapping[staff.JOB_CATEGORY_ID] || 'ไม่ระบุสายงาน',
        facultyName: staff.faculty_name_th,
        dateOfAppointment: staff.date_of_appointment,
        phoneNumber: staff.phone_number,
        email: staff.email1,
      };
    });
  }, []);

  // Filtered Staff Data (before pagination)
  const allFilteredStaff = useMemo(() => {
    let currentData = processedStaffData;

    // Filter by staff type name
    if (filterStaffType) {
      currentData = currentData.filter(
        (staff) => staff.staffTypeName === filterStaffType,
      );
    }

    // Filter by job category name
    if (filterJobCategory) {
      currentData = currentData.filter(
        (staff) => staff.jobCategoryName === filterJobCategory,
      );
    }

    // Filter by faculty name
    if (filterFacultyName) {
      const lowerCaseFilter = filterFacultyName.toLowerCase();
      currentData = currentData.filter((staff) =>
        staff.facultyName.toLowerCase().includes(lowerCaseFilter),
      );
    }

    // Filter by active status
    if (filterIsActive !== '') {
      const isActive = filterIsActive === 'true';
      currentData = currentData.filter((staff) => {
        const originalStaff = initialStaffData.find(
          (s) => s.staff_id === staff.staffId,
        );
        return originalStaff ? originalStaff.is_active === isActive : false; // Default to inactive if original not found
      });
    }

    return currentData.sort((a, b) => {
      // Sort by Staff Type first, then by Job Category, then by Faculty, then by Full Name
      const typeOrder =
        Object.values(StaffTypeMapping).indexOf(a.staffTypeName) -
        Object.values(StaffTypeMapping).indexOf(b.staffTypeName);
      if (typeOrder !== 0) return typeOrder;

      const jobCategoryOrder =
        Object.values(JobCategoryMapping).indexOf(a.jobCategoryName) -
        Object.values(JobCategoryMapping).indexOf(b.jobCategoryName);
      if (jobCategoryOrder !== 0) return jobCategoryOrder;

      const facultyOrder = a.facultyName.localeCompare(b.facultyName);
      if (facultyOrder !== 0) return facultyOrder;
      return a.fullNameTh.localeCompare(b.fullNameTh);
    });
  }, [
    processedStaffData,
    filterStaffType,
    filterJobCategory,
    filterFacultyName,
    filterIsActive,
  ]);

  // Data for current page (paginated)
  const paginatedStaff = useMemo(() => {
    return allFilteredStaff.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [allFilteredStaff, page, rowsPerPage]);

  // Calculate Staff Type Summary
  const staffTypeSummary: StaffTypeSummaryRow[] = useMemo(() => {
    const summaryMap = new Map<
      string,
      { total: number; male: number; female: number }
    >();

    // Initialize map with all staff types from mapping, ensuring order
    Object.values(StaffTypeMapping).forEach((typeName) => {
      summaryMap.set(typeName, { total: 0, male: 0, female: 0 });
    });

    allFilteredStaff.forEach((staff) => {
      const typeName = staff.staffTypeName;
      if (summaryMap.has(typeName)) {
        // Only count if type is in our mapping
        const typeStats = summaryMap.get(typeName)!;
        typeStats.total++;
        if (staff.gender === 'ชาย') {
          typeStats.male++;
        } else if (staff.gender === 'หญิง') {
          typeStats.female++;
        }
      }
    });

    const summaryRows: StaffTypeSummaryRow[] = Array.from(
      summaryMap.entries(),
    ).map(([typeName, stats]) => ({
      staffTypeName: typeName,
      totalStaff: stats.total,
      maleCount: stats.male,
      femaleCount: stats.female,
    })).sort((a, b) => {
      // Ensure summary rows are sorted by their defined order
      return (
        Object.values(StaffTypeMapping).indexOf(a.staffTypeName) -
        Object.values(StaffTypeMapping).indexOf(b.staffTypeName)
      );
    });

    // Add "รวมทั้งหมด" row at the beginning
    const totalRow: StaffTypeSummaryRow = {
      staffTypeName: 'รวมทั้งหมด',
      totalStaff: summaryRows.reduce((sum, row) => sum + row.totalStaff, 0),
      maleCount: summaryRows.reduce((sum, row) => sum + row.maleCount, 0),
      femaleCount: summaryRows.reduce((sum, row) => sum + row.femaleCount, 0),
    };
    return [totalRow, ...summaryRows];
  }, [allFilteredStaff]);

  // Calculate Job Category Summary
  const jobCategorySummary: StaffJobCategorySummaryRow[] = useMemo(() => {
    const summaryMap = new Map<
      string,
      { total: number; male: number; female: number }
    >();

    // Initialize map with all job categories from mapping, ensuring order
    Object.values(JobCategoryMapping).forEach((categoryName) => {
      summaryMap.set(categoryName, { total: 0, male: 0, female: 0 });
    });

    allFilteredStaff.forEach((staff) => {
      const categoryName = staff.jobCategoryName;
      if (summaryMap.has(categoryName)) {
        const categoryStats = summaryMap.get(categoryName)!;
        categoryStats.total++;
        if (staff.gender === 'ชาย') {
          categoryStats.male++;
        } else if (staff.gender === 'หญิง') {
          categoryStats.female++;
        }
      }
    });

    const summaryRows: StaffJobCategorySummaryRow[] = Array.from(
      summaryMap.entries(),
    ).map(([categoryName, stats]) => ({
      jobCategoryName: categoryName,
      totalStaff: stats.total,
      maleCount: stats.male,
      femaleCount: stats.female,
    })).sort((a, b) => {
      return (
        Object.values(JobCategoryMapping).indexOf(a.jobCategoryName) -
        Object.values(JobCategoryMapping).indexOf(b.jobCategoryName)
      );
    });

    // Add "รวมทั้งหมด" row
    const totalRow: StaffJobCategorySummaryRow = {
      jobCategoryName: 'รวมทั้งหมด',
      totalStaff: summaryRows.reduce((sum, row) => sum + row.totalStaff, 0),
      maleCount: summaryRows.reduce((sum, row) => sum + row.maleCount, 0),
      femaleCount: summaryRows.reduce(
        (sum, row) => sum + row.femaleCount,
        0,
      ),
    };
    return [totalRow, ...summaryRows];
  }, [allFilteredStaff]);

  // Options for filter dropdowns
  const staffTypeOptions = useMemo(() => {
    return Object.values(StaffTypeMapping).map((type) => ({
      value: type,
      label: type,
    }));
  }, []);
  const jobCategoryOptions = useMemo(() => {
    return Object.values(JobCategoryMapping).map((category) => ({
      value: category,
      label: category,
    }));
  }, []);
  const facultyOptions = useMemo(() => {
    return faculties.map((f) => ({ value: f.FACULTYID, label: f.FACULTYNAME }));
  }, []);

  const handleExportAllToPdf = useCallback(() => {
    const doc = new jsPDF('p', 'mm', 'a4');
    // doc.setFont('THSarabunNew'); // Enable if font is set up.
    // doc.setR2L(false);

    let currentY = 10;
    const margin = 14;

    // --- Report Header ---
    doc.setFontSize(14);
    doc.text('รายงานรายชื่อบุคลากรแยกตามประเภทบุคลากรและสายงาน', margin, currentY);
    currentY += 7;
    doc.setFontSize(12);
    doc.text(
      `ข้อมูล ณ วันที่ ${new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      margin,
      currentY,
    );
    currentY += 10;

    // --- Summary Section: Staff Type ---
    doc.setFontSize(12);
    doc.text('1. สรุปจำนวนบุคลากรแยกตามประเภทบุคลากร', margin, currentY);
    currentY += 5;

    const summaryTypeColumnsForPdf = [
      { header: 'ประเภทบุคลากร', dataKey: 'staffTypeName' },
      { header: 'รวม (คน)', dataKey: 'totalStaff' },
      { header: 'ชาย', dataKey: 'maleCount' },
      { header: 'หญิง', dataKey: 'femaleCount' },
    ];
    const summaryTypeRowsForPdf = staffTypeSummary.map((row) => ({
      staffTypeName: row.staffTypeName,
      totalStaff: row.totalStaff,
      maleCount: row.maleCount,
      femaleCount: row.femaleCount,
    }));
    (doc as any).autoTable({
      head: [summaryTypeColumnsForPdf.map((col) => col.header)],
      body: summaryTypeRowsForPdf.map((row) =>
        summaryTypeColumnsForPdf.map((col) => row[col.dataKey as keyof typeof row]),
      ),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: {
        font: 'THSarabunNew',
        fontSize: 8,
        cellPadding: 1,
        overflow: 'linebreak',
      }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y;
      },
    });
    currentY = (doc as any).autoTable.previous.finalY + 10;

    // --- Summary Section: Job Category ---
    doc.setFontSize(12);
    doc.text('2. สรุปจำนวนบุคลากรแยกตามสายงาน', margin, currentY);
    currentY += 5;

    const summaryJobCategoryColumnsForPdf = [
      { header: 'สายงาน', dataKey: 'jobCategoryName' },
      { header: 'รวม (คน)', dataKey: 'totalStaff' },
      { header: 'ชาย', dataKey: 'maleCount' },
      { header: 'หญิง', dataKey: 'femaleCount' },
    ];
    const summaryJobCategoryRowsForPdf = jobCategorySummary.map((row) => ({
      jobCategoryName: row.jobCategoryName,
      totalStaff: row.totalStaff,
      maleCount: row.maleCount,
      femaleCount: row.femaleCount,
    }));
    (doc as any).autoTable({
      head: [summaryJobCategoryColumnsForPdf.map((col) => col.header)],
      body: summaryJobCategoryRowsForPdf.map((row) =>
        summaryJobCategoryColumnsForPdf.map(
          (col) => row[col.dataKey as keyof typeof row],
        ),
      ),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: {
        font: 'THSarabunNew',
        fontSize: 8,
        cellPadding: 1,
        overflow: 'linebreak',
      }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      didDrawPage: (data: any) => {
        currentY = data.cursor.y;
      },
    });
    currentY = (doc as any).autoTable.previous.finalY + 10;

    // --- Detailed List Section ---
    doc.setFontSize(12);
    doc.text('3. รายชื่อบุคลากร', margin, currentY);
    currentY += 5;
    const detailColumnsForPdf = [
      { header: 'ลำดับ', dataKey: 'index' },
      { header: 'ประเภทบุคลากร', dataKey: 'staffTypeName' },
      { header: 'สายงาน', dataKey: 'jobCategoryName' },
      { header: 'ชื่อ-นามสกุล', dataKey: 'fullNameTh' },
      { header: 'ตำแหน่ง', dataKey: 'positionName' },
      { header: 'หน่วยงาน', dataKey: 'facultyName' },
      { header: 'เพศ', dataKey: 'gender' },
      { header: 'วันที่บรรจุ', dataKey: 'dateOfAppointment' },
      // { header: 'เบอร์โทร', dataKey: 'phoneNumber' },
      // { header: 'อีเมล', dataKey: 'email' },
    ];

    const detailRowsForPdf = allFilteredStaff.map((staff, index) => ({
      index: index + 1,
      staffTypeName: staff.staffTypeName,
      jobCategoryName: staff.jobCategoryName,
      fullNameTh: staff.fullNameTh,
      positionName: staff.positionName,
      facultyName: staff.facultyName,
      gender: staff.gender,
      dateOfAppointment: staff.dateOfAppointment || '-', // Ensure a string for PDF
      // phoneNumber: staff.phoneNumber,
      // email: staff.email,
    }));
    (doc as any).autoTable({
      head: [detailColumnsForPdf.map((col) => col.header)],
      body: detailRowsForPdf.map((row) =>
        detailColumnsForPdf.map((col) => row[col.dataKey as keyof typeof row]),
      ),
      startY: currentY,
      margin: { left: margin, right: margin },
      styles: {
        font: 'THSarabunNew',
        fontSize: 7,
        cellPadding: 1,
        overflow: 'linebreak',
      }, // Add font style if installed
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 10 }, // ลำดับ
        1: { cellWidth: 20 }, // ประเภทบุคลากร (ปรับลดเพื่อให้มีที่ว่าง)
        2: { cellWidth: 20 }, // สายงาน (เพิ่มเข้ามา)
        3: { cellWidth: 30 }, // ชื่อ-นามสกุล (ปรับลดเพื่อให้มีที่ว่าง)
        4: { cellWidth: 25 }, // ตำแหน่ง (ปรับลดเพื่อให้มีที่ว่าง)
        5: { cellWidth: 35 }, // หน่วยงาน (ปรับลดเพื่อให้มีที่ว่าง)
        6: { cellWidth: 10 }, // เพศ
        7: { cellWidth: 18 }, // วันที่บรรจุ (ปรับลดเพื่อให้มีที่ว่าง)
        // 8: { cellWidth: 20 },  // เบอร์โทร
        // 9: { cellWidth: 30 },  // อีเมล
      },
      didDrawPage: (data: any) => {
        doc.setFontSize(8);
        doc.text(
          `หน้า ${data.pageNumber}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' },
        );
      },
    });

    doc.save('รายงานรายชื่อบุคลากรตามประเภทบุคลากรและสายงาน.pdf');
    Swal.fire('สำเร็จ!', 'ส่งออก PDF เรียบร้อยแล้ว', 'success');
  }, [allFilteredStaff, staffTypeSummary, jobCategorySummary]);

  const handleExportAllToExcel = useCallback(() => {
    // Prepare Summary data: Staff Type
    const summaryTypeDataForExcel = staffTypeSummary.map((row) => ({
      'ประเภทบุคลากร': row.staffTypeName,
      'รวม (คน)': row.totalStaff,
      'ชาย': row.maleCount,
      'หญิง': row.femaleCount,
    }));

    // Prepare Summary data: Job Category
    const summaryJobCategoryDataForExcel = jobCategorySummary.map((row) => ({
      'สายงาน': row.jobCategoryName,
      'รวม (คน)': row.totalStaff,
      'ชาย': row.maleCount,
      'หญิง': row.femaleCount,
    }));

    // Prepare Detailed data
    const detailDataForExcel = allFilteredStaff.map((staff, index) => ({
      'ลำดับ': index + 1,
      'ประเภทบุคลากร': staff.staffTypeName,
      'สายงาน': staff.jobCategoryName,
      'ชื่อ-นามสกุล': staff.fullNameTh,
      'ตำแหน่ง': staff.positionName,
      'หน่วยงาน': staff.facultyName,
      'เพศ': staff.gender,
      'วันที่บรรจุ': staff.dateOfAppointment || '-',
      // 'เบอร์โทร': staff.phoneNumber,
      // 'อีเมล': staff.email,
    }));

    const workbook = XLSX.utils.book_new();

    // Add Summary Type sheet
    const summaryTypeSheet = XLSX.utils.json_to_sheet(summaryTypeDataForExcel);
    XLSX.utils.book_append_sheet(
      workbook,
      summaryTypeSheet,
      'สรุปบุคลากรตามประเภท',
    );

    // Add Summary Job Category sheet
    const summaryJobCategorySheet = XLSX.utils.json_to_sheet(
      summaryJobCategoryDataForExcel,
    );
    XLSX.utils.book_append_sheet(
      workbook,
      summaryJobCategorySheet,
      'สรุปบุคลากรตามสายงาน',
    );

    // Add Detailed List sheet
    const detailSheet = XLSX.utils.json_to_sheet(detailDataForExcel);
    XLSX.utils.book_append_sheet(workbook, detailSheet, 'รายชื่อบุคลากร');

    XLSX.writeFile(
      workbook,
      'รายงานรายชื่อบุคลากรตามประเภทบุคลากรและสายงาน.xlsx',
    );
    Swal.fire('สำเร็จ!', 'ส่งออก Excel เรียบร้อยแล้ว', 'success');
  }, [allFilteredStaff, staffTypeSummary, jobCategorySummary]);

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.hr10.03" />}
      sx={{
        mb: 2,
        mt: 2,
        py: 0,
        flex: 1,
        '& .apps-content': {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography component="h2" variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
          {<IntlMessages id="sidebar.hr10.03" />}
        </Typography>

        {/* Filter Section */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
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

          {/* New Filter for Job Category */}
          <TextField
            select
            label="สายงาน"
            value={filterJobCategory}
            onChange={(e) => {
              setFilterJobCategory(e.target.value);
              setPage(0); // Reset page on filter change
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">-- เลือกทั้งหมด --</MenuItem>
            {jobCategoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
              <MenuItem key={option.value} value={option.label}>
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
              setPage(0); // Reset page on filter change
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
              setFilterStaffType('');
              setFilterJobCategory(''); // Reset job category filter
              setFilterFacultyName('');
              setFilterIsActive('true'); // Reset to default active
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
          staffTypeSummary={staffTypeSummary}
          jobCategorySummary={jobCategorySummary}
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

export default Hr1003Page;