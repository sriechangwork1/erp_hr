'use client';

import React from 'react';
import useStaffMapping from '../hooks/useStaffMapping';
import SourceStaffTable from '../components/SourceStaffTable';
import UOCStaffTable from '../components/UOCStaffTable';
import MappingPreviewTable from '../components/MappingPreviewTable';
import ExistingMappingsTable from '../components/ExistingMappingsTable';
import ActionButtons from '../components/ActionButtons';
import { Box, Container, Typography, Grid } from '@mui/material';
import Swal from 'sweetalert2';
import AppCard from '@crema/components/AppCard';
import IntlMessagesMain from '@crema/helpers/IntlMessages';

const StaffMappingPage: React.FC = () => {
  const {
    filteredSourceStaffs,
    filteredUOCStaffs,
    mappedStaffs,
    selectedSourceStaffs, // เปลี่ยนเป็น Array
    selectedUOCStaffs,   // เปลี่ยนเป็น Array
    sourceSearchTerm,
    uocSearchTerm,
    handleToggleSourceStaff, // เปลี่ยนชื่อ
    handleToggleUOCStaff,   // เปลี่ยนชื่อ
    setSourceSearchTerm,
    setUocSearchTerm,
    handleSaveMapping,
    handleClearSelections,
  } = useStaffMapping();

  const handleSaveClick = async () => {
    if (selectedSourceStaffs.length === 0 || selectedUOCStaffs.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณาเลือกบุคลากรจากทั้งสองตารางอย่างน้อย 1 รายการเพื่อจับคู่ก่อนบันทึก',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    const result = await Swal.fire({
      icon: 'question',
      title: 'ยืนยันการบันทึก',
      text: `คุณต้องการบันทึกการจับคู่ข้อมูล ${selectedSourceStaffs.length} รายการ และ ${selectedUOCStaffs.length} รายการใช่หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      handleSaveMapping();
      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ!',
        text: 'การจับคู่ข้อมูลถูกบันทึกเรียบร้อยแล้ว',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleClearClick = async () => {
    if (selectedSourceStaffs.length === 0 && selectedUOCStaffs.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'ไม่มีข้อมูลให้ล้าง',
        text: 'ไม่มีข้อมูลบุคลากรที่ถูกเลือกอยู่ในขณะนี้',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    const result = await Swal.fire({
      icon: 'warning',
      title: 'ยืนยันการล้างข้อมูล',
      text: 'คุณต้องการล้างข้อมูลบุคลากรที่เลือกไว้ทั้งหมดใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ล้างข้อมูล',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      handleClearSelections();
      Swal.fire({
        icon: 'info',
        title: 'ล้างข้อมูลสำเร็จ!',
        text: 'ข้อมูลที่เลือกถูกล้างเรียบร้อยแล้ว',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AppCard sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}
      title={<IntlMessagesMain id="sidebar.rp02.02"/>}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <SourceStaffTable
              data={filteredSourceStaffs}
              onToggleSelectStaff={handleToggleSourceStaff} // ส่งชื่อฟังก์ชันใหม่
              selectedStaffs={selectedSourceStaffs}       // ส่ง Array
              searchTerm={sourceSearchTerm}
              onSearchChange={(e) => setSourceSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <UOCStaffTable
              data={filteredUOCStaffs}
              onToggleSelectUOCStaff={handleToggleUOCStaff} // ส่งชื่อฟังก์ชันใหม่
              selectedUOCStaffs={selectedUOCStaffs}       // ส่ง Array
              searchTerm={uocSearchTerm}
              onSearchChange={(e) => setUocSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <MappingPreviewTable
            selectedSourceStaffs={selectedSourceStaffs} // ส่ง Array
            selectedUOCStaffs={selectedUOCStaffs}     // ส่ง Array
          />
        </Box>

        <ActionButtons
          onSave={handleSaveClick}
          onClear={handleClearClick}
          // ปุ่มบันทึกจะ active เมื่อมีรายการที่เลือกจากทั้งสองฝั่งอย่างน้อย 1 รายการ
          saveDisabled={selectedSourceStaffs.length === 0 || selectedUOCStaffs.length === 0}
        />

        <Box sx={{ mt: 6 }}>
          <ExistingMappingsTable data={mappedStaffs} />
        </Box>
      </AppCard>
    </Container>
  );
};

export default StaffMappingPage;