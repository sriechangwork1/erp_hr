// rp110/index.tsx
'use client'; 
import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  // เพิ่ม Autocomplete และ TextField สำหรับใช้ร่วมกับ Autocomplete
  Autocomplete,
  TextField,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  FacultyStaffingDetail,
  OverallPositionSummary,
  Column,
  FacultyData,
} from './types';
import {
  initialFacultyData,
  generateStaffingDetailData,
  calculateOverallPositionSummary,
  handleExportToPdf,
  handleExportToExcel,
} from './utils';
import { jsPDF } from 'jspdf';
import { addFont } from './utils/fontLoader';
import IntlMessages from '@crema/helpers/IntlMessages';

// Call addFont to load THSarabunNew into jsPDF
if (typeof window !== 'undefined') {
  const tempDoc = new jsPDF();
  addFont(tempDoc);
}


const Rp110: React.FC = () => {
  // เปลี่ยน filterFacultyName เป็น state สำหรับ Autocomplete
  const [selectedFacultyName, setSelectedFacultyName] = useState<string | null>(null); // เก็บชื่อหน่วยงานที่เลือก
  const [facultyNameInput, setFacultyNameInput] = useState<string>(''); // เก็บค่าที่ผู้ใช้พิมพ์ในช่อง input
  const [facultyTypeFilter, setFacultyTypeFilter] = useState<'all' | 'faculty' | 'office'>('all');
  const [staffTypeFilter, setStaffTypeFilter] = useState<'all' | 'academic' | 'support'>('all');

  // Generate initial combined data (mock data for now)
  const combinedStaffingData = useMemo<FacultyStaffingDetail[]>(() => {
    return generateStaffingDetailData(initialFacultyData);
  }, []);

  // สร้างรายการชื่อหน่วยงานทั้งหมดสำหรับ Autocomplete options
  const facultyNameOptions = useMemo(() => {
    // ใช้ Set เพื่อให้ได้ชื่อที่ไม่ซ้ำกัน และแปลงกลับเป็น Array
    return Array.from(new Set(initialFacultyData.map(f => f.FACULTYNAME)));
  }, [initialFacultyData]); // initialFacultyData ไม่น่าจะเปลี่ยนบ่อย จึงใช้เป็น dependency ได้

  // Filtered data based on user selections
  const filteredData = useMemo(() => {
    return combinedStaffingData.filter((faculty) => {
      // Logic สำหรับการกรองชื่อหน่วยงาน
      const matchesFacultyName = selectedFacultyName
        ? faculty.FACULTYNAME === selectedFacultyName
        : faculty.FACULTYNAME.toLowerCase().includes(
            facultyNameInput.toLowerCase() // ถ้ายังไม่ได้เลือก (selectedFacultyName เป็น null) ให้ใช้ค่าจาก input field ในการกรอง
          );

      const matchesFacultyType =
        facultyTypeFilter === 'all' ||
        (facultyTypeFilter === 'faculty' && faculty.FACULTYTYPEID === 1) ||
        (facultyTypeFilter === 'office' && faculty.FACULTYTYPEID === 2);

      return matchesFacultyName && matchesFacultyType;
    });
  }, [combinedStaffingData, selectedFacultyName, facultyNameInput, facultyTypeFilter]); // อัปเดต dependencies

  // Calculate overall summary for filtered data
  const overallSummaryData = useMemo(() => {
    const fullSummary = calculateOverallPositionSummary(filteredData);
    if (staffTypeFilter === 'all') {
      return fullSummary;
    } else if (staffTypeFilter === 'academic') {
      return fullSummary.filter(s => s.staffType === 'สายวิชาการ');
    } else { // 'support'
      return fullSummary.filter(s => s.staffType === 'สายสนับสนุนวิชาการ');
    }
  }, [filteredData, staffTypeFilter]);


  const overallSummaryColumns: Column[] = [
    { id: 'positionName', label: 'ตำแหน่ง', minWidth: 150 },
    { id: 'staffType', label: 'ประเภทสายงาน', minWidth: 120 },
    { id: 'approved', label: 'อนุมัติ', minWidth: 80, align: 'right' },
    { id: 'actual', label: 'มีอยู่จริง', minWidth: 80, align: 'right' },
    { id: 'vacant', label: 'ว่าง', minWidth: 80, align: 'right' },
    {
      id: 'utilizationRate',
      label: 'อัตราบรรจุ (%)',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];

  const detailColumns: Column[] = [
    { id: 'positionName', label: 'ตำแหน่ง', minWidth: 150 },
    { id: 'approved', label: 'อนุมัติ', minWidth: 80, align: 'right' },
    { id: 'actual', label: 'มีอยู่จริง', minWidth: 80, align: 'right' },
    { id: 'vacant', label: 'ว่าง', minWidth: 80, align: 'right' },
    {
      id: 'utilizationRate',
      label: 'อัตราบรรจุ (%)',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];

  const totalOverallApproved = overallSummaryData.reduce((sum, row) => sum + row.approved, 0);
  const totalOverallActual = overallSummaryData.reduce((sum, row) => sum + row.actual, 0);
  const totalOverallVacant = totalOverallApproved - totalOverallActual;
  const totalOverallUtilizationRate = totalOverallApproved > 0 ? (totalOverallActual / totalOverallApproved) * 100 : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <IntlMessages id="sidebar.rp01.10" />
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {/* เปลี่ยนจาก TextField เป็น Autocomplete */}
        <Autocomplete
          options={facultyNameOptions}
          // value คือค่าที่ถูกเลือกใน Autocomplete (จาก options)
          value={selectedFacultyName}
          // onInputChange ใช้เมื่อผู้ใช้พิมพ์ในช่อง input (อาจจะยังไม่ได้เลือกจาก options)
          onInputChange={(_, newInputValue) => {
            setFacultyNameInput(newInputValue);
            if (newInputValue === '') { // ถ้าพิมพ์จนว่าง ให้เคลียร์ค่าที่เลือกไว้ด้วย
              setSelectedFacultyName(null);
            }
          }}
          // onChange ใช้เมื่อมีการเลือกค่าจาก options
          onChange={(_, newValue: string | null) => {
            setSelectedFacultyName(newValue);
            // เมื่อเลือกค่าแล้ว ก็ตั้งค่า input ให้ตรงกัน เพื่อให้แสดงผลถูกต้อง
            setFacultyNameInput(newValue || '');
          }}
          sx={{ minWidth: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="ค้นหาชื่อหน่วยงาน" variant="outlined" />
          )}
          freeSolo // อนุญาตให้ผู้ใช้พิมพ์ค่าที่ไม่ตรงกับ options ได้
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="faculty-type-label">ประเภทหน่วยงาน</InputLabel>
          <Select
            labelId="faculty-type-label"
            value={facultyTypeFilter}
            label="ประเภทหน่วยงาน"
            onChange={(e) => setFacultyTypeFilter(e.target.value as 'all' | 'faculty' | 'office')}
          >
            <MenuItem value="all">ทั้งหมด</MenuItem>
            <MenuItem value="faculty">คณะ</MenuItem>
            <MenuItem value="office">สำนักงาน</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="staff-type-label">สายงาน</InputLabel>
          <Select
            labelId="staff-type-label"
            value={staffTypeFilter}
            label="สายงาน"
            onChange={(e) => setStaffTypeFilter(e.target.value as 'all' | 'academic' | 'support')}
          >
            <MenuItem value="all">ทั้งหมด</MenuItem>
            <MenuItem value="academic">สายวิชาการ</MenuItem>
            <MenuItem value="support">สายสนับสนุน</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Export Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          onClick={() => handleExportToPdf(overallSummaryData, filteredData, facultyTypeFilter, staffTypeFilter, selectedFacultyName || facultyNameInput)}  
        >
          Export to PDF
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<DescriptionIcon />}
          onClick={() => handleExportToExcel(overallSummaryData, filteredData, facultyTypeFilter, staffTypeFilter, selectedFacultyName || facultyNameInput)} 
        >
          Export to Excel
        </Button>
      </Box>

      {/* Overall Summary Table */}
      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        สรุปอัตรากำลังบุคลากรแยกตามตำแหน่ง (รวมทั้งมหาวิทยาลัย)
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="overall summary table">
          <TableHead>
            <TableRow>
              {overallSummaryColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {overallSummaryData.map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.positionName + index}>
                {overallSummaryColumns.map((column) => {
                  const value = row[column.id as keyof OverallPositionSummary];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {/* Overall Total Row */}
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }} colSpan={2}>รวมทั้งหมด</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalOverallApproved}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalOverallActual}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalOverallVacant}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalOverallUtilizationRate.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detail Tables by Faculty */}
      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        รายละเอียดอัตรากำลังบุคลากรแยกตามหน่วยงาน
      </Typography>
      {filteredData.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          ไม่พบข้อมูลสำหรับตัวกรองที่เลือก
        </Typography>
      ) : (
        filteredData.map((faculty) => (
          <Box key={faculty.FACULTYID} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              หน่วยงาน: {faculty.FACULTYNAME}
            </Typography>

            {/* Academic Staffing Table */}
            {(staffTypeFilter === 'all' || staffTypeFilter === 'academic') && faculty.academicStaffing.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                  สายวิชาการ
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                        {detailColumns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {faculty.academicStaffing.map((position) => (
                        <TableRow key={position.positionName}>
                          <TableCell>{position.positionName}</TableCell>
                          <TableCell align="right">{position.approved}</TableCell>
                          <TableCell align="right">{position.actual}</TableCell>
                          <TableCell align="right">{position.vacant}</TableCell>
                          <TableCell align="right">{position.utilizationRate.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>รวมสายวิชาการ</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.academicStaffing.reduce((sum, p) => sum + p.actual, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.academicStaffing.reduce((sum, p) => sum + p.vacant, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {(faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0) > 0
                            ? (faculty.academicStaffing.reduce((sum, p) => sum + p.actual, 0) /
                                faculty.academicStaffing.reduce((sum, p) => sum + p.approved, 0)) * 100
                            : 0
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Support Staffing Table */}
            {(staffTypeFilter === 'all' || staffTypeFilter === 'support') && faculty.supportStaffing.length > 0 && (
              <Box>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                  สายสนับสนุนวิชาการ
                </Typography>
                <TableContainer component={Paper} elevation={1}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                        {detailColumns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {faculty.supportStaffing.map((position) => (
                        <TableRow key={position.positionName}>
                          <TableCell>{position.positionName}</TableCell>
                          <TableCell align="right">{position.approved}</TableCell>
                          <TableCell align="right">{position.actual}</TableCell>
                          <TableCell align="right">{position.vacant}</TableCell>
                          <TableCell align="right">{position.utilizationRate.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>รวมสายสนับสนุนวิชาการ</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.supportStaffing.reduce((sum, p) => sum + p.actual, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{faculty.supportStaffing.reduce((sum, p) => sum + p.vacant, 0)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {(faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0) > 0
                            ? (faculty.supportStaffing.reduce((sum, p) => sum + p.actual, 0) /
                                faculty.supportStaffing.reduce((sum, p) => sum + p.approved, 0)) * 100
                            : 0
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Faculty Overall Total */}
            <Box sx={{ mt: 2, p: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold">รวม{faculty.FACULTYNAME}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>อนุมัติ: {faculty.facultyApprovedTotal}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>มีอยู่จริง: {faculty.facultyActualTotal}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 80, textAlign: 'right' }}>ว่าง: {faculty.facultyVacantTotal}</Typography>
              <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 120, textAlign: 'right' }}>บรรจุ: {faculty.facultyUtilizationRate.toFixed(2)}%</Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Rp110;