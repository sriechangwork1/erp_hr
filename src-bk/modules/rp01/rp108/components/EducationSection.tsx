// src/pages/hr911/components/EducationSection.tsx
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Gp7StaffData, EducationRecord } from '../types';
import Gp7Section from './Gp7Section';

interface EducationSectionProps {
  data: Gp7StaffData;
}

const EducationSection: React.FC<EducationSectionProps> = ({ data }) => {
  return (
    <Gp7Section title="3. ประวัติการศึกษา">
      {data.educationHistory && data.educationHistory.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ลำดับ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>วุฒิการศึกษา</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>สาขาวิชา</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>สถาบัน</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ปีที่สำเร็จ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.educationHistory.map((edu: EducationRecord, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{edu.degree}</TableCell>
                <TableCell>{edu.major}</TableCell>
                <TableCell>{edu.institution}</TableCell>
                <TableCell>{edu.yearGraduated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>ไม่มีข้อมูลประวัติการศึกษา</Typography>
      )}
    </Gp7Section>
  );
};

export default EducationSection;