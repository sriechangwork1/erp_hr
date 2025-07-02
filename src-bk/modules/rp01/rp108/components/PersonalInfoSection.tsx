// src/pages/hr911/components/PersonalInfoSection.tsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Gp7StaffData } from '../types';
import Gp7Section from './Gp7Section';

interface PersonalInfoSectionProps {
  data: Gp7StaffData;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data }) => {
  return (
    <Gp7Section title="1. ประวัติส่วนบุคคล">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>ชื่อ-สกุล (ไทย):</strong> {data.fullNameTh}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>ชื่อ-สกุล (อังกฤษ):</strong> {data.fullNameEn || '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>เลขบัตรประชาชน:</strong> {data.citizen_id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>วัน/เดือน/ปีเกิด:</strong> {data.date_of_birth}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>เพศ:</strong> {data.genderTh}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>อีเมล:</strong> {data.email1 || '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>เบอร์โทรศัพท์:</strong> {data.phone_number || '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>ประเภทบุคลากร:</strong> {data.currentStaffTypeDisplay}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>หน่วยงานปัจจุบัน:</strong> {data.faculty_name_th}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>ตำแหน่งปัจจุบัน:</strong> {data.currentPositionDisplay}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>วันที่ได้รับการบรรจุ/แต่งตั้ง:</strong> {data.date_of_appointment || '-'}</Typography>
        </Grid>
      </Grid>
    </Gp7Section>
  );
};

export default PersonalInfoSection;