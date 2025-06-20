// src/pages/hr911/utils/dataSimulator.ts

import { StaffDataRaw, Gp7StaffData, HistoricalPosition, EducationRecord, TrainingRecord, AwardRecord, StaffTypeMapping } from '../types';

// Helper functions (reused/adapted)
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = <T extends unknown>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomDate = (startYear: number, endYear: number): string => {
  const year = getRandomInt(startYear, endYear);
  const month = String(getRandomInt(1, 12)).padStart(2, '0');
  const day = String(getRandomInt(1, 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

// --- Main Simulation Function for G.P.7 Data ---
export const generateDetailedGp7StaffData = (rawStaffData: StaffDataRaw[]): Gp7StaffData[] => {
  return rawStaffData.map((staff) => {
    const gp7Data: Gp7StaffData = {
      ...staff,
      fullNameTh: `${staff.first_name_th} ${staff.last_name_th}`,
      fullNameEn: staff.first_name_en && staff.last_name_en ? `${staff.first_name_en} ${staff.last_name_en}` : null,
      genderTh: staff.gender === '1' ? 'ชาย' : staff.gender === '2' ? 'หญิง' : 'ไม่ระบุ',
      currentPositionDisplay: getPositionName(staff),
      currentStaffTypeDisplay: StaffTypeMapping[staff.STAFFTYPE_ID] || 'ไม่ระบุประเภท',

      historicalPositions: [],
      educationHistory: [],
      trainingHistory: [],
      awardHistory: [],
    };

    const birthYear = parseInt(staff.date_of_birth.substring(0, 4));
    const appointmentYear = staff.date_of_appointment ? parseInt(staff.date_of_appointment.substring(0, 4)) : birthYear + 25; // Approx 25 years after birth if no appointment date

    // 1. Simulate Education History
    const degrees = ['ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก'];
    const institutions = ['มหาวิทยาลัยขอนแก่น', 'จุฬาลงกรณ์มหาวิทยาลัย', 'มหาวิทยาลัยเชียงใหม่', 'มหาวิทยาลัยธรรมศาสตร์', 'มหาวิทยาลัยเกษตรศาสตร์'];
    const majors = ['คอมพิวเตอร์', 'บริหารธุรกิจ', 'นิติศาสตร์', 'ครุศาสตร์', 'วิทยาศาสตร์', 'พยาบาลศาสตร์', 'แพทยศาสตร์'];

    // Bachelor's
    if (birthYear) {
      gp7Data.educationHistory.push({
        degree: 'ปริญญาตรี',
        major: getRandomItem(majors),
        institution: getRandomItem(institutions),
        yearGraduated: (birthYear + getRandomInt(21, 23)).toString(),
      });
    }
    // Master's (50% chance)
    if (Math.random() < 0.5) {
      gp7Data.educationHistory.push({
        degree: 'ปริญญาโท',
        major: getRandomItem(majors),
        institution: getRandomItem(institutions),
        yearGraduated: (parseInt(gp7Data.educationHistory[0].yearGraduated) + getRandomInt(2, 4)).toString(),
      });
    }
    // PhD (20% chance)
    if (Math.random() < 0.2) {
      gp7Data.educationHistory.push({
        degree: 'ปริญญาเอก',
        major: getRandomItem(majors),
        institution: getRandomItem(institutions),
        yearGraduated: (parseInt(gp7Data.educationHistory[gp7Data.educationHistory.length - 1].yearGraduated) + getRandomInt(3, 5)).toString(),
      });
    }
    // Sort education by year graduated
    gp7Data.educationHistory.sort((a, b) => parseInt(a.yearGraduated) - parseInt(b.yearGraduated));


    // 2. Simulate Historical Positions
    const pastPositions = [
      'เจ้าหน้าที่ธุรการ', 'นักวิชาการศึกษาปฏิบัติการ', 'อาจารย์', 'นักจัดการงานทั่วไป', 'นักวิเคราะห์นโยบายและแผน'
    ];
    let currentSalary = getRandomInt(15000, 30000); // Base salary

    let lastPositionEndDate = appointmentYear ? `${appointmentYear}-01-01` : getRandomDate(birthYear + 25, new Date().getFullYear() - 5);

    // Add 1-3 previous positions
    for (let j = 0; j < getRandomInt(0, 2); j++) {
      const posStartDate = new Date(lastPositionEndDate);
      posStartDate.setFullYear(posStartDate.getFullYear() - getRandomInt(2, 5)); // Position held for 2-5 years

      gp7Data.historicalPositions.unshift({ // Add to beginning to keep chronological
        positionName: getRandomItem(pastPositions),
        facultyName: getRandomItem(gp7Data.faculty_name_th === 'สำนักงานอธิการบดี-กองบริหารงานทั่วไป' ? ['สำนักงานอธิการบดี-กองกลาง', 'สำนักงานอธิการบดี-กองแผน'] : ['คณะวิทยาศาสตร์', 'คณะเทคโนโลยี']), // Sample other faculties
        startDate: posStartDate.toISOString().substring(0, 10),
        endDate: lastPositionEndDate,
        salary: currentSalary - getRandomInt(2000, 5000), // Previous salary was lower
        level: getRandomItem(['ปฏิบัติการ', 'ชำนาญงาน', 'ชำนาญการ', 'ระดับ 3', 'ระดับ 5']),
      });
      lastPositionEndDate = posStartDate.toISOString().substring(0, 10);
      currentSalary -= getRandomInt(2000, 5000);
    }

    // Add current position
    gp7Data.historicalPositions.push({
      positionName: gp7Data.currentPositionDisplay,
      facultyName: gp7Data.faculty_name_th,
      startDate: staff.date_of_appointment || lastPositionEndDate,
      endDate: 'ปัจจุบัน', // Mark current position
      salary: currentSalary + getRandomInt(5000, 10000), // Current salary is higher
      level: getRandomItem(['ชำนาญการ', 'เชี่ยวชาญ', 'ระดับ 6', 'ระดับ 7']),
    });

    // 3. Simulate Training History
    const trainingCourses = ['อบรมภาวะผู้นำ', 'การเขียนโปรแกรม Python', 'การบริหารโครงการ', 'การเงินภาครัฐ', 'ภาษาอังกฤษเพื่อการสื่อสาร'];
    for (let k = 0; k < getRandomInt(0, 3); k++) {
      const year = getRandomInt(appointmentYear, new Date().getFullYear() - 1);
      const startDate = getRandomDate(year, year);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + getRandomInt(1, 10)); // Course duration 1-10 days
      gp7Data.trainingHistory.push({
        courseName: getRandomItem(trainingCourses),
        startDate: startDate,
        endDate: endDate.toISOString().substring(0, 10),
        institution: getRandomItem(['สถาบันพัฒนาบุคลากรภาครัฐ', 'กรมบัญชีกลาง', 'ศูนย์ฝึกอบรมเอกชน']),
        hours: getRandomInt(8, 60),
      });
    }
    gp7Data.trainingHistory.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());


    // 4. Simulate Award History (เครื่องราชอิสริยาภรณ์)
    const awards = ['เบญจมาภรณ์ช้างเผือก (บ.ช.)', 'เบญจมาภรณ์มงกุฎไทย (บ.ม.)', 'จตุรถาภรณ์ช้างเผือก (จ.ช.)', 'จตุรถาภรณ์มงกุฎไทย (จ.ม.)', 'เหรียญจักรพรรดิมาลา'];
    for (let l = 0; l < getRandomInt(0, 2); l++) {
      const awardYear = getRandomInt(appointmentYear + 5, new Date().getFullYear()); // Awards usually after some years of service
      gp7Data.awardHistory.push({
        awardName: getRandomItem(awards),
        awardDate: getRandomDate(awardYear, awardYear),
        gazetteRef: `เล่ม ${getRandomInt(120, 140)} ตอนที่ ${getRandomInt(1, 50)} ข หน้า ${getRandomInt(1, 200)}`,
      });
    }
    gp7Data.awardHistory.sort((a, b) => new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime());


    return gp7Data;
  });
};

// --- Mock Staff Data for Staff Selector (reused from hr910, but enriched for selection) ---
// This part could be part of index.tsx or passed from a higher level.
// For now, let's keep the raw simulation in index.tsx and use this for the detailed simulation.