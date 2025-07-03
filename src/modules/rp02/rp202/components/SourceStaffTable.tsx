import React, { useState, useMemo } from 'react';
import { Staff } from '../interfaces/StaffSource.interface';
import DataTable from './CrudTable';
import SearchInput from './SearchInput';
import { Box, Typography } from '@mui/material';

interface SourceStaffTableProps {
  data: Staff[];
  onToggleSelectStaff: (staff: Staff) => void; // เปลี่ยนชื่อ prop
  selectedStaffs: Staff[]; // เปลี่ยนเป็น Array
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SourceStaffTable: React.FC<SourceStaffTableProps> = ({
  data,
  onToggleSelectStaff, // ใช้ชื่อใหม่
  selectedStaffs,      // ใช้ชื่อใหม่
  searchTerm,
  onSearchChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = useMemo(() => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [data, page, rowsPerPage]);

  const columns: { key: keyof Staff; header: string }[] = [
    { key: 'staff_id', header: 'รหัสบุคลากร' },
    { key: 'citizen_id', header: 'เลขบัตรประชาชน' },
    { key: 'first_name_th', header: 'ชื่อ' },
    { key: 'last_name_th', header: 'นามสกุล' },
    { key: 'email1', header: 'อีเมล' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
        ข้อมูลบุคลากรต้นทาง (Staff)
      </Typography>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="ค้นหาบุคลากรต้นทาง..."
      />
      <DataTable<Staff>
        data={paginatedData}
        columns={columns}
        onToggleSelect={onToggleSelectStaff} // ส่ง onToggleSelectStaff
        selectedItems={selectedStaffs} // ส่ง selectedStaffs
        idKey="staff_id"
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalCount={data.length}
      />
    </Box>
  );
};

export default SourceStaffTable;