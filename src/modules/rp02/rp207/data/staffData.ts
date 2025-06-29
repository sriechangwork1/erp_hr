// src/data/staffData.ts
import { IStaff } from '../interfaces/staff.interface';
import { IEducation } from '../interfaces/education.interface';
import { ISalary } from '../interfaces/salary.interface';
import { IFamily } from '../interfaces/family.interface';
import { INameChangeHistory } from '../interfaces/nameChangeHistory.interface';
import { IWorkHistory } from '../interfaces/workHistory.interface';
import { IPassport } from '../interfaces/passport.interface';
import { IWorkPermit } from '../interfaces/workPermit.interface';
import { IAcademicExpertise } from '../interfaces/academicExpertise.interface';
import { ISupportExpertise } from '../interfaces/supportExpertise.interface';
import { IDocument } from '../interfaces/document.interface';
import { IContract } from '../interfaces/contract.interface';

// ข้อมูลอ้างอิงจาก facultiesData, departmentsData, staffTypesData
// เพื่อให้ข้อมูลที่สร้างเข้ากันได้
import { allFacultiesData } from './facultiesData';
import { allDepartmentsData } from './departmentsData';
import { allStaffTypesData } from './staffTypesData';

const faculties = allFacultiesData.map(f => f.id);
const departments = allDepartmentsData.map(d => d.id);
const staffTypes = allStaffTypesData.map(st => st.id);

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
};

const firstNamesTh = ["สมชาย", "สมหญิง", "ชาติชาย", "วันดี", "มานะ", "ดวงพร", "ปรีชา", "กาญจนา", "วรวุฒิ", "อรุณี", "พงศกร", "สุภาภรณ์", "จักรพันธ์", "กมลชนก", "ไพโรจน์", "นันทิยา", "ธนาคาร", "จารุวรรณ", "ณัฐพงษ์", "รัตนา"];
const lastNamesTh = ["ใจดี", "มีสุข", "ศรีสุข", "สุขใจ", "ร่ำรวย", "มีทรัพย์", "แสงจันทร์", "ทองดี", "เจริญสุข", "รุ่งเรือง", "เลิศล้ำ", "งามยิ่ง", "แสนสุข", "พากเพียร", "วิไล", "มงคล", "โชคดี", "ชัยชนะ", "สุขสำราญ", "ปิติ"];
const firstNamesEn = ["John", "Jane", "Peter", "Mary", "David", "Susan", "Michael", "Linda", "Robert", "Jennifer", "Mark", "Jessica", "Daniel", "Sarah", "Andrew", "Emily", "Chris", "Olivia", "James", "Sophia"];
const lastNamesEn = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Jackson", "White", "Thompson", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore"];
const genders = ["ชาย", "หญิง"];
const ethnicities = ["ไทย", "จีน", "ลาว", "กัมพูชา", "พม่า"];
const nationalities = ["ไทย", "สหรัฐอเมริกา", "อังกฤษ", "จีน", "ญี่ปุ่น"];
const religions = ["พุทธ", "คริสต์", "อิสลาม", "ฮินดู", "ไม่มีศาสนา"];
const provinces = ["กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต", "ชลบุรี", "ขอนแก่น", "นครปฐม", "กาญจนบุรี", "จันทบุรี"];
const maritalStatuses = ["โสด", "สมรส", "หย่าร้าง", "หม้าย"];
const academicDegrees = ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"];
const institutions = ["มหาวิทยาลัยรัฐบาล A", "มหาวิทยาลัยเอกชน B", "สถาบันเทคโนโลยี C", "มหาวิทยาลัยนานาชาติ D"];
const academicExpertises = ["AI/Machine Learning", "Software Development", "Data Science", "Cybersecurity", "Network Engineering", "Cloud Computing"];
const supportExpertises = ["HR Management", "Financial Accounting", "Marketing Strategy", "Customer Service", "Project Management", "Administrative Support"];
const contractTypes = ["สัญญาจ้างชั่วคราว", "สัญญาจ้างประจำ", "สัญญาจ้างพิเศษ"];
const familyRelationships = ["คู่สมรส", "บุตร", "มารดา", "บิดา", "พี่น้อง", "ผู้ติดต่อกรณีฉุกเฉิน"];
const jobTitles = ["อาจารย์", "นักวิจัย", "เจ้าหน้าที่บริหาร", "นักวิเคราะห์ข้อมูล", "วิศวกรซอฟต์แวร์", "ผู้จัดการโครงการ", "ผู้ช่วยสอน"];

const generateRandomStaff = (id: number): IStaff => {
    const firstNameTh = getRandomItem(firstNamesTh);
    const lastNameTh = getRandomItem(lastNamesTh);
    const firstNameEn = getRandomItem(firstNamesEn);
    const lastNameEn = getRandomItem(lastNamesEn);
    const birthDate = getRandomDate(new Date(1970, 0, 1), new Date(2000, 11, 31));
    const facultyId = getRandomItem(faculties);
    const departmentId = getRandomItem(allDepartmentsData.filter(d => d.faculty_id === facultyId)).id; // Ensure department matches faculty
    const staffTypeId = getRandomItem(staffTypes);

    // Generate Education
    const numEducations = getRandomNumber(1, 3);
    const education: IEducation[] = Array.from({ length: numEducations }).map(() => ({
        // ลบ staff_id
        academic_degree_name: getRandomItem(academicDegrees),
        major: `สาขา ${getRandomItem(['คอมพิวเตอร์', 'ไฟฟ้า', 'เคมี', 'บริหาร', 'บัญชี'])}`,
        institution: getRandomItem(institutions),
        country: getRandomItem(nationalities),
        start_date: getRandomDate(new Date(1990, 0, 1), new Date(2010, 11, 31)),
        end_date: getRandomDate(new Date(2011, 0, 1), new Date(2022, 11, 31)),
        create_at: getRandomDate(new Date(2015, 0, 1), new Date(2023, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Salary
    const numSalaries = getRandomNumber(1, 2);
    const salary: ISalary[] = Array.from({ length: numSalaries }).map(() => ({
        // ลบ staff_id
        salary_amount: getRandomNumber(20000, 80000),
        effective_date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 0, 1)),
        create_at: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Family (1-2 members)
    const numFamilies = getRandomNumber(1, 2);
    const family: IFamily[] = Array.from({ length: numFamilies }).map(() => ({
        // ลบ staff_id
        relationship: getRandomItem(familyRelationships),
        full_name: `${getRandomItem(firstNamesTh)} ${getRandomItem(lastNamesTh)}`,
        date_of_birth: getRandomDate(new Date(1950, 0, 1), new Date(2020, 11, 31)),
        occupation: `อาชีพ ${getRandomNumber(1, 5)}`,
        fam_tel: `0${getRandomNumber(800000000, 999999999)}`,
        fam_address: `ที่อยู่ครอบครัว ${getRandomNumber(1, 100)}`,
        create_at: getRandomDate(new Date(2018, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Work History (0-2 entries)
    const numWorkHistory = getRandomNumber(0, 2);
    const workHistory: IWorkHistory[] = Array.from({ length: numWorkHistory }).map(() => ({
        // ลบ staff_id
        appointment_number: `APP-${getRandomNumber(10000, 99999)}`,
        position: `ตำแหน่ง ${getRandomItem(['พนักงาน', 'หัวหน้า', 'ผู้จัดการ'])}`,
        organization: `บริษัท ${getRandomItem(['A', 'B', 'C'])}`,
        start_work_date: getRandomDate(new Date(2000, 0, 1), new Date(2015, 11, 31)),
        end_work_date: getRandomDate(new Date(2016, 0, 1), new Date(2020, 11, 31)),
        reason_for_leaving: `เหตุผล ${getRandomNumber(1, 3)}`,
        create_at: getRandomDate(new Date(2018, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Passport (0-1 entry)
    const passport: IPassport[] = getRandomNumber(0, 1) === 1 ? [{
        // ลบ staff_id
        passport_number: `AB${getRandomNumber(1000000, 9999999)}`,
        issue_date: getRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
        expiry_date: getRandomDate(new Date(2025, 0, 1), new Date(2030, 11, 31)),
        country_of_issue: getRandomItem(nationalities),
        create_at: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }] : [];

    // Generate Work Permit (0-1 entry)
    const workPermit: IWorkPermit[] = (getRandomNumber(0, 1) === 1 && nationalities.some(nat => nat !== "ไทย")) ? [{
        // ลบ staff_id
        permit_number: `WP${getRandomNumber(1000000, 9999999)}`,
        issue_date: getRandomDate(new Date(2022, 0, 0), new Date(2024, 0, 1)),
        expiry_date: getRandomDate(new Date(2025, 0, 0), new Date(2027, 11, 31)),
        country_of_issue: getRandomItem(nationalities.filter(n => n !== "ไทย")),
        permit_type: "ทั่วไป",
        create_at: getRandomDate(new Date(2022, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }] : [];

    // Generate Academic Expertise (0-2 entries)
    const numAcademicExpertise = getRandomNumber(0, 2);
    const academicExpertise: IAcademicExpertise[] = Array.from({ length: numAcademicExpertise }).map(() => ({
        // ลบ staff_id
        expertise_name: getRandomItem(academicExpertises),
        description: `รายละเอียดความเชี่ยวชาญ ${getRandomNumber(1, 5)}`,
        create_at: getRandomDate(new Date(2018, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Support Expertise (0-2 entries)
    const numSupportExpertise = getRandomNumber(0, 2);
    const supportExpertise: ISupportExpertise[] = Array.from({ length: numSupportExpertise }).map(() => ({
        // ลบ staff_id
        expertise_name: getRandomItem(supportExpertises),
        description: `รายละเอียดความเชี่ยวชาญสนับสนุน ${getRandomNumber(1, 5)}`,
        create_at: getRandomDate(new Date(2018, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Documents (0-2 entries)
    const numDocuments = getRandomNumber(0, 2);
    const document: IDocument[] = Array.from({ length: numDocuments }).map(() => ({
        // ลบ staff_id
        document_name: `เอกสาร ${getRandomNumber(1, 5)}`,
        document_path: `/docs/staff_${id}_doc${getRandomNumber(1, 5)}.pdf`,
        upload_date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        create_at: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }));

    // Generate Contracts (0-1 entry)
    const contract: IContract[] = getRandomNumber(0, 1) === 1 ? [{
        // ลบ staff_id
        contract_type: getRandomItem(contractTypes),
        start_date: getRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)),
        end_date: getRandomDate(new Date(2024, 0, 1), new Date(2026, 11, 31)),
        create_at: getRandomDate(new Date(2020, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }] : [];

    // Generate Name Change History (0-1 entry)
    const nameChangeHistory: INameChangeHistory[] = getRandomNumber(0, 5) === 0 ? [{
        // ลบ staff_id
        old_first_name_th: "ชื่อเดิม",
        old_last_name_th: "นามสกุลเดิม",
        old_first_name_en: "OldFirstName",
        old_last_name_en: "OldLastName",
        change_date: getRandomDate(new Date(2015, 0, 1), new Date(2020, 11, 31)),
        reason: "สมรส",
        create_at: getRandomDate(new Date(2015, 0, 1), new Date(2024, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10)
    }] : [];

    return {
        staff_id: id,
        citizen_id: `1${getRandomNumber(0, 9)}${getRandomNumber(1000000000, 9999999999)}`,
        foreigner_id: getRandomNumber(0, 5) === 0 ? `FN${getRandomNumber(100000, 999999)}` : null, // 1 in 6 chance for foreigner_id
        prefixname_id: getRandomItem([1, 2]), // 1: นาย, 2: นางสาว
        academic_title: getRandomNumber(0, 3) === 0 ? getRandomItem(['ผศ.', 'รศ.', 'ศ.']) : null, // Some might have titles
        first_name_th: firstNameTh,
        last_name_th: lastNameTh,
        middle_name_th: null,
        first_name_en: firstNameEn,
        last_name_en: lastNameEn,
        middle_name_en: null,
        gender: getRandomItem(genders),
        ethnicity: getRandomItem(ethnicities),
        nationality: getRandomItem(nationalities),
        religion: getRandomItem(religions),
        date_of_birth: birthDate,
        birth_province: getRandomItem(provinces),
        current_address: `ที่อยู่ปัจจุบัน ${getRandomNumber(1, 1000)}`,
        house_registration_address: `ที่อยู่ทะเบียนบ้าน ${getRandomNumber(1, 1000)}`,
        domicile_address: `ที่อยู่ภูมิลำเนา ${getRandomNumber(1, 1000)}`,
        country: "ไทย", // Assume mostly Thai for simplicity
        marital_status: getRandomItem(maritalStatuses),
        military_status: getRandomItem(["พ้นภาระ", "อยู่ระหว่างรับราชการ"]),
        phone_number: `0${getRandomNumber(800000000, 999999999)}`,
        email1: `${firstNameEn.toLowerCase()}.${lastNameEn.toLowerCase()}${id}@example.com`,
        email2: null,
        social_media_links: null,
        emergency_contact: null,
        faculty_id: facultyId,
        department_id: departmentId,
        staff_type_id: staffTypeId,
        job_title_id: getRandomItem([1, 2, 3, 4, 5, 6, 7]), // Map to your job title data
        job_start_date: getRandomDate(new Date(2010, 0, 1), new Date(2023, 0, 1)),
        job_end_date: getRandomNumber(0, 3) === 0 ? getRandomDate(new Date(2024, 0, 1), new Date(2025, 11, 31)) : null, // Some might have end dates
        status: getRandomItem(["Active", "Inactive", "On Leave"]),
        profile_picture_url: null,
        cv_url: null,
        joining_date: getRandomDate(new Date(2010, 0, 1), new Date(2023, 0, 1)),
        retirement_date: getRandomDate(new Date(2030, 0, 1), new Date(2040, 11, 31)),
        create_at: getRandomDate(new Date(2010, 0, 1), new Date(2023, 11, 31)),
        update_at: getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
        officer_id: getRandomNumber(1, 10),

        education: education,
        salary: salary,
        name_change_history: nameChangeHistory,
        work_history: workHistory,
        family: family,
        passport: passport,
        work_permit: workPermit,
        support_expertise: supportExpertise,
        academic_expertise: academicExpertise,
        document: document,
        contract: contract,
    };
};

const staffData: IStaff[] = [];
for (let i = 1; i <= 50; i++) {
    staffData.push(generateRandomStaff(i));
}

export const allStaffData: IStaff[] = staffData;