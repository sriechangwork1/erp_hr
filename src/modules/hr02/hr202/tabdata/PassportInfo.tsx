//tabdata/PassportInfo.tsx
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
import { MdCalendarToday, MdPersonOutline, MdDescription, MdFileDownload } from "react-icons/md"; // เพิ่มไอคอนที่เกี่ยวข้อง
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data Interface for Passport Data
interface PassportData {
  passport_id: number;
  staff_id?: number;
  issue_date?: string;
  expiry_date?: string;
  document_file?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// Staff Detail for display (สามารถนำมาจากแหล่งข้อมูลกลางได้ในอนาคต)
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

// Mock Data for Passport Information
const initialAllRows: PassportData[] = [
  {
    passport_id: 1, staff_id: 1001, issue_date: '2022-01-15', expiry_date: '2027-01-14', document_file: '/documents/passports/101_passport.pdf', create_at: '2022-01-20', update_at: '2023-05-10', officer_id: 1001
  },
  {
    passport_id: 2, staff_id: 1002, issue_date: '2021-11-10', expiry_date: '2026-11-09', document_file: '/documents/passports/102_passport.pdf', create_at: '2021-11-15', update_at: '2023-04-05', officer_id: 1002
  },
  {
    passport_id: 3, staff_id: 1003, issue_date: '2023-03-01', expiry_date: '2028-02-28', document_file: '/documents/passports/103_passport.pdf', create_at: '2023-03-05', update_at: '2023-06-15', officer_id: 1003
  },
  {
    passport_id: 4, staff_id: 1004, issue_date: '2020-08-20', expiry_date: '2025-08-19', document_file: '/documents/passports/104_passport.pdf', create_at: '2020-08-25', update_at: '2023-01-30', officer_id: 1004
  },
  {
    passport_id: 5, staff_id: 1005, issue_date: '2021-05-12', expiry_date: '2026-05-11', document_file: '/documents/passports/105_passport.pdf', create_at: '2021-05-18', update_at: '2023-03-22', officer_id: 1005
  },
  {
    passport_id: 6, staff_id: 1006, issue_date: '2022-09-05', expiry_date: '2027-09-04', document_file: '/documents/passports/106_passport.pdf', create_at: '2022-09-10', update_at: '2023-04-18', officer_id: 1006
  },
  {
    passport_id: 7, staff_id: 1007, issue_date: '2023-01-30', expiry_date: '2028-01-29', document_file: '/documents/passports/107_passport.pdf', create_at: '2023-02-05', update_at: '2023-06-20', officer_id: 1007
  },
  {
    passport_id: 8, staff_id: 1008, issue_date: '2020-12-15', expiry_date: '2025-12-14', document_file: '/documents/passports/108_passport.pdf', create_at: '2020-12-20', update_at: '2023-02-15', officer_id: 1008
  },
  {
    passport_id: 9, staff_id: 1009, issue_date: '2021-07-22', expiry_date: '2026-07-21', document_file: '/documents/passports/109_passport.pdf', create_at: '2021-07-28', update_at: '2023-05-30', officer_id: 1009
  },
  {
    passport_id: 10, staff_id: 1010, issue_date: '2022-04-10', expiry_date: '2027-04-09', document_file: '/documents/passports/110_passport.pdf', create_at: '2022-04-15', update_at: '2023-06-10', officer_id: 1010
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
  data: PassportData;
  onView: (data: PassportData) => void;
};

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.passport_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.passport_id}
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
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.issue_date} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.expiry_date} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : (
          data.document_file ? (
            <a href={data.document_file} target="_blank" rel="noopener noreferrer">
              ดูเอกสาร <MdDescription />
            </a>
          ) : 'ไม่มีเอกสาร'
        )}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.officer_id} <MdPersonOutline />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? <Skeleton variant="circular" width={30} height={30} /> :
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
  id: keyof PassportData | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean | undefined },
  b: { [key in Key]: number | string | boolean | undefined },
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
  data: PassportData[];
  onView: (data: PassportData) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof PassportData>('passport_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.06' }); // สมมติว่ามี ID สำหรับเมนูนี้ (อ้างอิงจาก Passport Information)
    return label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'passport_id', label: 'รหัสหนังสือเดินทาง', minWidth: 100, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'issue_date', label: 'วันที่ออก', minWidth: 120, sortable: true },
      { id: 'expiry_date', label: 'วันหมดอายุ', minWidth: 120, sortable: true },
      { id: 'document_file', label: 'ไฟล์เอกสาร', minWidth: 200, sortable: false },
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 80, sortable: true },
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
    property: keyof PassportData,
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
    // Filter by searchQuery
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFilteredData = currentFilteredData.filter((row) => {
        // Search in passport_id, issue_date, expiry_date, officer_id
        const rowMatches =
          String(row.passport_id).toLowerCase().includes(lowerCaseQuery) ||
          (row.issue_date && String(row.issue_date).toLowerCase().includes(lowerCaseQuery)) ||
          (row.expiry_date && String(row.expiry_date).toLowerCase().includes(lowerCaseQuery)) ||
          (row.officer_id && String(row.officer_id).toLowerCase().includes(lowerCaseQuery));

        // Search in staffDetailForTableDisplay (prefixname_id, first_name_th, last_name_th)
        const staff = staffDetailForTableDisplay.find(s => s.staff_id === row.staff_id);
        const staffMatches = staff
          ? (staff.prefixname_id && String(staff.prefixname_id).toLowerCase().includes(lowerCaseQuery)) ||
            (staff.first_name_th && String(staff.first_name_th).toLowerCase().includes(lowerCaseQuery)) ||
            (staff.last_name_th && String(staff.last_name_th).toLowerCase().includes(lowerCaseQuery))
          : false;

        return rowMatches || staffMatches;
      });
    }

    // Filter by selectedStaffId
    if (selectedStaffId !== null) {
      currentFilteredData = currentFilteredData.filter(row => row.staff_id === selectedStaffId);
    }

    return stableSort(currentFilteredData, getComparator(order, orderBy));
  }, [data, searchQuery, selectedStaffId, order, orderBy]);

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
                      onClick={(event) => handleRequestSort(event, column.id as keyof PassportData)}
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
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem key={row.passport_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลหนังสือเดินทางสำหรับบุคลากรคนนี้
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

// Main PassportInfo Component
interface PassportInfoProps {
  selectedStaffIdProp: number | null;
}

const PassportInfo: React.FC<PassportInfoProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<PassportData | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: PassportData) => {
    setCurrentViewTask(data);
    setOpenViewTask(true);
  };
  const onCloseViewTask = () => {
    setOpenViewTask(false);
    setCurrentViewTask(null);
  };

  return (
    <AppCard>
      <DataTable data={initialAllRows} onView={onViewTask} selectedStaffId={selectedStaffIdProp} />

      <AppDialog
        maxWidth="lg"
        dividers
        open={openViewTask}
        onClose={onCloseViewTask}
        title={<IntlMessages id="common.passportDetail" defaultMessage="รายละเอียดข้อมูลหนังสือเดินทาง" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสหนังสือเดินทาง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.passport_id || ''}
            name="passport_id"
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
            label="วันที่ออก"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.issue_date || ''}
            name="issue_date"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันหมดอายุ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.expiry_date || ''}
            name="expiry_date"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="ไฟล์เอกสาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.document_file || ''}
            name="document_file"
            disabled
            InputProps={{
              endAdornment: currentViewTask?.document_file ? (
                <a href={currentViewTask.document_file} target="_blank" rel="noopener noreferrer">
                  <MdFileDownload />
                </a>
              ) : null,
            }}
          />
          <TextField
            fullWidth
            label="ผู้บันทึกข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.officer_id || ''}
            name="officer_id"
            disabled
          />
           <TextField
            fullWidth
            label="สร้างเมื่อ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.create_at || ''}
            name="create_at"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
           <TextField
            fullWidth
            label="อัปเดตเมื่อ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.update_at || ''}
            name="update_at"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
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

export default PassportInfo;