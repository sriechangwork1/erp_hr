//hr1001/index.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import IntlMessages from '@crema/helpers/IntlMessages';
import Swal from 'sweetalert2';

import UserGroupList from './UserGroupList';
import ReportPagePermission from './ReportPagePermission';
import { UserGroup, ReportPage, UserGroupPermission } from './types';

// --- ข้อมูลจำลอง (Mock Data) ---
// ในแอปพลิเคชันจริง ข้อมูลเหล่านี้จะมาจาก API หรือ Redux/Context
const mockUserGroups: UserGroup[] = [
  { id: 'admin', name: 'ผู้ดูแลระบบ' },
  { id: 'faculty_admin', name: 'ผู้ดูแลระบบระดับคณะ/หน่วยงาน' },
  { id: 'hr_staff', name: 'เจ้าหน้าที่บุคคล' },
  { id: 'general_user', name: 'ผู้ใช้งานทั่วไป' },
];

const mockReportPages: ReportPage[] = [
  { id: 'HR1002', name: 'HR1002 รายการชุดข้อมูลบุคลากร' },
  { id: 'HR1003', name: 'HR1003 สรุปจำนวนบุคลากร ตามประเภทและสายงาน' },
  { id: 'RP101', name: 'RP101 รายชื่อหน่วยงาน' },
  { id: 'RP102', name: 'RP102 รายงานอัตรากำลังตามหน่วยงาน' },
  { id: 'RP103', name: 'RP103 รายงานอัตรากำลังตามตำแหน่ง' },
  { id: 'RP104', name: 'RP104 รายชื่อบุคลากรที่เกษียณอายุ' },
  { id: 'RP105', name: 'RP105 รายชื่อบุคลากรตามหน่วยงาน' },
  { id: 'RP106', name: 'RP106 รายชื่อบุคลากรตามประเภท' },
  { id: 'RP107', name: 'RP107 สรุปอัตรากำลังตามตำแหน่งตามหน่วยงาน' },
  { id: 'RP108', name: 'RP108 รายงาน ก.พ.7' },
  { id: 'RP109', name: 'RP109 รายชื่อตำแหน่งบริหาร' },
  { id: 'RP110', name: 'RP110 รายชื่อตำแหน่งทางวิชาการ/ตำแหน่งสูงขึ้น' },
  { id: 'RP111', name: 'RP111 รายงานข้อมูลประวัติการศึกษา' },
  { id: 'RP112', name: 'RP112 หนังสือรับรองเงินเดือน' },
  { id: 'RP201', name: 'RP201 บันทึกข้อมูลพื้นฐานตามตารางอ้างอิงของ UOC_STAFF' },
  { id: 'RP202', name: 'RP202 บันทึกจับคู่รหัสรายการข้อมูลของ UOC_STAFF' },
  { id: 'RP203', name: 'RP203 ตรวจสอบข้อมูลตามโครงสร้างฟิลด์ของ UOC_STAFF' },
  { id: 'RP204', name: 'RP204 ส่งออกข้อมูล DS2001' },
  { id: 'RP205', name: 'RP205 ส่งออกข้อมูล DS2003' },
  { id: 'RP206', name: 'RP206 ส่งออกข้อมูล DS2004' },
  { id: 'RP207', name: 'RP207 ส่งออกข้อมูลรายบุคลากร CSV/Excel' },
];

// ข้อมูลจำลองสิทธิ์ที่ถูกกำหนดไว้แล้ว
// ในแอปพลิเคชันจริง ข้อมูลนี้จะถูกโหลดมาจากฐานข้อมูลเมื่อหน้าโหลด
const mockUserGroupPermissions: UserGroupPermission[] = [
  { groupId: 'admin', reportPageIds: mockReportPages.map(p => p.id) }, // ผู้ดูแลระบบมีสิทธิ์ทั้งหมด
  { groupId: 'faculty_admin', reportPageIds: ['HR1002', 'HR1003', 'RP105', 'RP106'] },
  { groupId: 'general_user', reportPageIds: ['HR1002', 'RP101'] },
  { groupId: 'hr_staff', reportPageIds: ['HR1002', 'HR1003', 'RP101', 'RP102', 'RP103', 'RP104', 'RP105', 'RP106', 'RP107', 'RP108', 'RP109', 'RP110', 'RP111', 'RP112', 'RP207'] },
];

const PermissionManagementPage: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedReportPageIds, setSelectedReportPageIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // State สำหรับเก็บสิทธิ์ทั้งหมดที่ถูกโหลดมา (เสมือนจาก DB)
  const [allUserGroupPermissions, setAllUserGroupPermissions] = useState<UserGroupPermission[]>(mockUserGroupPermissions);

  // โหลดสิทธิ์เมื่อ selectedGroupId เปลี่ยน
  useEffect(() => {
    if (selectedGroupId) {
      const currentPermissions = allUserGroupPermissions.find(
        (p) => p.groupId === selectedGroupId
      );
      setSelectedReportPageIds(currentPermissions ? [...currentPermissions.reportPageIds] : []);
    } else {
      setSelectedReportPageIds([]);
    }
  }, [selectedGroupId, allUserGroupPermissions]);

  const handleSelectGroup = useCallback((groupId: string) => {
    setSelectedGroupId(groupId);
  }, []);

  const handleToggleReportPage = useCallback((reportPageId: string) => {
    setSelectedReportPageIds((prevSelected) => {
      if (prevSelected.includes(reportPageId)) {
        return prevSelected.filter((id) => id !== reportPageId);
      } else {
        return [...prevSelected, reportPageId];
      }
    });
  }, []);

  const handleSavePermissions = useCallback(async () => {
    if (!selectedGroupId) {
      Swal.fire('ข้อผิดพลาด', 'โปรดเลือกกลุ่มผู้ใช้งานก่อนบันทึกสิทธิ์', 'error');
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    setAllUserGroupPermissions((prevPermissions) => {
      const existingIndex = prevPermissions.findIndex(p => p.groupId === selectedGroupId);
      if (existingIndex !== -1) {
        // อัปเดตสิทธิ์ของกลุ่มเดิม
        const updatedPermissions = [...prevPermissions];
        updatedPermissions[existingIndex] = { 
          groupId: selectedGroupId, 
          reportPageIds: selectedReportPageIds 
        };
        return updatedPermissions;
      } else {
        // เพิ่มสิทธิ์สำหรับกลุ่มใหม่ (กรณีที่ไม่เคยมีข้อมูลอยู่ก่อน)
        return [...prevPermissions, { groupId: selectedGroupId, reportPageIds: selectedReportPageIds }];
      }
    });

    setIsSaving(false);
    Swal.fire('สำเร็จ!', 'บันทึกสิทธิ์เรียบร้อยแล้ว', 'success');
  }, [selectedGroupId, selectedReportPageIds]);

  const selectedGroupName = selectedGroupId 
    ? mockUserGroups.find(group => group.id === selectedGroupId)?.name 
    : '';

  return (
    <AppsContent
      title={<IntlMessages id="sidebar.hr10.01"/>}
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
          <IntlMessages id="sidebar.hr10.01" />
        </Typography>

        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={4}>
            <UserGroupList
              userGroups={mockUserGroups}
              selectedGroupId={selectedGroupId}
              onSelectGroup={handleSelectGroup}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReportPagePermission
              reportPages={mockReportPages}
              selectedReportPageIds={selectedReportPageIds}
              onToggleReportPage={handleToggleReportPage}
              onSavePermissions={handleSavePermissions}
              isSaving={isSaving}
              selectedGroupName={selectedGroupName?selectedGroupName:''}
            />
          </Grid>
        </Grid>
      </Box>
      <AppInfoView />
    </AppsContent>
  );
};

export default PermissionManagementPage;