// src/interfaces/staff.interface.ts
import { IEducation } from './education.interface';
import { ISalary } from './salary.interface';
import { IFamily } from './family.interface'; 
import { INameChangeHistory } from './nameChangeHistory.interface';
import { IWorkHistory } from './workHistory.interface';
import { IPassport } from './passport.interface';
import { IWorkPermit } from './workPermit.interface';
import { IAcademicExpertise } from './academicExpertise.interface';
import { ISupportExpertise } from './supportExpertise.interface';
import { IDocument } from './document.interface';
import { IContract } from './contract.interface';

export interface IStaff {
    staff_id: number;
    citizen_id: string;
    foreigner_id: string | null;
    prefixname_id: number;
    academic_title: string | null;
    first_name_th: string;
    last_name_th: string;
    middle_name_th: string | null;
    first_name_en: string;
    last_name_en: string;
    middle_name_en: string | null;
    gender: string;
    ethnicity: string;
    nationality: string;
    religion: string;
    date_of_birth: string; // YYYY-MM-DD
    birth_province: string;
    current_address: string;
    house_registration_address: string;
    domicile_address: string;
    country: string;
    marital_status: string;
    military_status: string;
    phone_number: string;
    email1: string;
    email2: string | null;
    faculty_id: number;
    department_id: number;
    staff_type_id: number;
    job_title_id: number;
    date_of_hire: string; // YYYY-MM-DD
    work_status: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string;
    emergency_contact_phone: string;
    create_at: string; // ISO 8601 string
    update_at: string; // ISO 8601 string
    officer_id: number;
    education: IEducation[];
    salary: ISalary[];
    family: IFamily[];
    name_change_history: INameChangeHistory[];
    work_history: IWorkHistory[];
    passport: IPassport[];
    work_permit: IWorkPermit[];
    academic_expertise: IAcademicExpertise[];
    support_expertise: ISupportExpertise[];
    document: IDocument[];
    contract: IContract[];
}