// // src/components/SalaryInfo.tsx
// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import IntlMessages from '@crema/helpers/IntlMessages';

// const SalaryInfo = () => {
//   return (
//       <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', mt: 3 }}>
//       <IntlMessages id="common.staffDetails" defaultMessage="ข้อมูลเงินเดือน" />
//       {/* สามารถเพิ่มฟอร์มหรือตารางสำหรับข้อมูลการศึกษาได้ที่นี่ */}
//     </Box>
//   );
// };

// export default SalaryInfo;

// tabdata/SalaryInfo.tsx
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppSelect from '@crema/components/AppSelect';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AppDialog from '@crema/components/AppDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import TableMui from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import AppSearchBar from '@crema/components/AppSearchBar';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { MdCalendarMonth } from "react-icons/md";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


// Data Interface
interface Data {
  salary_id: number;
  staff_id?: number;
  salary_amount?: number;
  salary_account?: string;
  salary_detail?: string;
  position_id_academic?: number | null;
  academic_allowance?: number;
  position_id_management?: number | null;
  management_allowance?: number;
  effective_date?: string | null;
  end_date?: string | null;
  salary_date?: string; // เพิ่ม: วันที่จ่ายเงินเดือน
  salary_note?: string;
  create_at?: string; // เพิ่ม: วันที่สร้าง
  update_at?: string; // เพิ่ม: วันที่อัปเดต
  officer_id?: number; // เปลี่ยนเป็น number ตาม mock data ที่ให้มา
  [key: string]: any;
}

// Staff AutoComplete Option Interface (ไม่เปลี่ยนแปลง)
interface StaffAutoCompleteOption {
  staff_id: number;
  prefixname_id: string;
  first_name_th: string;
  last_name_th: string;
}

// Mock Data - ใช้ข้อมูลที่คุณให้มาและเพิ่มฟิลด์ที่หายไป
const initialAllRows: Data[] = [
  {
    salary_id: 1,
    staff_id: 1001,
    salary_amount: 45000.00,
    salary_account: 'บัญชี ก.',
    salary_detail: 'ขั้น 4 ระดับ 3',
    position_id_academic: 201,
    academic_allowance: 8000.00,
    position_id_management: 301,
    management_allowance: 401.00,
    effective_date: '2023-01-01',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1001
  },
  {
    salary_id: 2,
    staff_id: 1002,
    salary_amount: 65000.00,
    salary_account: 'บัญชี ข.',
    salary_detail: 'ขั้น 6 ระดับ 4',
    position_id_academic: 202,
    academic_allowance: 12000.00,
    position_id_management: 302,
    management_allowance: 402.00,
    effective_date: '2023-03-15',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1002
  },
  {
    salary_id: 3,
    staff_id: 1003,
    salary_amount: 75000.00,
    salary_account: 'บัญชี ค.',
    salary_detail: 'ขั้น 7 ระดับ 5',
    position_id_academic: 204,
    academic_allowance: 15000.00,
    position_id_management: 301,
    management_allowance: 403.00,
    effective_date: '2023-12-31',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1003
  },
  {
    salary_id: 4,
    staff_id: 1004,
    salary_amount: 58000.00,
    salary_account: 'บัญชี ง.',
    salary_detail: 'ขั้น 5 ระดับ 4',
    position_id_academic: 203,
    academic_allowance: 10000.00,
    position_id_management: 302,
    management_allowance: 404.00,
    effective_date: '2023-04-10',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1004
  },
  {
    salary_id: 5,
    staff_id: 1005,
    salary_amount: 32000.00,
    salary_account: 'บัญชี จ.',
    salary_detail: 'ขั้น 3 ระดับ 2',
    position_id_academic: 203,
    academic_allowance: 5000.00,
    position_id_management: 302,
    management_allowance: 401.00,
    effective_date: '2023-05-20',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1005
  },
  {
    salary_id: 6,
    staff_id: 1006,
    salary_amount: 85000.00,
    salary_account: 'บัญชี ฉ.',
    salary_detail: 'ขั้น 8 ระดับ 6',
    position_id_academic: 204,
    academic_allowance: 15000.00,
    position_id_management: 303,
    management_allowance: 402.00,
    effective_date: '2023-01-15',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1006
  },
  {
    salary_id: 7,
    staff_id: 1007,
    salary_amount: 90000.00,
    salary_account: 'บัญชี ช.',
    salary_detail: 'ขั้น 9 ระดับ 7',
    position_id_academic: 204,
    academic_allowance: 3500.00,
    position_id_management: 303,
    management_allowance: 403.00,
    effective_date: '2023-06-01',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1007
  },
  {
    salary_id: 8,
    staff_id: 1008,
    salary_amount: 38000.00,
    salary_account: 'บัญชี ซ.',
    salary_detail: 'ขั้น 4 ระดับ 2',
    position_id_academic: 205,
    academic_allowance: 5000.00,
    position_id_management: 305,
    management_allowance: 401.00,
    effective_date: '2023-07-15',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1008
  },
  {
    salary_id: 9,
    staff_id: 1009,
    salary_amount: 70000.00,
    salary_account: 'บัญชี ญ.',
    salary_detail: 'ขั้น 7 ระดับ 5',
    position_id_academic: 204,
    academic_allowance: 5000.00,
    position_id_management: 304,
    management_allowance: 401.00,
    effective_date: '2023-03-01',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1009
  },
  {
    salary_id: 10,
    staff_id: 1010,
    salary_amount: 50000.00,
    salary_account: 'บัญชี ฎ.',
    salary_detail: 'ขั้น 5 ระดับ 3',
    position_id_academic: 206,
    academic_allowance: 6000.00,
    position_id_management: 305,
    management_allowance: 402.00,
    effective_date: '2023-04-05',
    end_date: '2023-12-31',
    salary_date: '2023-12-31', // เพิ่ม
    salary_note: 'เงินเดือนปกติ ม.ค.', // เพิ่ม
    create_at: '2023-12-31', // เพิ่ม
    update_at: '2023-12-31', // เพิ่ม
    officer_id: 1010
  }
];


const TableCellWrapper = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  whiteSpace: 'nowrap',
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));

type TableItemProps = {
  data: Data;
  onView: (data: Data) => void;
};

const staffDetailForTableDisplay = [
  { staff_id: 1001, prefixname_id: 'นาย', first_name_th: 'สมชาย', last_name_th: 'วงศ์สวัสดิ์' },
  { staff_id: 1002, prefixname_id: 'นางสาว', first_name_th: 'สมหญิง', last_name_th: 'ศรีสุข' },
  { staff_id: 1003, prefixname_id: 'นาย', first_name_th: 'นายเทสดี', last_name_th: 'มีรวย' },
  { staff_id: 1004, prefixname_id: 'นางสาว', first_name_th: 'นงลักษณ์', last_name_th: 'แก้วมณี' },
  { staff_id: 1005, prefixname_id: 'นาย', first_name_th: 'สุเทพ', last_name_th: 'อินทร์พรหม' },
  { staff_id: 1006, prefixname_id: 'นาย', first_name_th: 'สุดใจ', last_name_th: 'อิ่มเอม' },
  { staff_id: 1007, prefixname_id: 'นาย', first_name_th: 'สุดสาคร', last_name_th: 'ใจดี' },
  { staff_id: 1008, prefixname_id: 'นางสาว', first_name_th: 'สีดา', last_name_th: 'สีใจ' },
  { staff_id: 1009, prefixname_id: 'นาย', first_name_th: 'กฤกนก', last_name_th: 'กกกนิส' },
  { staff_id: 1010, prefixname_id: 'นาย', first_name_th: 'สุกสา', last_name_th: 'สุพล' },
  { staff_id: 1011, prefixname_id: 'นางสาว', first_name_th: 'สมใจ', last_name_th: 'ใสจม' },
  { staff_id: 1012, prefixname_id: 'นางสาว', first_name_th: 'หฤทัย', last_name_th: 'ใจตรง' }
];

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  // ฟังก์ชันช่วยในการแสดงชื่อ Officer_id (ถ้ามี)
  const getOfficerName = (officerId: number | undefined) => {
    // นี่เป็นเพียงตัวอย่าง หาก officer_id อ้างอิงถึงบุคลากรใน staffDetailForTableDisplay
    // คุณอาจต้องมี list ของ officer_id ที่แตกต่างกัน
    const staff = staffDetailForTableDisplay.find(s => s.staff_id === officerId);
    return staff ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}` : officerId?.toString() || '-';
  };

  return (
    <TableRow hover key={data.salary_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.salary_id}
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? (
          <Skeleton width={150} />
        ) : (
          (() => {
            const staff = staffDetailForTableDisplay.find(s => s.staff_id === data.staff_id);
            return staff
              ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}`
              : `ไม่พบข้อมูลพนักงาน (ID: ${data.staff_id})`;
          })()
        )}
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={150} /> : data.salary_amount?.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })} <AttachMoneyIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.salary_account || '-'} <AccountBalanceWalletIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.salary_detail || '-'}
      </TableCellWrapper>
      {/* position_id_academic ถ้าต้องการแสดงในตารางให้ uncomment */}
      {/* <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.position_id_academic || '-'}
      </TableCellWrapper> */}
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={180} /> : data.academic_allowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '-'} <AttachMoneyIcon fontSize="small" />
      </TableCellWrapper>
      {/* position_id_management ถ้าต้องการแสดงในตารางให้ uncomment */}
      {/* <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.position_id_management || '-'}
      </TableCellWrapper> */}
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton width={180} /> : data.management_allowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '-'} <AttachMoneyIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.effective_date || '-'} <CalendarTodayIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.end_date || '-'} <CalendarTodayIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.salary_date || '-'} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : data.salary_note || '-'}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : getOfficerName(data.officer_id)} <PersonOutlineIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ?
          <Skeleton variant="circular" width={30} height={30} /> :
          <Button
            variant="outlined"
            size="small"
            onClick={() => onView(data)}
            startIcon={<VisibilityIcon />}
          >
            รายละเอียด
          </Button>
        }
      </TableCellWrapper>
    </TableRow>
  );
};

type Order = 'asc' | 'desc';

interface Column {
  id: keyof Data | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  if (aValue === null || aValue === undefined) return (bValue === null || bValue === undefined) ? 0 : 1;
  if (bValue === null || bValue === undefined) return -1;

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean | undefined | null },
  b: { [key in Key]: number | string | boolean | undefined | null },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
  data: Data[];
  onView: (data: Data) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('salary_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.04' });
    const words = label.split("SalaryInfo ");
    return words[1];
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'salary_id', label: 'รหัสเงินเดือน', minWidth: 80, sortable: true },
      { id: 'staff_id', label: 'รหัสบุคลากร', minWidth: 100, sortable: true },
      { id: 'salary_amount', label: 'เงินเดือน', minWidth: 120, sortable: true, align: 'right' },
      { id: 'salary_account', label: 'บัญชีเงินเดือน', minWidth: 150, sortable: true },
      { id: 'salary_detail', label: 'ขั้นเงินเดือน', minWidth: 150, sortable: true },
      // { id: 'position_id_academic', label: 'รหัสตำแหน่งวิชาการ', minWidth: 100, sortable: true, align: 'center' },
      { id: 'academic_allowance', label: 'เงินประจำตำแหน่งวิชาการ', minWidth: 180, sortable: true, align: 'right' },
      // { id: 'position_id_management', label: 'รหัสตำแหน่งบริหาร', minWidth: 100, sortable: true, align: 'center' },
      { id: 'management_allowance', label: 'เงินประจำตำแหน่งบริหาร', minWidth: 180, sortable: true, align: 'right' },
      { id: 'effective_date', label: 'วันที่เริ่มมีผล', minWidth: 120, sortable: true, align: 'center' },
      { id: 'end_date', label: 'วันที่สิ้นสุด', minWidth: 120, sortable: true, align: 'center' },
      { id: 'salary_date', label: 'วันที่จ่ายเงินเดือน', minWidth: 120, sortable: true, align: 'center' },
      { id: 'salary_note', label: 'หมายเหตุ', minWidth: 200, sortable: true },
      { id: 'officer_id', label: 'ผู้จัดการข้อมูล', minWidth: 120, sortable: true, align: 'center' },
      { id: 'actions', label: 'Actions', minWidth: 50, align: 'right', sortable: false },
    ],
    [labeltext]
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

  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredRows = useMemo(() => {
    let currentFilteredData = data;
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFilteredData = currentFilteredData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    if (selectedStaffId !== null) {
      currentFilteredData = currentFilteredData.filter(row => row.staff_id === selectedStaffId);
    }
    return currentFilteredData;
  }, [data, searchQuery, selectedStaffId]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppsHeader>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 1, }} >
          <AppSearchBar iconPosition="right" overlap={false} onChange={onSearchCustomer} placeholder="ค้นหา" />
        </Box>
      </AppsHeader>
      <TableContainer sx={{ maxHeight: 440 }}>
        <TableMui stickyHeader aria-label="sticky table">
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
            {stableSort(filteredRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem key={row.salary_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลเงินเดือนสำหรับบุคลากรคนนี้
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// Main SalaryInfo Component
interface SalaryInfoProps {
  selectedStaffIdProp: number | null;
}

const SalaryInfo: React.FC<SalaryInfoProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<Data | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: Data) => {
    // console.log("Data passed to onViewTask:", data); // สำหรับ Debugging
    // console.log("Salary amount in data:", data.salary_amount); // สำหรับ Debugging
    setCurrentViewTask(data);
    setOpenViewTask(true);
  };
  const onCloseViewTask = () => {
    setOpenViewTask(false);
    setCurrentViewTask(null);
  };

  // ฟังก์ชันช่วยในการแสดงชื่อ Officer_id ใน Dialog
  const getOfficerNameForDialog = (officerId: number | undefined) => {
    const staff = staffDetailForTableDisplay.find(s => s.staff_id === officerId);
    return staff ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}` : officerId?.toString() || '';
  };

  return (
    <AppCard>
      <DataTable data={initialAllRows} onView={onViewTask} selectedStaffId={selectedStaffIdProp} />

      <AppDialog
        maxWidth="lg"
        dividers
        open={openViewTask}
        onClose={onCloseViewTask}
        title={<IntlMessages id="common.salaryDetail" defaultMessage="รายละเอียดข้อมูลเงินเดือน" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.salary_id || ''}
            name="salary_id"
            disabled
          />
          <TextField
            fullWidth
            label="รหัสบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.staff_id || ''}
            name="staff_id"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={
              (() => {
                const staff = staffDetailForTableDisplay.find(s => s.staff_id === currentViewTask?.staff_id);
                return staff
                  ? `${staff.prefixname_id} ${staff.first_name_th} ${staff.last_name_th}`
                  : `ไม่พบข้อมูลพนักงาน (ID: ${currentViewTask?.staff_id})`;
              })()
            }
            name="staff_name"
            disabled
          />
          <TextField
            fullWidth
            label="จำนวนเงิน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.salary_amount?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || ''}
            name="salary_amount"
            inputProps={{ step: "0.01" }}
            disabled
          />
          <TextField
            fullWidth
            label="บัญชีเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.salary_account || ''}
            name="salary_account"
            disabled
          />
          <TextField
            fullWidth
            label="ขั้นเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.salary_detail || ''}
            name="salary_detail"
            disabled
          />
          {/* TextField สำหรับ position_id_academic ถ้าต้องการแสดงใน Dialog */}
          {/* <TextField
            fullWidth
            label="รหัสตำแหน่งวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.position_id_academic || ''}
            name="position_id_academic"
            disabled
          /> */}
          <TextField
            fullWidth
            label="เงินประจำตำแหน่งวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.academic_allowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || ''}
            name="academic_allowance"
            inputProps={{ step: "0.01" }}
            disabled
          />
          {/* TextField สำหรับ position_id_management ถ้าต้องการแสดงใน Dialog */}
          {/* <TextField
            fullWidth
            label="รหัสตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.position_id_management || ''}
            name="position_id_management"
            disabled
          /> */}
          <TextField
            fullWidth
            label="เงินประจำตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.management_allowance?.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || ''}
            name="management_allowance"
            inputProps={{ step: "0.01" }}
            disabled
          />
          <TextField
            fullWidth
            label="วันที่เริ่มมีผล"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.effective_date || ''}
            name="effective_date"
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="วันที่สิ้นสุด"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.end_date || ''}
            name="end_date"
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="วันที่จ่ายเงินเดือน"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.salary_date || ''}
            name="salary_date"
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="หมายเหตุ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.salary_note || ''}
            name="salary_note"
            disabled
          />
          <TextField
            fullWidth
            label="ผู้จัดการข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={getOfficerNameForDialog(currentViewTask?.officer_id)}
            name="officer_id"
            disabled
          />
          <TextField
            fullWidth
            label="วันที่สร้าง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.create_at || ''}
            name="create_at"
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="วันที่อัปเดต"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.update_at || ''}
            name="update_at"
            disabled
            InputLabelProps={{ shrink: true }}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseViewTask} color="secondary">
              ปิด
            </Button>
          </Box>
        </Box>
      </AppDialog>
    </AppCard>
  );
};

export default SalaryInfo;