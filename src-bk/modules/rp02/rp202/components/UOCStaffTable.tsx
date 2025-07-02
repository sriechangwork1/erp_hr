import React, { useState, useMemo } from 'react';
import { UOCStaff } from '../interfaces/UOCStaff.interface';
import DataTable from './CrudTable';
import SearchInput from './SearchInput';
import { Box, Typography } from '@mui/material';

interface UOCStaffTableProps {
  data: UOCStaff[];
  onToggleSelectUOCStaff: (uocStaff: UOCStaff) => void; // เปลี่ยนชื่อ prop
  selectedUOCStaffs: UOCStaff[]; // เปลี่ยนเป็น Array
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UOCStaffTable: React.FC<UOCStaffTableProps> = ({
  data,
  onToggleSelectUOCStaff, // ใช้ชื่อใหม่
  selectedUOCStaffs,      // ใช้ชื่อใหม่
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

  const columns = [
    { key: 'ds2001_id', header: 'รหัส UOC' },
    { key: 'citizen_id', header: 'เลขบัตรประชาชน' },
    { key: 'stf_fname', header: 'ชื่อ (UOC)' },
    { key: 'stf_lname', header: 'นามสกุล (UOC)' },
    { key: 'email', header: 'อีเมล (UOC)' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
        ข้อมูลบุคลากรในระบบ UOC (UOC_Staff)
      </Typography>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="ค้นหาบุคลากร UOC..."
      />
      <DataTable<UOCStaff>
        data={paginatedData}
        columns={columns}
        onToggleSelect={onToggleSelectUOCStaff} // ส่ง onToggleSelectUOCStaff
        selectedItems={selectedUOCStaffs} // ส่ง selectedUOCStaffs
        idKey="ds2001_id"
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        totalCount={data.length}
      />
    </Box>  );
};

export default UOCStaffTable;