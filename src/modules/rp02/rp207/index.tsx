'use client';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import IntlMessagesMain from '@crema/helpers/IntlMessages';
import AppCard from '@crema/components/AppCard';

import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Paper, // ไม่จำเป็นต้องใช้ Paper ตรงๆ แล้ว เพราะ AppCard จะมาแทน
  TablePagination,
} from '@mui/material';

// นำเข้าข้อมูลทั้งหมด
import { allStaffData } from './data/staffData';
import { allFacultiesData } from './data/facultiesData';
import { allDepartmentsData } from './data/departmentsData';
import { allStaffTypesData } from './data/staffTypesData';

// นำเข้า Interface ทั้งหมด
import { IStaff } from './interfaces/staff.interface';
import { IEducation } from './interfaces/education.interface';
import { ISalary } from './interfaces/salary.interface';
import { IFamily } from './interfaces/family.interface';
import { INameChangeHistory } from './interfaces/nameChangeHistory.interface';
import { IWorkHistory } from './interfaces/workHistory.interface';
import { IPassport } from './interfaces/passport.interface';
import { IWorkPermit } from './interfaces/workPermit.interface';
import { IAcademicExpertise } from './interfaces/academicExpertise.interface';
import { ISupportExpertise } from './interfaces/supportExpertise.interface';
import { IDocument } from './interfaces/document.interface';
import { IContract } from './interfaces/contract.interface';
import { IFaculty } from './interfaces/faculty.interface';
import { IDepartment } from './interfaces/department.interface';
import { IStaffType } from './interfaces/staffType.interface';


const StaffReportPage = () => {
    const [staffs, setStaffs] = useState<IStaff[]>([]);
    const [filteredStaffs, setFilteredStaffs] = useState<IStaff[]>([]);

    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedStaffType, setSelectedStaffType] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const faculties: IFaculty[] = allFacultiesData;
    const departments: IDepartment[] = allDepartmentsData;
    const staffTypes: IStaffType[] = allStaffTypesData;

    useEffect(() => {
        setStaffs(allStaffData);
        setFilteredStaffs(allStaffData);
    }, []);

    useEffect(() => {
        let currentFilteredStaffs = allStaffData;

        if (selectedFaculty) {
            currentFilteredStaffs = currentFilteredStaffs.filter(staff =>
                staff.faculty_id === parseInt(selectedFaculty)
            );
        }

        if (selectedDepartment) {
            currentFilteredStaffs = currentFilteredStaffs.filter(staff => {
                const department = departments.find(d => d.id === parseInt(selectedDepartment));
                return department && staff.department_id === department.id;
            });
        }

        if (selectedStaffType) {
            currentFilteredStaffs = currentFilteredStaffs.filter(staff =>
                staff.staff_type_id === parseInt(selectedStaffType)
            );
        }

        setFilteredStaffs(currentFilteredStaffs);
        setPage(0);
    }, [selectedFaculty, selectedDepartment, selectedStaffType, departments]);

    const getFacultyName = (id: number) => {
        const faculty = faculties.find(f => f.id === id);
        return faculty ? faculty.name : 'common.notSpecified';
    };

    const getDepartmentName = (id: number) => {
        const department = departments.find(d => d.id === id);
        return department ? department.name : 'common.notSpecified';
    };

    const getStaffTypeName = (id: number) => {
        const staffType = staffTypes.find(st => st.id === id);
        return staffType ? staffType.name : 'common.notSpecified';
    };

    const handleExportExcel = () => {
        const dataToExport = filteredStaffs.map(staff => ({
            "รหัสบุคลากร": staff.staff_id,
            "เลขบัตรประชาชน": staff.citizen_id,
            "คำนำหน้า (ไทย)": staff.prefixname_id === 1 ? "นาย" : (staff.prefixname_id === 2 ? "นางสาว" : "ไม่ระบุ"),
            "ชื่อ (ไทย)": staff.first_name_th,
            "นามสกุล (ไทย)": staff.last_name_th,
            "ชื่อ (อังกฤษ)": staff.first_name_en,
            "นามสกุล (อังกฤษ)": staff.last_name_en,
            "เพศ": staff.gender,
            "เชื้อชาติ": staff.ethnicity,
            "สัญชาติ": staff.nationality,
            "ศาสนา": staff.religion,
            "วันเกิด": staff.date_of_birth,
            "จังหวัดที่เกิด": staff.birth_province,
            "ที่อยู่ปัจจุบัน": staff.current_address,
            "ประเทศ": staff.country,
            "สถานะสมรส": staff.marital_status,
            "เบอร์โทรศัพท์": staff.phone_number,
            "อีเมล": staff.email1,
            "คณะ/หน่วยงาน": getFacultyName(staff.faculty_id),
            "ภาควิชา/สาขา": getDepartmentName(staff.department_id),
            "ประเภทบุคลากร": getStaffTypeName(staff.staff_type_id),
            "ตำแหน่ง": staff.job_title_id,
            "ระดับการศึกษา": staff.education && staff.education.length > 0 ? staff.education.map(edu => edu.academic_degree_name).join(', ') : 'common.none',
            "สถาบันการศึกษา": staff.education && staff.education.length > 0 ? staff.education.map(edu => edu.institution).join(', ') : 'common.none',
            "เงินเดือนล่าสุด": staff.salary && staff.salary.length > 0 ? staff.salary[0].salary_amount : 'common.none',
            "ความสัมพันธ์บุคคลในครอบครัว": staff.family && staff.family.length > 0 ? staff.family.map(fam => `${fam.relationship}: ${fam.full_name}`).join(', ') : 'common.none',
            "ประวัติการเปลี่ยนชื่อ": staff.name_change_history && staff.name_change_history.length > 0 ? staff.name_change_history.map(nch => `${nch.change_date}: ${nch.old_first_name_th} ${nch.old_last_name_th}`).join(', ') : 'common.none',
            "ประวัติการทำงาน": staff.work_history && staff.work_history.length > 0 ? staff.work_history.map(wh => `${wh.position} (${wh.organization})`).join(', ') : 'common.none',
            "หนังสือเดินทาง": staff.passport && staff.passport.length > 0 ? staff.passport.map(p => p.passport_number).join(', ') : 'common.none',
            "ใบอนุญาตทำงาน": staff.work_permit && staff.work_permit.length > 0 ? staff.work_permit.map(wp => wp.permit_number).join(', ') : 'common.none',
            "ความเชี่ยวชาญทางวิชาการ": staff.academic_expertise && staff.academic_expertise.length > 0 ? staff.academic_expertise.map(ae => ae.expertise_name).join(', ') : 'common.none',
            "ความเชี่ยวชาญสนับสนุน": staff.support_expertise && staff.support_expertise.length > 0 ? staff.support_expertise.map(se => se.expertise_name).join(', ') : 'common.none',
            "เอกสาร": staff.document && staff.document.length > 0 ? staff.document.map(doc => doc.document_name).join(', ') : 'common.none',
            "สัญญา": staff.contract && staff.contract.length > 0 ? staff.contract.map(con => con.contract_type).join(', ') : 'common.none',
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "บุคลากร");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'staff_data.xlsx');
    };

    const handleExportCSV = () => {
        const dataToExport = filteredStaffs.map(staff => ({
            "รหัสบุคลากร": staff.staff_id,
            "เลขบัตรประชาชน": staff.citizen_id,
            "คำนำหน้า (ไทย)": staff.prefixname_id === 1 ? "นาย" : (staff.prefixname_id === 2 ? "นางสาว" : "ไม่ระบุ"),
            "ชื่อ (ไทย)": staff.first_name_th,
            "นามสกุล (ไทย)": staff.last_name_th,
            "ชื่อ (อังกฤษ)": staff.first_name_en,
            "นามสกุล (อังกฤษ)": staff.last_name_en,
            "เพศ": staff.gender,
            "เชื้อชาติ": staff.ethnicity,
            "สัญชาติ": staff.nationality,
            "ศาสนา": staff.religion,
            "วันเกิด": staff.date_of_birth,
            "จังหวัดที่เกิด": staff.birth_province,
            "ที่อยู่ปัจจุบัน": staff.current_address,
            "ประเทศ": staff.country,
            "สถานะสมรส": staff.marital_status,
            "เบอร์โทรศัพท์": staff.phone_number,
            "อีเมล": staff.email1,
            "คณะ/หน่วยงาน": getFacultyName(staff.faculty_id),
            "ภาควิชา/สาขา": getDepartmentName(staff.department_id),
            "ประเภทบุคลากร": getStaffTypeName(staff.staff_type_id),
            "ตำแหน่ง": staff.job_title_id,
            "ระดับการศึกษา": staff.education && staff.education.length > 0 ? staff.education.map(edu => edu.academic_degree_name).join('; ') : '',
            "สถาบันการศึกษา": staff.education && staff.education.length > 0 ? staff.education.map(edu => edu.institution).join('; ') : '',
            "เงินเดือนล่าสุด": staff.salary && staff.salary.length > 0 ? staff.salary[0].salary_amount : '',
            "ความสัมพันธ์บุคคลในครอบครัว": staff.family && staff.family.length > 0 ? staff.family.map(fam => `${fam.relationship}: ${fam.full_name}`).join('; ') : '',
            "ประวัติการเปลี่ยนชื่อ": staff.name_change_history && staff.name_change_history.length > 0 ? staff.name_change_history.map(nch => `${nch.change_date}: ${nch.old_first_name_th} ${nch.old_last_name_th}`).join('; ') : '',
            "ประวัติการทำงาน": staff.work_history && staff.work_history.length > 0 ? staff.work_history.map(wh => `${wh.position} (${wh.organization})`).join('; ') : '',
            "หนังสือเดินทาง": staff.passport && staff.passport.length > 0 ? staff.passport.map(p => p.passport_number).join('; ') : '',
            "ใบอนุญาตทำงาน": staff.work_permit && staff.work_permit.length > 0 ? staff.work_permit.map(wp => wp.permit_number).join('; ') : '',
            "ความเชี่ยวชาญทางวิชาการ": staff.academic_expertise && staff.academic_expertise.length > 0 ? staff.academic_expertise.map(ae => ae.expertise_name).join('; ') : '',
            "ความเชี่ยวชาญสนับสนุน": staff.support_expertise && staff.support_expertise.length > 0 ? staff.support_expertise.map(se => se.expertise_name).join('; ') : '',
            "เอกสาร": staff.document && staff.document.length > 0 ? staff.document.map(doc => doc.document_name).join('; ') : '',
            "สัญญา": staff.contract && staff.contract.length > 0 ? staff.contract.map(con => con.contract_type).join('; ') : '',
        }));

        const header = Object.keys(dataToExport[0]).join(',');
        const rows = dataToExport.map(row => Object.values(row).map(value => {
            const stringValue = String(value);
            return `"${stringValue.replace(/"/g, '""')}"`;
        }).join(','));

        const csv = [header, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'staff_data.csv');
    };

    const renderStaffDetails = (staff: IStaff) => {
        return Object.keys(staff).map(key => {
            let value = (staff as any)[key];

            if (Array.isArray(value)) {
                if (key === 'education') {
                    value = value.map((edu: IEducation) => `${edu.academic_degree_name} (${edu.institution})`).join(', ');
                } else if (key === 'salary') {
                    value = value.map((sal: ISalary) => `฿${sal.salary_amount} (จาก ${sal.effective_date})`).join(', ');
                } else if (key === 'family') {
                    value = value.map((fam: IFamily) => `${fam.relationship}: ${fam.full_name}`).join(', ');
                } else if (key === 'name_change_history') {
                    value = value.map((nch: INameChangeHistory) => `${nch.change_date}: ${nch.old_first_name_th} ${nch.old_last_name_th} (${nch.reason})`).join(', ');
                } else if (key === 'work_history') {
                    value = value.map((wh: IWorkHistory) => `ตำแหน่ง ${wh.position} ที่ ${wh.organization} (เริ่ม ${wh.start_work_date} สิ้นสุด ${wh.end_work_date})`).join(', ');
                } else if (key === 'passport') {
                    value = value.map((p: IPassport) => `เลขที่ ${p.passport_number} (ออก ${p.issue_date} หมดอายุ ${p.expiry_date})`).join(', ');
                } else if (key === 'work_permit') {
                    value = value.map((wp: IWorkPermit) => `เลขที่ ${wp.permit_number} (ออก ${wp.issue_date} หมดอายุ ${wp.expiry_date})`).join(', ');
                } else if (key === 'academic_expertise') {
                    value = value.map((ae: IAcademicExpertise) => ae.expertise_name).join(', ');
                } else if (key === 'support_expertise') {
                    value = value.map((se: ISupportExpertise) => se.expertise_name).join(', ');
                } else if (key === 'document') {
                    value = value.map((doc: IDocument) => `${doc.document_name} (อัปโหลด ${doc.upload_date})`).join(', ');
                } else if (key === 'contract') {
                    value = value.map((con: IContract) => `${con.contract_type} (เริ่ม ${con.start_date} สิ้นสุด ${con.end_date})`).join(', ');
                }
                else {
                    value = JSON.stringify(value);
                }
            } else if (typeof value === 'object' && value !== null) {
                value = JSON.stringify(value);
            }
            return (
                <Typography variant="body2" key={key}>
                    <strong><IntlMessagesMain id={`staffDetails.${key}`} defaultMessage={key.replace(/_/g, ' ')} />:</strong> {value === null ? <IntlMessagesMain id="common.na" defaultMessage="N/A" /> : value}
                </Typography>
            );
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedStaffs = filteredStaffs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
               {<IntlMessagesMain id="sidebar.rp02.07"/>}
            </Typography>

            <AppCard title={<IntlMessagesMain id="staffReportPage.filters" defaultMessage="ตัวกรองข้อมูล" />} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', py: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="faculty-select-label">
                            <IntlMessagesMain id="staffReportPage.selectFaculty" defaultMessage="เลือกคณะ/หน่วยงาน" />
                        </InputLabel>
                        <Select
                            labelId="faculty-select-label"
                            value={selectedFaculty}
                            label={<IntlMessagesMain id="staffReportPage.selectFaculty" defaultMessage="เลือกคณะ/หน่วยงาน" />}
                            onChange={(e) => setSelectedFaculty(e.target.value as string)}
                        >
                            <MenuItem value="">
                                <IntlMessagesMain id="common.all" defaultMessage="ทั้งหมด" />
                            </MenuItem>
                            {faculties.map(faculty => (
                                <MenuItem key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }} disabled={!selectedFaculty}>
                        <InputLabel id="department-select-label">
                            <IntlMessagesMain id="staffReportPage.selectDepartment" defaultMessage="เลือกภาควิชา/สาขา" />
                        </InputLabel>
                        <Select
                            labelId="department-select-label"
                            value={selectedDepartment}
                            label={<IntlMessagesMain id="staffReportPage.selectDepartment" defaultMessage="เลือกภาควิชา/สาขา" />}
                            onChange={(e) => setSelectedDepartment(e.target.value as string)}
                        >
                            <MenuItem value="">
                                <IntlMessagesMain id="common.all" defaultMessage="ทั้งหมด" />
                            </MenuItem>
                            {selectedFaculty && departments.filter(dep => dep.faculty_id === parseInt(selectedFaculty)).map(department => (
                                <MenuItem key={department.id} value={department.id}>
                                    {department.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="stafftype-select-label">
                            <IntlMessagesMain id="staffReportPage.selectStaffType" defaultMessage="เลือกประเภทบุคลากร" />
                        </InputLabel>
                        <Select
                            labelId="stafftype-select-label"
                            value={selectedStaffType}
                            label={<IntlMessagesMain id="staffReportPage.selectStaffType" defaultMessage="เลือกประเภทบุคลากร" />}
                            onChange={(e) => setSelectedStaffType(e.target.value as string)}
                        >
                            <MenuItem value="">
                                <IntlMessagesMain id="common.all" defaultMessage="ทั้งหมด" />
                            </MenuItem>
                            {staffTypes.map(type => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            setSelectedFaculty('');
                            setSelectedDepartment('');
                            setSelectedStaffType('');
                        }}
                        sx={{ height: '56px' }}
                    >
                        <IntlMessagesMain id="common.clearSearch" defaultMessage="ล้างการค้นหา" />
                    </Button>
                </Box>
            </AppCard>

            <AppCard title={<IntlMessagesMain id="staffReportPage.exportOptions" defaultMessage="ตัวเลือกการส่งออก" />} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 1, py: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleExportExcel}
                    >
                        <IntlMessagesMain id="common.exportExcel" defaultMessage="ส่งออกเป็น Excel (.xlsx)" />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExportCSV}
                    >
                        <IntlMessagesMain id="common.exportCsv" defaultMessage="ส่งออกเป็น CSV (.csv)" />
                    </Button>
                </Box>
            </AppCard>


            <AppCard
                title={<IntlMessagesMain id="staffReportPage.results" defaultMessage="ผลการค้นหา" />}
                sx={{ width: '100%' }} // ให้ AppCard ขยายเต็มความกว้าง
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    <IntlMessagesMain id="staffReportPage.resultsCount" defaultMessage="ผลการค้นหา ({count} รายการ)" values={{ count: filteredStaffs.length }} />
                </Typography>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="staff table">
                        <TableHead>
                            <TableRow>
                                <TableCell><IntlMessagesMain id="staffTable.id" defaultMessage="รหัส" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.fullNameTh" defaultMessage="ชื่อ-นามสกุล (ไทย)" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.faculty" defaultMessage="คณะ/หน่วยงาน" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.department" defaultMessage="ภาควิชา/สาขา" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.staffType" defaultMessage="ประเภทบุคลากร" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.maritalStatus" defaultMessage="สถานะสมรส" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.email" defaultMessage="อีเมล" /></TableCell>
                                <TableCell><IntlMessagesMain id="staffTable.details" defaultMessage="รายละเอียดทั้งหมด" /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedStaffs.length > 0 ? (
                                paginatedStaffs.map(staff => (
                                    <TableRow hover key={staff.staff_id}>
                                        <TableCell>{staff.staff_id}</TableCell>
                                        <TableCell>{staff.first_name_th} {staff.last_name_th}</TableCell>
                                        <TableCell>{getFacultyName(staff.faculty_id)}</TableCell>
                                        <TableCell>{getDepartmentName(staff.department_id)}</TableCell>
                                        <TableCell>{getStaffTypeName(staff.staff_type_id)}</TableCell>
                                        <TableCell>{staff.marital_status}</TableCell>
                                        <TableCell>{staff.email1}</TableCell>
                                        <TableCell>
                                            <details>
                                                <summary>
                                                    <IntlMessagesMain id="common.viewDetails" defaultMessage="ดูรายละเอียด" />
                                                </summary>
                                                {renderStaffDetails(staff)}
                                            </details>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3 }}>
                                        <IntlMessagesMain id="common.noDataFound" defaultMessage="ไม่พบข้อมูลบุคลากร" />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredStaffs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={<IntlMessagesMain id="table.rowsPerPage" defaultMessage="แถวต่อหน้า:" />}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
                    }
                />
            </AppCard>
        </Container>
    );
};

export default StaffReportPage;