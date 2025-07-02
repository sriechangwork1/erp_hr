//tabdata/NameChangeHistory.tsx
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
import { MdCalendarToday, MdPersonOutline, MdDriveFileRenameOutline } from "react-icons/md";
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data Interface for Name Change History
interface Data {
  name_change_id: number;
  staff_id?: number;
  previous_name?: string;
  change_date?: string;
  create_at?: string;
  update_at?: string;
  officer_id?: number;
  [key: string]: any;
}

// Staff Detail for display (สามารถนำมาจากแหล่งข้อมูลกลางได้ในอนาคต)
// ข้อมูลนี้ควรเป็นข้อมูลเดียวกันกับที่ใช้ใน EducationReference.tsx เพื่อความสอดคล้องกัน
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

// Mock Data for Name Change History (จาก me code2.txt)
const initialAllRows: Data[] = [
  {
    name_change_id: 1,
    staff_id: 1001,
    previous_name: 'สมหญิง ใจดี',
    change_date: '2020-05-15',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1001
  },
  {
    name_change_id: 2,
    staff_id: 1002,
    previous_name: 'ประเสริฐ สุขศรี',
    change_date: '2019-11-20',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1002
  },
  {
    name_change_id: 3,
    staff_id: 1003,
    previous_name: 'ทวีป มังกรทอง',
    change_date: '2021-02-28',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1003
  },
  {
    name_change_id: 4,
    staff_id: 1004,
    previous_name: 'อรุณี ชัยวัฒน์',
    change_date: '2018-08-10',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1004
  },
  {
    name_change_id: 5,
    staff_id: 1005,
    previous_name: 'สมศักดิ์ แก้วประเสริฐ',
    change_date: '2022-01-05',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1005
  },
  {
    name_change_id: 6,
    staff_id: 1006,
    previous_name: 'บุญเลิศ เกียรติก้อง',
    change_date: '2020-07-22',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1006
  },
  {
    name_change_id: 7,
    staff_id: 1007,
    previous_name: 'สมหมาย วัฒนานนท์',
    change_date: '2021-09-30',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1007
  },
  {
    name_change_id: 8,
    staff_id: 1008,
    previous_name: 'เพชรา รุ่งเรือง',
    change_date: '2019-04-18',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1008
  },
  {
    name_change_id: 9,
    staff_id: 1009,
    previous_name: 'เกียรติศักดิ์ มหาชัย',
    change_date: '2022-03-12',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1009
  },
  {
    name_change_id: 10,
    staff_id: 1010,
    previous_name: 'สุธีร์ สุขใจ',
    change_date: '2021-12-01',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1010
  },
  {
    name_change_id: 11,
    staff_id: 1011,
    previous_name: 'วรรณา ศรีสมร',
    change_date: '2020-10-25',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1011
  },
  {
    name_change_id: 12,
    staff_id: 1012,
    previous_name: 'ศิริลักษณ์ จันทราวดี',
    change_date: '2022-06-15',
    create_at: '2025-05-26',
    update_at: '2025-05-26',
    officer_id: 1012
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

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.name_change_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.name_change_id}
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
        {isLoading ? <Skeleton width={200} /> : data.previous_name} <MdDriveFileRenameOutline />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.change_date} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.officer_id} <MdPersonOutline />
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
  data: Data[];
  onView: (data: Data) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name_change_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.04' }); // สมมติว่ามี ID สำหรับเมนูนี้
    return label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'name_change_id', label: 'รหัสการเปลี่ยนแปลง', minWidth: 100, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'previous_name', label: 'ชื่อเดิม', minWidth: 200, sortable: true },
      { id: 'change_date', label: 'วันที่เปลี่ยนแปลง', minWidth: 120, sortable: true },
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
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableItem key={row.name_change_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลการเปลี่ยนแปลงชื่อบุคลากรสำหรับบุคลากรคนนี้
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

// Main NameChangeHistory Component
interface NameChangeHistoryProps {
  selectedStaffIdProp: number | null;
}

const NameChangeHistory: React.FC<NameChangeHistoryProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<Data | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: Data) => {
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
        title={<IntlMessages id="common.nameChangeDetail" defaultMessage="รายละเอียดข้อมูลการเปลี่ยนแปลงชื่อ" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสการเปลี่ยนแปลง"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.name_change_id || ''}
            name="name_change_id"
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
            label="ชื่อเดิม"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.previous_name || ''}
            name="previous_name"
            disabled
          />
          <TextField
            fullWidth
            label="วันที่เปลี่ยนแปลง"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.change_date || ''}
            name="change_date"
            disabled
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

export default NameChangeHistory;