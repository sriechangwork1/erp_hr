// src/index.tsx
'use client';
import React, { useState, useCallback } from 'react';
import IntlMessagesMain from '@crema/helpers/IntlMessages';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import Swal from 'sweetalert2';

// สำหรับ Export Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Mock components from @crema (ensure these are correctly handled or replaced)
const AppCard: React.FC<{ children: React.ReactNode; title?: React.ReactNode; sx?: any }> = ({
  children,
  title,
  sx,
}) => (
  <Box sx={{ p: 4, ...sx }}>
    {title && <Typography variant="h5" sx={{ mb: 3 }}>{title}</Typography>}
    {children}
  </Box>
);
const AppsContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    {children}
  </Container>
);
const IntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({ defaultMessage }) => (
  <span>{defaultMessage}</span>
);

// Import ALL Interfaces and Data (Updated list)
import { RefUnivData } from './interfaces/REF_UNIV.interface';
import { REF_UNIV_DATA } from './data/REF_UNIV';
import { RefPrefixNameData } from './interfaces/REF_PREFIX_NAME.interface';
import { REF_PREFIX_NAME_DATA } from './data/REF_PREFIX_NAME';
import { RefGenderData } from './interfaces/REF_GENDER.interface';
import { REF_GENDER_DATA } from './data/REF_GENDER';
import { RefSubDistrictData } from './interfaces/REF_SUB_DISTRICT.interface';
import { REF_SUB_DISTRICT_DATA } from './data/REF_SUB_DISTRICT';
import { RefNationalityData } from './interfaces/REF_NATIONALITY.interface';
import { REF_NATIONALITY_DATA } from './data/REF_NATIONALITY';
import { RefStaffTypeData } from './interfaces/REF_STAFFTYPE.interface';
import { REF_STAFFTYPE_DATA } from './data/REF_STAFFTYPE';
import { RefTimeContactData } from './interfaces/REF_TIME_CONTACT.interface';
import { REF_TIME_CONTACT_DATA } from './data/REF_TIME_CONTACT';
import { RefSubStaffTypeData } from './interfaces/REF_SUBSTAFFTYPE.interface';
import { REF_SUBSTAFFTYPE_DATA } from './data/REF_SUBSTAFFTYPE';
import { RefAdminData } from './interfaces/REF_ADMIN.interface';
import { REF_ADMIN_DATA } from './data/REF_ADMIN';
import { RefAcademicStandingData } from './interfaces/REF_ACADEMICSTANDING.interface';
import { REF_ACADEMICSTANDING_DATA } from './data/REF_ACADEMICSTANDING';
import { RefPositionLevelData } from './interfaces/REF_POSITIONLEVEL.interface';
import { REF_POSITIONLEVEL_DATA } from './data/REF_POSITIONLEVEL';
import { RefFacData } from './interfaces/REF_FAC.interface';
import { REF_FAC_DATA } from './data/REF_FAC';
import { RefTeachSubjectData } from './interfaces/REF_TEACH_SUBJECT.interface';
import { REF_TEACH_SUBJECT_DATA } from './data/REF_TEACH_SUBJECT';
import { RefLevelData } from './interfaces/REF_LEVEL.interface';
import { REF_LEVEL_DATA } from './data/REF_LEVEL';
import { RefDeformData } from './interfaces/REF_DEFORM.interface';
import { REF_DEFORM_DATA } from './data/REF_DEFORM';
import { RefIncomeData } from './interfaces/REF_INCOME.interface';
import { REF_INCOME_DATA } from './data/REF_INCOME';
import { RefMovementTypeData } from './interfaces/REF_MOVEMENT_TYPE.interface';
import { REF_MOVEMENT_TYPE_DATA } from './data/REF_MOVEMENT_TYPE';
import { RefDecorationData } from './interfaces/REF_DECORATION.interface';
import { REF_DECORATION_DATA } from './data/REF_DECORATION';
import { RefScholarOrderData } from './interfaces/REF_SCHOLAR_ORDER.interface';
import { REF_SCHOLAR_ORDER_DATA } from './data/REF_SCHOLAR_ORDER';
import { RefAcademicStandingSubjectData } from './interfaces/REF_ACADEMICSTANDING_SUBJECT.interface';
import { REF_ACADEMICSTANDING_SUBJECT_DATA } from './data/REF_ACADEMICSTANDING_SUBJECT';
import { RefResearcherStatusData } from './interfaces/REF_RESEARCHER_STATUS.interface';
import { REF_RESEARCHER_STATUS_DATA } from './data/REF_RESEARCHER_STATUS';

import CrudTable from './components/CrudTable';

const generateUniqueId = () => Math.random().toString(36).substr(2, 9); // Simple unique ID generator

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ReportPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  // State for each dataset (ADD ALL NEW STATES HERE)
  const [refUniv, setRefUniv] = useState<RefUnivData[]>(REF_UNIV_DATA);
  const [refPrefixName, setRefPrefixName] = useState<RefPrefixNameData[]>(REF_PREFIX_NAME_DATA);
  const [refGender, setRefGender] = useState<RefGenderData[]>(REF_GENDER_DATA);
  const [refSubDistrict, setRefSubDistrict] = useState<RefSubDistrictData[]>(REF_SUB_DISTRICT_DATA);
  const [refNationality, setRefNationality] = useState<RefNationalityData[]>(REF_NATIONALITY_DATA);
  const [refStaffType, setRefStaffType] = useState<RefStaffTypeData[]>(REF_STAFFTYPE_DATA);
  const [refTimeContact, setRefTimeContact] = useState<RefTimeContactData[]>(REF_TIME_CONTACT_DATA);
  const [refSubStaffType, setRefSubStaffType] = useState<RefSubStaffTypeData[]>(REF_SUBSTAFFTYPE_DATA);
  const [refAdmin, setRefAdmin] = useState<RefAdminData[]>(REF_ADMIN_DATA);
  const [refAcademicStanding, setRefAcademicStanding] = useState<RefAcademicStandingData[]>(REF_ACADEMICSTANDING_DATA);
  const [refPositionLevel, setRefPositionLevel] = useState<RefPositionLevelData[]>(REF_POSITIONLEVEL_DATA);
  const [refFac, setRefFac] = useState<RefFacData[]>(REF_FAC_DATA);
  const [refTeachSubject, setRefTeachSubject] = useState<RefTeachSubjectData[]>(REF_TEACH_SUBJECT_DATA);
  const [refLevel, setRefLevel] = useState<RefLevelData[]>(REF_LEVEL_DATA);
  const [refDeform, setRefDeform] = useState<RefDeformData[]>(REF_DEFORM_DATA);
  const [refIncome, setRefIncome] = useState<RefIncomeData[]>(REF_INCOME_DATA);
  const [refMovementType, setRefMovementType] = useState<RefMovementTypeData[]>(REF_MOVEMENT_TYPE_DATA);
  const [refDecoration, setRefDecoration] = useState<RefDecorationData[]>(REF_DECORATION_DATA);
  const [refScholarOrder, setRefScholarOrder] = useState<RefScholarOrderData[]>(REF_SCHOLAR_ORDER_DATA);
  const [refAcademicStandingSubject, setRefAcademicStandingSubject] = useState<RefAcademicStandingSubjectData[]>(REF_ACADEMICSTANDING_SUBJECT_DATA);
  const [refResearcherStatus, setRefResearcherStatus] = useState<RefResearcherStatusData[]>(REF_RESEARCHER_STATUS_DATA);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Generic Excel Export Function
  const handleExportExcel = useCallback((data: any[], fileName: string, columns: { header: string; field: string }[]) => {
    const ws = XLSX.utils.json_to_sheet(data.map(row => {
      const newRow: { [key: string]: any } = {};
      columns.forEach(col => {
        newRow[col.header] = row[col.field];
      });
      return newRow;
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
  }, []);

  // Define columns for each table (ADD ALL NEW COLUMNS HERE)
  const refUnivColumns = [
    { header: 'รหัสหน่วยงาน', field: 'UNIV_ID' },
    { header: 'ชื่อหน่วยงาน', field: 'UNIV_NAME' },
    { header: 'ประเภทวิทยาเขต', field: 'CAMPUS_TYPE' },
    { header: 'ชื่อจังหวัด', field: 'PROVINCE_NAME' },
    { header: 'รหัสหน่วยงานหลัก', field: 'UNIV_MASTER_ID' },
    { header: 'ชื่อหน่วยงานหลัก', field: 'UNIV_MASTER_NAME' },
  ];

  const refPrefixNameColumns = [
    { header: 'รหัสคำนำหน้า', field: 'PREFIX_NAME_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refGenderColumns = [
    { header: 'รหัสเพศ', field: 'GENDER_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refSubDistrictColumns = [
    { header: 'รหัสตำบล', field: 'SUB_DISTRICT_ID' },
    { header: 'ชื่อตำบล (ไทย)', field: 'SUB_DISTRICT_NAME_TH' },
    { header: 'รหัสอำเภอ', field: 'DISTRICT_ID' },
    { header: 'ชื่ออำเภอ (ไทย)', field: 'DISTRICT_NAME_TH' },
    { header: 'รหัสจังหวัด', field: 'PROVINCE_ID' },
    { header: 'ชื่อจังหวัด (ไทย)', field: 'PROVINCE_NAME_TH' },
    { header: 'สถานะ', field: 'STATUS' },
  ];

  const refNationalityColumns = [
    { header: 'รหัสสัญชาติ', field: 'NATIONALITY_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refStaffTypeColumns = [
    { header: 'รหัสประเภทบุคลากร', field: 'STAFFTYPE_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refTimeContactColumns = [
    { header: 'รหัสเวลาติดต่อ', field: 'TIME_CONTACT_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refSubStaffTypeColumns = [
    { header: 'รหัสประเภทย่อยบุคลากร', field: 'SUBSTAFFTYPE_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refAdminColumns = [
    { header: 'รหัสตำแหน่งบริหาร', field: 'ADMIN_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refAcademicStandingColumns = [
    { header: 'รหัสตำแหน่งทางวิชาการ', field: 'ACADEMICSTANDING_ID' },
    { header: 'ชื่อตำแหน่งทางวิชาการ', field: 'ACADEMICSTANDING_NAME' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refPositionLevelColumns = [
    { header: 'รหัสระดับตำแหน่ง', field: 'POSITIONLEVEL_ID' },
    { header: 'ชื่อตำแหน่งทางวิชาการ (ที่เกี่ยวข้อง)', field: 'ACADEMICSTANDING_NAME' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
  ];

  const refFacColumns = [
    { header: 'รหัสคณะ', field: 'FAC_ID' },
    { header: 'คำอธิบายคณะ', field: 'FAC_DESC' },
  ];

  const refTeachSubjectColumns = [
    { header: 'รหัสวิชาที่สอน', field: 'TEACH_SUBJECT_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refLevelColumns = [
    { header: 'รหัสระดับ', field: 'LEV_ID' },
    { header: 'ชื่อระดับ (ไทย)', field: 'LEV_NAME_TH' },
    { header: 'ชื่อระดับ (อังกฤษ)', field: 'LEV_NAME_ENG' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refDeformColumns = [
    { header: 'รหัสความพิการ', field: 'DEFORM_ID' },
    { header: 'ชื่อความพิการ', field: 'DEFORM_NAME' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refIncomeColumns = [
    { header: 'รหัสรายได้', field: 'INCOME_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refMovementTypeColumns = [
    { header: 'รหัสประเภทการเคลื่อนไหว', field: 'MOVEMENT_TYPE_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refDecorationColumns = [
    { header: 'รหัสเครื่องราชฯ', field: 'DECORATION_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refScholarOrderColumns = [
    { header: 'รหัสคำสั่งทุน', field: 'SCHOLAR_ORDER_ID' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refAcademicStandingSubjectColumns = [
    { header: 'รหัสสาขาวิชาตำแหน่งวิชาการ', field: 'ACADEMICSTANDING_SUBJECT_ID' },
    { header: 'สาขาวิชา (ไทย)', field: 'ACADEMICSTANDING_SUBJECT_TH' },
    { header: 'สาขาวิชา (อังกฤษ)', field: 'ACADEMICSTANDING_SUBJECT_EN' },
    { header: 'ระดับสาขาวิชา', field: 'ACADEMICSTANDING_SUBJECT_LEVEL' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];

  const refResearcherStatusColumns = [
    { header: 'สถานะนักวิจัย', field: 'RESEARCHER_STATUS' },
    { header: 'คำอธิบาย', field: 'DESCRIPTION' },
    { header: 'ย้อนกลับ', field: 'ย้อนกลับ' },
  ];


  return (
    <AppsContent>
      <AppCard title={<IntlMessagesMain id="sidebar.rp02.01"  />}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
              <Tab label={<IntlMessages id="tab_ref_univ" defaultMessage="ข้อมูลหน่วยงาน" />} {...a11yProps(0)} />
              <Tab label={<IntlMessages id="tab_ref_prefix_name" defaultMessage="คำนำหน้าชื่อ" />} {...a11yProps(1)} />
              <Tab label={<IntlMessages id="tab_ref_gender" defaultMessage="เพศ" />} {...a11yProps(2)} />
              <Tab label={<IntlMessages id="tab_ref_sub_district" defaultMessage="ตำบล" />} {...a11yProps(3)} />
              <Tab label={<IntlMessages id="tab_ref_nationality" defaultMessage="สัญชาติ" />} {...a11yProps(4)} />
              <Tab label={<IntlMessages id="tab_ref_staff_type" defaultMessage="ประเภทบุคลากร" />} {...a11yProps(5)} />
              <Tab label={<IntlMessages id="tab_ref_time_contact" defaultMessage="ระยะเวลาการจ้าง" />} {...a11yProps(6)} />
              <Tab label={<IntlMessages id="tab_ref_sub_staff_type" defaultMessage="ประเภทย่อยบุคลากร" />} {...a11yProps(7)} />
              <Tab label={<IntlMessages id="tab_ref_admin" defaultMessage="ตำแหน่งบริหาร" />} {...a11yProps(8)} />
              <Tab label={<IntlMessages id="tab_ref_academic_standing" defaultMessage="วิทยฐานะ" />} {...a11yProps(9)} />
              <Tab label={<IntlMessages id="tab_ref_position_level" defaultMessage="ระดับตำแหน่ง" />} {...a11yProps(10)} />
              <Tab label={<IntlMessages id="tab_ref_fac" defaultMessage="คณะ/หน่วยงาน" />} {...a11yProps(11)} />
              <Tab label={<IntlMessages id="tab_ref_teach_subject" defaultMessage="หมวดวิชาที่สอน" />} {...a11yProps(12)} />
              <Tab label={<IntlMessages id="tab_ref_level" defaultMessage="ระดับวุฒิ" />} {...a11yProps(13)} />
              <Tab label={<IntlMessages id="tab_ref_deform" defaultMessage="สถานะความพิการ" />} {...a11yProps(14)} />
              <Tab label={<IntlMessages id="tab_ref_income" defaultMessage="ช่วงรายได้" />} {...a11yProps(15)} />
              <Tab label={<IntlMessages id="tab_ref_movement_type" defaultMessage="ประเภทการเคลื่อนย้าย" />} {...a11yProps(16)} />
              <Tab label={<IntlMessages id="tab_ref_decoration" defaultMessage="เครื่องราชอิสริยาภรณ์" />} {...a11yProps(17)} />
              <Tab label={<IntlMessages id="tab_ref_scholar_order" defaultMessage="คำสั่งทุนบุคลากร" />} {...a11yProps(18)} />
              <Tab label={<IntlMessages id="tab_ref_academic_standing_subject" defaultMessage="สาขาวิชาตำแหน่งวิชาการ" />} {...a11yProps(19)} />
              <Tab label={<IntlMessages id="tab_ref_researcher_status" defaultMessage="สถานะนักวิจัย" />} {...a11yProps(20)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={currentTab} index={0}>
            <CrudTable<RefUnivData>
              data={refUniv}
              setData={setRefUniv}
              columns={refUnivColumns}
              tableName="REF_UNIV"
              uniqueIdField="UNIV_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refUnivColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={1}>
            <CrudTable<RefPrefixNameData>
              data={refPrefixName}
              setData={setRefPrefixName}
              columns={refPrefixNameColumns}
              tableName="REF_PREFIX_NAME"
              uniqueIdField="PREFIX_NAME_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refPrefixNameColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={2}>
            <CrudTable<RefGenderData>
              data={refGender}
              setData={setRefGender}
              columns={refGenderColumns}
              tableName="REF_GENDER"
              uniqueIdField="GENDER_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refGenderColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={3}>
            <CrudTable<RefSubDistrictData>
              data={refSubDistrict}
              setData={setRefSubDistrict}
              columns={refSubDistrictColumns}
              tableName="REF_SUB_DISTRICT"
              uniqueIdField="SUB_DISTRICT_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refSubDistrictColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={4}>
            <CrudTable<RefNationalityData>
              data={refNationality}
              setData={setRefNationality}
              columns={refNationalityColumns}
              tableName="REF_NATIONALITY"
              uniqueIdField="NATIONALITY_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refNationalityColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={5}>
            <CrudTable<RefStaffTypeData>
              data={refStaffType}
              setData={setRefStaffType}
              columns={refStaffTypeColumns}
              tableName="REF_STAFFTYPE"
              uniqueIdField="STAFFTYPE_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refStaffTypeColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={6}>
            <CrudTable<RefTimeContactData>
              data={refTimeContact}
              setData={setRefTimeContact}
              columns={refTimeContactColumns}
              tableName="REF_TIME_CONTACT"
              uniqueIdField="TIME_CONTACT_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refTimeContactColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={7}>
            <CrudTable<RefSubStaffTypeData>
              data={refSubStaffType}
              setData={setRefSubStaffType}
              columns={refSubStaffTypeColumns}
              tableName="REF_SUBSTAFFTYPE"
              uniqueIdField="SUBSTAFFTYPE_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refSubStaffTypeColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={8}>
            <CrudTable<RefAdminData>
              data={refAdmin}
              setData={setRefAdmin}
              columns={refAdminColumns}
              tableName="REF_ADMIN"
              uniqueIdField="ADMIN_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refAdminColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={9}>
            <CrudTable<RefAcademicStandingData>
              data={refAcademicStanding}
              setData={setRefAcademicStanding}
              columns={refAcademicStandingColumns}
              tableName="REF_ACADEMICSTANDING"
              uniqueIdField="ACADEMICSTANDING_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refAcademicStandingColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={10}>
            <CrudTable<RefPositionLevelData>
              data={refPositionLevel}
              setData={setRefPositionLevel}
              columns={refPositionLevelColumns}
              tableName="REF_POSITIONLEVEL"
              uniqueIdField="POSITIONLEVEL_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refPositionLevelColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={11}>
            <CrudTable<RefFacData>
              data={refFac}
              setData={setRefFac}
              columns={refFacColumns}
              tableName="REF_FAC"
              uniqueIdField="FAC_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refFacColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={12}>
            <CrudTable<RefTeachSubjectData>
              data={refTeachSubject}
              setData={setRefTeachSubject}
              columns={refTeachSubjectColumns}
              tableName="REF_TEACH_SUBJECT"
              uniqueIdField="TEACH_SUBJECT_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refTeachSubjectColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={13}>
            <CrudTable<RefLevelData>
              data={refLevel}
              setData={setRefLevel}
              columns={refLevelColumns}
              tableName="REF_LEVEL"
              uniqueIdField="LEV_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refLevelColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={14}>
            <CrudTable<RefDeformData>
              data={refDeform}
              setData={setRefDeform}
              columns={refDeformColumns}
              tableName="REF_DEFORM"
              uniqueIdField="DEFORM_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refDeformColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={15}>
            <CrudTable<RefIncomeData>
              data={refIncome}
              setData={setRefIncome}
              columns={refIncomeColumns}
              tableName="REF_INCOME"
              uniqueIdField="INCOME_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refIncomeColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={16}>
            <CrudTable<RefMovementTypeData>
              data={refMovementType}
              setData={setRefMovementType}
              columns={refMovementTypeColumns}
              tableName="REF_MOVEMENT_TYPE"
              uniqueIdField="MOVEMENT_TYPE_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refMovementTypeColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={17}>
            <CrudTable<RefDecorationData>
              data={refDecoration}
              setData={setRefDecoration}
              columns={refDecorationColumns}
              tableName="REF_DECORATION"
              uniqueIdField="DECORATION_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refDecorationColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={18}>
            <CrudTable<RefScholarOrderData>
              data={refScholarOrder}
              setData={setRefScholarOrder}
              columns={refScholarOrderColumns}
              tableName="REF_SCHOLAR_ORDER"
              uniqueIdField="SCHOLAR_ORDER_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refScholarOrderColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={19}>
            <CrudTable<RefAcademicStandingSubjectData>
              data={refAcademicStandingSubject}
              setData={setRefAcademicStandingSubject}
              columns={refAcademicStandingSubjectColumns}
              tableName="REF_ACADEMICSTANDING_SUBJECT"
              uniqueIdField="ACADEMICSTANDING_SUBJECT_ID"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refAcademicStandingSubjectColumns)}
            />
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={20}>
            <CrudTable<RefResearcherStatusData>
              data={refResearcherStatus}
              setData={setRefResearcherStatus}
              columns={refResearcherStatusColumns}
              tableName="REF_RESEARCHER_STATUS"
              uniqueIdField="RESEARCHER_STATUS"
              generateNewId={generateUniqueId}
              onExportExcel={(dataToExport, name) => handleExportExcel(dataToExport, name, refResearcherStatusColumns)}
            />
          </CustomTabPanel>
        </Box>
      </AppCard>
    </AppsContent>
  );
};

export default ReportPage;