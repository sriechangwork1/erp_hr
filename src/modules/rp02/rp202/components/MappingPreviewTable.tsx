import React, { useMemo } from 'react';
import { Staff } from '../interfaces/StaffSource.interface';
import { UOCStaff } from '../interfaces/UOCStaff.interface';
import DataTable from './CrudTable';
import { Box, Typography } from '@mui/material';

interface MappingPreviewTableProps {
  selectedSourceStaffs: Staff[]; // เปลี่ยนเป็น Array
  selectedUOCStaffs: UOCStaff[]; // เปลี่ยนเป็น Array
}

const MappingPreviewTable: React.FC<MappingPreviewTableProps> = ({
  selectedSourceStaffs,
  selectedUOCStaffs,
}) => {
  // สร้างข้อมูลสำหรับการแสดงตัวอย่างการจับคู่
  // สำหรับตอนนี้ เราจะสร้างการจับคู่ที่เป็นไปได้ทั้งหมดระหว่าง Staff และ UOCStaff ที่เลือก
  // โดยพยายามจับคู่จาก citizen_id ก่อน ถ้าไม่มี ก็แสดงทั้งหมด
  const previewData = useMemo(() => {
    const data: any[] = [];
    const matchedCitizenIds = new Set<string>();

    // Step 1: จับคู่ตาม citizen_id
    selectedSourceStaffs.forEach(sourceStaff => {
      const matchedUOC = selectedUOCStaffs.find(uocStaff => uocStaff.citizen_id === sourceStaff.citizen_id);
      if (matchedUOC) {
        data.push({
          previewId: `p-${sourceStaff.staff_id}-${matchedUOC.ds2001_id}`,
          sourceStaffId: sourceStaff.staff_id,
          sourceStaffName: `${sourceStaff.prefixname_id && sourceStaff.prefixname_id === 1 ? 'นาย' : sourceStaff.prefixname_id === 2 ? 'นาง' : 'นางสาว'} ${sourceStaff.first_name_th} ${sourceStaff.last_name_th}`,
          sourceCitizenId: sourceStaff.citizen_id,
          uocStaffId: matchedUOC.ds2001_id,
          uocStaffName: `${matchedUOC.prefix_name_id && matchedUOC.prefix_name_id === '1' ? 'นาย' : matchedUOC.prefix_name_id === '2' ? 'นาง' : 'นางสาว'} ${matchedUOC.stf_fname} ${matchedUOC.stf_lname}`,
          uocCitizenId: matchedUOC.citizen_id,
          status: 'จับคู่โดยเลขบัตรประชาชน',
        });
        matchedCitizenIds.add(sourceStaff.citizen_id?sourceStaff.citizen_id:'');
      }
    });

    // Step 2: เพิ่มรายการที่เหลือที่ไม่มีการจับคู่ตาม citizen_id (ถ้ามี)
    selectedSourceStaffs.forEach(sourceStaff => {
      if (!matchedCitizenIds.has(sourceStaff.citizen_id?sourceStaff.citizen_id:'')) {
        data.push({
          previewId: `p-${sourceStaff.staff_id}-unmatched`,
          sourceStaffId: sourceStaff.staff_id,
          sourceStaffName: `${sourceStaff.prefixname_id && sourceStaff.prefixname_id === 1 ? 'นาย' : sourceStaff.prefixname_id === 2 ? 'นาง' : 'นางสาว'} ${sourceStaff.first_name_th} ${sourceStaff.last_name_th}`,
          sourceCitizenId: sourceStaff.citizen_id,
          uocStaffId: 'ยังไม่ได้เลือก',
          uocStaffName: 'ยังไม่ได้เลือก',
          uocCitizenId: 'N/A',
          status: 'บุคลากร Staff ที่ยังไม่มีคู่ใน UOC',
        });
      }
    });

    selectedUOCStaffs.forEach(uocStaff => {
      if (!matchedCitizenIds.has(uocStaff.citizen_id??'')) {
        data.push({
          previewId: `p-unmatched-${uocStaff.ds2001_id}`,
          sourceStaffId: 'ยังไม่ได้เลือก',
          sourceStaffName: 'ยังไม่ได้เลือก',
          sourceCitizenId: 'N/A',
          uocStaffId: uocStaff.ds2001_id,
          uocStaffName: `${uocStaff.prefix_name_id && uocStaff.prefix_name_id === '1' ? 'นาย' : uocStaff.prefix_name_id === '2' ? 'นาง' : 'นางสาว'} ${uocStaff.stf_fname} ${uocStaff.stf_lname}`,
          uocCitizenId: uocStaff.citizen_id,
          status: 'บุคลากร UOC ที่ยังไม่มีคู่ใน Staff',
        });
      }
    });

    return data;
  }, [selectedSourceStaffs, selectedUOCStaffs]);

  const columns = [
    { key: 'sourceStaffId', header: 'รหัสบุคลากร (Staff)' },
    { key: 'sourceStaffName', header: 'ชื่อ-สกุล (Staff)' },
    { key: 'sourceCitizenId', header: 'เลขบัตร ปชช. (Staff)' },
    { key: 'uocStaffId', header: 'รหัสบุคลากร (UOC)' },
    { key: 'uocStaffName', header: 'ชื่อ-สกุล (UOC)' },
    { key: 'uocCitizenId', header: 'เลขบัตร ปชช. (UOC)' },
    { key: 'status', header: 'สถานะ' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
        ข้อมูลที่กำลังจะจับคู่ (ตัวอย่าง)
      </Typography>
      <DataTable
        data={previewData}
        columns={columns}
        idKey="previewId" // ใช้ previewId เป็น key สำหรับ Preview Table
      />
      {previewData.length === 0 && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          กรุณาเลือกบุคลากรจากทั้งสองตารางเพื่อดูตัวอย่างการจับคู่
        </Typography>
      )}
    </Box>
  );
};

export default MappingPreviewTable;