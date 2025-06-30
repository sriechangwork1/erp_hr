import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TablePagination,
  Checkbox // Import Checkbox
} from '@mui/material';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onToggleSelect?: (item: T) => void; // เปลี่ยนเป็น onToggleSelect
  selectedItems?: T[]; // เปลี่ยนเป็น selectedItems (Array)
  idKey: keyof T;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  totalCount?: number;
}

function DataTable<T>({
  data,
  columns,
  onToggleSelect, // ใช้ onToggleSelect
  selectedItems = [], // Default เป็น Array ว่าง
  idKey,
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  totalCount = data.length,
}: DataTableProps<T>) {
  // ฟังก์ชันสำหรับตรวจสอบว่า item ถูกเลือกอยู่หรือไม่
  const isSelected = (item: T) => {
    return selectedItems.some(selected => (selected as any)[idKey] === (item as any)[idKey]);
  };

  return (
    <TableContainer component={Paper} elevation={1} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            {onToggleSelect && (
              <TableCell padding="checkbox" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                {/* Checkbox รวม (ถ้าต้องการ) - สำหรับตอนนี้ไม่ใส่ */}
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell key={String(col.key)} sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (onToggleSelect ? 1 : 0)} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">ไม่พบข้อมูล</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => {
              const itemIsSelected = isSelected(item);
              return (
                <TableRow
                  key={String((item as any)[idKey])}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#e3f2fd' },
                    ...(itemIsSelected && {
                      backgroundColor: '#e3f2fd !important', // Selected item color (light blue)
                    }),
                  }}
                  // สามารถเพิ่ม onClick บน Row ได้ถ้าต้องการให้คลิกที่ Row แล้วเลือก/ไม่เลือก
                  // onClick={() => onToggleSelect && onToggleSelect(item)}
                >
                  {onToggleSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={itemIsSelected}
                        onChange={() => onToggleSelect(item)}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} sx={{ fontSize: '0.875rem' }}>
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      {onPageChange && onRowsPerPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="แถวต่อหน้า:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
          }
        />
      )}
    </TableContainer>
  );
}

export default DataTable;