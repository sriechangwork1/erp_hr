//hr105/table/index.tsx

import React, { useState, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableItem from './TableItem';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { useIntl } from 'react-intl';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';

// นำเข้า Data interface จากไฟล์หลัก
import { Data } from '../index'; // ตรวจสอบเส้นทางให้ถูกต้อง

// กำหนดประเภทสำหรับทิศทางการจัดเรียง
type Order = 'asc' | 'desc';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละคอลัมน์ของตาราง ---
interface Column {
  id: keyof Data | 'actions'; // เพิ่ม 'actions'
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean; // เพิ่ม sortable เพื่อระบุว่าคอลัมน์นี้จัดเรียงได้หรือไม่
}

// ฟังก์ชันเปรียบเทียบสำหรับจัดเรียง
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] === undefined || b[orderBy] === null) return 1;
  if (a[orderBy] === undefined || a[orderBy] === null) return -1;
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ฟังก์ชันรับ comparator ที่เหมาะสมกับการจัดเรียง
function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key,
): (
  a: Data,
  b: Data,
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ฟังก์ชันจัดเรียงข้อมูล
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type DataTableProps = {
  data: Data[]; // รับข้อมูลจาก Hr01Page ผ่าน prop
  onView: (data: Data) => void;
  onEdit: (data: Data) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, onView, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('id');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingTable, setIsLoadingTable] = useState(true); // เพิ่มสถานะโหลดสำหรับ Table

  const intl = useIntl();

  // ตั้งเวลาสำหรับแสดง Skeleton ของ Table
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoadingTable(false), 500); // หน่วงเวลา 0.5 วินาที
    return () => clearTimeout(timer);
  }, [data]); // เมื่อข้อมูลเปลี่ยน ให้ตั้งเวลาใหม่

  const labelText = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr01.05' }); // เปลี่ยนเป็น hr01.05
    const words = label.split("HR105 "); // เปลี่ยนเป็น HR105
    return words.length > 1 ? words[1] : label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'id', label: 'รหัส' + labelText, minWidth: 50, sortable: true },
      { id: 'work_line_name', label: labelText, minWidth: 200, sortable: true },
      { id: 'create_at', label: 'วันที่สร้าง', minWidth: 170, align: 'center', sortable: true },
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 120, align: 'center', sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 80, align: 'right', sortable: false }, // Actions ไม่ต้องจัดเรียง
    ],
    [labelText]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery
  const filteredRows = useMemo(() => {
    if (!searchQuery) {
      return data; // ใช้ prop 'data' แทน allRows
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) => // ใช้ prop 'data' แทน allRows
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery]); // ให้ dependency array มี data และ searchQuery

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppsHeader>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 1,
          }}
        >
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            onChange={onSearchCustomer}
            placeholder="ค้นหา"
          />
        </Box>
      </AppsHeader>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, column.id as keyof Data)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingTable ? (
              // แสดง Skeleton Rows ขณะโหลด
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableItem key={`skeleton-${index}`} data={{} as Data} isLoading={true} // ส่ง isLoading เป็น true
                  onView={() => { }} onEdit={() => { }} onDelete={() => { }} />
              ))
            ) : (
              // แสดงข้อมูลจริงเมื่อโหลดเสร็จ
              stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableItem
                    key={row.id}
                    data={row}
                    onView={() => onView(row)}
                    onEdit={() => onEdit(row)}
                    onDelete={() => onDelete(row.id)}
                    isLoading={false} // ส่ง isLoading เป็น false
                  />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default DataTable;