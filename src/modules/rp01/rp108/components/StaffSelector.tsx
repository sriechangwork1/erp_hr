// src/pages/hr911/components/StaffSelector.tsx
import React from 'react';
import { Box, TextField, MenuItem, CircularProgress } from '@mui/material';
import { StaffOption } from '../types';

interface StaffSelectorProps {
  staffList: StaffOption[];
  selectedStaffId: number | null;
  onSelectStaff: (staffId: number | null) => void;
  isLoading: boolean;
}

const StaffSelector: React.FC<StaffSelectorProps> = ({ staffList, selectedStaffId, onSelectStaff, isLoading }) => {
  return (
    <Box sx={{ minWidth: 250 }}>
      <TextField
        select
        label="เลือกบุคลากร (ค้นหาจากคณะ/ชื่อ)"
        value={selectedStaffId || ''}
        onChange={(e) => onSelectStaff(e.target.value ? Number(e.target.value) : null)}
        variant="outlined"
        size="small"
        fullWidth
        disabled={isLoading}
      >
        <MenuItem value="">
          {isLoading ? <CircularProgress size={16} /> : '-- เลือกบุคลากร --'}
        </MenuItem>
        {staffList.map((staff) => (
          <MenuItem key={staff.staff_id} value={staff.staff_id}>
            {staff.fullNameTh} ({staff.facultyName} - {staff.currentPositionName})
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default StaffSelector;