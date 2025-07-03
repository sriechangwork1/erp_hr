// tabdata/WorkHistory.tsx
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import AppCard from '@crema/components/AppCard';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
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
import { MdCalendarMonth, MdOutlinePersonalInjury } from "react-icons/md";
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Data Interface
interface Data {
  work_history_id: number;
  staff_id?: number;
  manpower_framework_id?: number;
  academic_position_id?: number;
  support_position_id?: number;
  management_position_id?: number;
  appointment_number?: string;
  appointment_date?: string;
  document_file?: string;
  work_status?: string;
  contract_number?: string;
  contract_start_date?: string;
  contract_end_date?: string;
  appointment_date_in?: string;
  start_work_date?: string;
  transfer_date?: string;
  retirement_date?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString === '1900-01-01') return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Mock Data for Work History
const initialAllRows: Data[] = [
  {
    work_history_id: 1,
    staff_id: 1001,
    manpower_framework_id: 1001,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ123/2565',
    appointment_date: '2022-05-15',
    document_file: '/docs/appointments/101_2022.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข001',
    contract_start_date: '2022-05-16',
    contract_end_date: '2025-05-15',
    appointment_date_in: '2022-05-16',
    start_work_date: '2022-06-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2022-05-16',
    update_at: '2023-01-15',
    officer_id: 1001
  },
  {
    work_history_id: 2,
    staff_id: 1002,
    manpower_framework_id: 1002,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ124/2564',
    appointment_date: '2021-03-20',
    document_file: '/docs/appointments/102_2021.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข002',
    contract_start_date: '2021-03-21',
    contract_end_date: '2024-03-20',
    appointment_date_in: '2021-03-21',
    start_work_date: '2021-04-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2021-03-21',
    update_at: '2023-02-10',
    officer_id: 1002
  },
  {
    work_history_id: 3,
    staff_id: 1003,
    manpower_framework_id: 1003,
    academic_position_id: 201,
    support_position_id: 301,
    management_position_id: 401,
    appointment_number: 'กพ125/2563',
    appointment_date: '2020-11-10',
    document_file: '/docs/appointments/103_2020.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข000',
    contract_start_date: '2020-11-11',
    contract_end_date: '2023-11-10',
    appointment_date_in: '2020-11-11',
    start_work_date: '2020-12-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2020-11-11',
    update_at: '2023-03-05',
    officer_id: 1003
  },
  {
    work_history_id: 4,
    staff_id: 1004,
    manpower_framework_id: 1004,
    academic_position_id: 202,
    support_position_id: 301,
    management_position_id: 402,
    appointment_number: 'กพ126/2562',
    appointment_date: '2019-08-05',
    document_file: '/docs/appointments/104_2019.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข003',
    contract_start_date: '2019-08-06',
    contract_end_date: '2022-08-05',
    appointment_date_in: '2019-08-06',
    start_work_date: '2019-09-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2019-08-06',
    update_at: '2023-01-20',
    officer_id: 1004
  },
  {
    work_history_id: 5,
    staff_id: 1005,
    manpower_framework_id: 1005,
    academic_position_id: 0,
    support_position_id: 302,
    management_position_id: 0,
    appointment_number: 'กพ127/2561',
    appointment_date: '2018-10-15',
    document_file: '/docs/appointments/105_2018.pdf',
    work_status: 'หมดสัญญาจ้าง',
    contract_number: 'สข004',
    contract_start_date: '2018-10-16',
    contract_end_date: '2021-10-15',
    appointment_date_in: '2018-10-16',
    start_work_date: '2018-11-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2021-10-15',
    create_at: '2018-10-16',
    update_at: '2021-10-16',
    officer_id: 1005
  },
  {
    work_history_id: 6,
    staff_id: 1006,
    manpower_framework_id: 1006,
    academic_position_id: 203,
    support_position_id: 302,
    management_position_id: 403,
    appointment_number: 'กพ128/2555',
    appointment_date: '2012-07-01',
    document_file: '/docs/appointments/106_2012.pdf',
    work_status: 'เกษียณ',
    contract_number: 'สข000',
    contract_start_date: '2012-07-02',
    contract_end_date: '2022-09-30',
    appointment_date_in: '2012-07-02',
    start_work_date: '2012-08-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2022-09-30',
    create_at: '2012-07-02',
    update_at: '2022-10-01',
    officer_id: 1006
  },
  {
    work_history_id: 7,
    staff_id: 1007,
    manpower_framework_id: 1007,
    academic_position_id: 203,
    support_position_id: 301,
    management_position_id: 402,
    appointment_number: 'กพ129/2560',
    appointment_date: '2017-04-10',
    document_file: '/docs/appointments/107_2017.pdf',
    work_status: 'ลาออก',
    contract_number: 'สข005',
    contract_start_date: '2017-04-11',
    contract_end_date: '2020-04-10',
    appointment_date_in: '2017-04-11',
    start_work_date: '2017-05-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: '2019-12-31',
    create_at: '2017-04-11',
    update_at: '2020-01-05',
    officer_id: 1007
  },
  {
    work_history_id: 8,
    staff_id: 1008,
    manpower_framework_id: 1008,
    academic_position_id: 203,
    support_position_id: 303,
    management_position_id: 403,
    appointment_number: 'กพ130/2563',
    appointment_date: '2020-09-25',
    document_file: '/docs/appointments/108_2020.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข000',
    contract_start_date: '2020-09-26',
    contract_end_date: '2023-09-25',
    appointment_date_in: '2020-09-26',
    start_work_date: '2020-10-01',
    transfer_date: '2020-09-26',
    retirement_date: formatDate('1900-01-01'),
    create_at: '2020-09-26',
    update_at: '2023-02-15',
    officer_id: 1008
  },
  {
    work_history_id: 9,
    staff_id: 1009,
    manpower_framework_id: 1009,
    academic_position_id: 204,
    support_position_id: 0,
    management_position_id: 0,
    appointment_number: 'กพ131/2564',
    appointment_date: '2021-06-15',
    document_file: '/docs/appointments/109_2021.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข006',
    contract_start_date: '2021-06-16',
    contract_end_date: '2022-06-15',
    appointment_date_in: '2021-06-16',
    start_work_date: '2021-07-01',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2021-06-16',
    update_at: '2023-01-10',
    officer_id: 1009
  },
  {
    work_history_id: 10,
    staff_id: 1010,
    manpower_framework_id: 1010,
    academic_position_id: 202,
    support_position_id: 304,
    management_position_id: 401,
    appointment_number: 'กพ132/2565',
    appointment_date: '2022-02-28',
    document_file: '/docs/appointments/110_2022.pdf',
    work_status: 'ปกติ',
    contract_number: 'สข007',
    contract_start_date: '2022-03-01',
    contract_end_date: '2023-02-28',
    appointment_date_in: '2022-03-01',
    start_work_date: '2022-03-15',
    transfer_date: formatDate('1900-01-01'),
    retirement_date: formatDate('1900-01-01'),
    create_at: '2022-03-01',
    update_at: '2023-03-01',
    officer_id: 1010
  }
];

// Mock Staff Detail (สำหรับแสดงผลในตาราง)
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


// --- Sub-component: TableCellWrapper (สำหรับจัดรูปแบบ Cell ในตาราง) ---
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

// --- Sub-component: TableItem (สำหรับแสดงแต่ละแถวในตาราง) ---
type TableItemProps = {
  data: Data;
  onView: (data: Data) => void;
  onEdit: (data: Data) => void;
  onDelete: (id: number) => void;
};

const TableItem = ({ data, onView, onEdit, onDelete }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.work_history_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.work_history_id}
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
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.appointment_number} <WorkIcon fontSize="small" />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.appointment_date} <MdCalendarMonth />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={100} /> : data.work_status}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={80} /> : data.officer_id} <MdOutlinePersonalInjury />
      </TableCellWrapper>
      <TableCellWrapper align="right">
        {isLoading ? (
          <Skeleton variant="circular" width={30} height={30} />
        ) : (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={() => onView(data)}
              startIcon={<VisibilityIcon />}
              sx={{ minWidth: 'auto', padding: '4px 8px' }}
            >
              รายละเอียด
            </Button>
          </Box>
        )}
      </TableCellWrapper>
    </TableRow>
  );
};

// --- Sub-component: DataTable (สำหรับแสดงตารางข้อมูลทั้งหมด) ---
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
  if (b[orderBy] === undefined || b[orderBy] === null) return -1;
  if (a[orderBy] === undefined || a[orderBy] === null) return 1;
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

type InternalDataTableProps = {
  data: Data[];
  onView: (data: Data) => void;
  onEdit: (data: Data) => void;
  onDelete: (id: number) => void;
  selectedStaffId: number | null; // เพิ่ม prop นี้สำหรับการกรอง
};

const InternalDataTable = ({ data, onView, onEdit, onDelete, selectedStaffId }: InternalDataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('work_history_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
 

  const columns: readonly Column[] = useMemo(() => [
    { id: 'work_history_id', label: 'รหัสประวัติ', minWidth: 80, sortable: true },
    { id: 'staff_id', label: 'รหัสบุคลากร', minWidth: 120, sortable: true },
    { id: 'appointment_number', label: 'เลขที่คำสั่งแต่งตั้ง', minWidth: 150, sortable: true },
    { id: 'appointment_date', label: 'วันที่แต่งตั้ง', minWidth: 120, align: 'center', sortable: true },
    { id: 'work_status', label: 'สถานะการทำงาน', minWidth: 120, align: 'left', sortable: true },
    { id: 'officer_id', label: 'ผู้บันทึกข้อมูล', minWidth: 120, align: 'center', sortable: true },
    { id: 'actions', label: 'ดำเนินการ', minWidth: 170, align: 'center', sortable: false },
  ], []);

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

  const filteredData = useMemo(() => {
    let currentFilteredData = data;
    // Filter by searchQuery
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFilteredData = currentFilteredData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
    // Filter by selectedStaffId
    if (selectedStaffId !== null) {
      currentFilteredData = currentFilteredData.filter(row => row.staff_id === selectedStaffId);
    }
    return currentFilteredData;
  }, [data, searchQuery, selectedStaffId]);

  const sortedData = useMemo(() => {
    return stableSort(filteredData, getComparator(order, orderBy));
  }, [filteredData, order, orderBy]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppsHeader>
        <AppSearchBar
          iconPosition="right"
          placeholder={intl.formatMessage({ id: 'common.search' }) as string}
          onChange={onSearchCustomer}
          value={searchQuery}
        />
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
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem
                  key={row.work_history_id}
                  data={row}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            {sortedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลประวัติการทำงานสำหรับบุคลากรคนนี้
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableMui>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"จำนวนแถวต่อหน้า:"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
        }
      />
    </Paper>
  );
};


// --- Main WorkHistory Component ---
interface WorkHistoryProps {
  selectedStaffIdProp: number | null;
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ selectedStaffIdProp }) => {
  const [isAddTaskOpen, setAddTaskOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<Data | null>(null);
  const [tableData, setTableData] = useState<Data[]>(initialAllRows);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const intl = useIntl();
 

  const dialogTitle = useMemo(() => {
    if (dialogMode === 'add') return "เพิ่มข้อมูล";
    if (dialogMode === 'edit') return "แก้ไขข้อมูล";
    if (dialogMode === 'view') return "รายละเอียด";
    return "";
  }, [dialogMode]);

  const onOpenAddTask = () => {
    setDialogMode('add');
    setCurrentData({
      work_history_id: 0,
      staff_id: undefined,
      manpower_framework_id: undefined,
      academic_position_id: undefined,
      support_position_id: undefined,
      management_position_id: undefined,
      appointment_number: '',
      appointment_date: '',
      document_file: '',
      work_status: '',
      contract_number: '',
      contract_start_date: '',
      contract_end_date: '',
      appointment_date_in: '',
      start_work_date: '',
      transfer_date: formatDate('1900-01-01'),
      retirement_date: formatDate('1900-01-01'),
      create_at: new Date().toISOString().split('T')[0],
      update_at: new Date().toISOString().split('T')[0],
      officer_id: undefined,
    });
    setAddTaskOpen(true);
    setErrors({});
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
    setCurrentData(null);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentData(prevData => {
      const newData = { ...prevData! };
      if (['staff_id', 'manpower_framework_id', 'academic_position_id', 'support_position_id', 'management_position_id', 'officer_id'].includes(name)) {
        newData[name] = value ? Number(value) : undefined;
      } else if (['appointment_date', 'contract_start_date', 'contract_end_date', 'appointment_date_in', 'start_work_date', 'transfer_date', 'retirement_date', 'create_at', 'update_at'].includes(name)) {
        newData[name] = value;
      }
      else {
        newData[name] = value;
      }
      return newData;
    });
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };


  const handleViewData = (data: Data) => {
    setDialogMode('view');
    setCurrentData(data);
    setErrors({});
    setAddTaskOpen(true);
  };

 

 
  return (
    <AppCard
      contentStyle={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 8 }} 
    >
      <InternalDataTable
        data={tableData}
        onView={handleViewData}
        selectedStaffId={selectedStaffIdProp}
        onEdit={()=>{}}
        onDelete={()=>{}}
      />

      <AppDialog
        dividers
        maxWidth="md"
        open={isAddTaskOpen}
        onClose={onCloseAddTask}
        title={dialogTitle}
      >
        <Box>
          <TextField
            label="รหัสประวัติการทำงาน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_history_id || ''}
            name="work_history_id"
            onChange={handleInputChange}
            disabled={true} // ID ควรจะ disabled เสมอในการเพิ่ม/แก้ไข
          />
          <TextField
            fullWidth
            label="รหัสบุคลากร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.staff_id || ''}
            name="staff_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.staff_id}
            helperText={errors.staff_id}
          />
          <TextField
            fullWidth
            label="รหัสกรอบอัตรากำลังคน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.manpower_framework_id || ''}
            name="manpower_framework_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งทางวิชาการ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.academic_position_id || ''}
            name="academic_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งสนับสนุน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.support_position_id || ''}
            name="support_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="รหัสตำแหน่งบริหาร"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.management_position_id || ''}
            name="management_position_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="เลขที่คำสั่งแต่งตั้ง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.appointment_number || ''}
            name="appointment_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.appointment_number}
            helperText={errors.appointment_number}
          />
          <TextField
            fullWidth
            label="วันที่แต่งตั้ง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.appointment_date || ''}
            name="appointment_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
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
            value={currentData?.document_file || ''}
            name="document_file"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="สถานะการทำงาน"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.work_status || ''}
            name="work_status"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.work_status}
            helperText={errors.work_status}
          />
          <TextField
            fullWidth
            label="เลขที่สัญญาจ้าง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.contract_number || ''}
            name="contract_number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
          />
          <TextField
            fullWidth
            label="วันที่เริ่มสัญญาจ้าง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.contract_start_date || ''}
            name="contract_start_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่สิ้นสุดสัญญาจ้าง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.contract_end_date || ''}
            name="contract_end_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่เข้าทำงานตามคำสั่ง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.appointment_date_in || ''}
            name="appointment_date_in"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่เริ่มงานจริง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.start_work_date || ''}
            name="start_work_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่โอน"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.transfer_date || ''}
            name="transfer_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="วันที่เกษียณ"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentData?.retirement_date || ''}
            name="retirement_date"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="ผู้บันทึกข้อมูล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentData?.officer_id || ''}
            name="officer_id"
            type="number"
            onChange={handleInputChange}
            disabled={dialogMode === 'view'}
            error={!!errors.officer_id}
            helperText={errors.officer_id}
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onCloseAddTask} color="secondary">
              {dialogMode === 'view' ? 'ปิด' : 'ยกเลิก'}
            </Button>
 
          </Box>
        </Box>
      </AppDialog>
    </AppCard>
  );
};

export default WorkHistory;