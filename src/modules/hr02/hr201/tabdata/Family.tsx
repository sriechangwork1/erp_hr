//tabdata/Family.tsx
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
import { MdCalendarToday, MdPersonOutline, MdHome, MdPhone } from "react-icons/md"; // เพิ่มไอคอนที่เกี่ยวข้อง
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data Interface for Family History
interface FamilyData {
  family_id: number;
  staff_id?: number;
  relationship?: string;
  full_name?: string;
  date_of_birth?: string;
  occupation?: string;
  fam_tel?: string;
  fam_address?: string;
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

// Mock Data for Family History (จาก me code4.txt)
const initialAllRows: FamilyData[] = [
  {
    family_id: 1, staff_id: 1001, relationship: 'บิดา', full_name: 'สมชาย ดีมาก', date_of_birth: '1950-06-15', occupation: 'รับราชการเกษียณ', fam_tel: '0811111111', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 2, staff_id: 1001, relationship: 'มารดา', full_name: 'สมหญิง ดีมาก', date_of_birth: '1955-08-20', occupation: 'แม่บ้าน', fam_tel: '0822222222', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 3, staff_id: 1001, relationship: 'คู่สมรส', full_name: 'สุนิสา ดีมาก', date_of_birth: '1980-03-25', occupation: 'ครู', fam_tel: '0833333333', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 4, staff_id: 1001, relationship: 'บุตร', full_name: 'เด็กชายดีมาก ดีมาก', date_of_birth: '2010-11-05', occupation: 'นักเรียน', fam_tel: '0800000000', fam_address: '123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110', create_at: '2020-01-10', update_at: '2023-05-20', officer_id: 1001
  },
  {
    family_id: 5, staff_id: 1002, relationship: 'บิดา', full_name: 'ประเสริฐ ศรีสุข', date_of_birth: '1948-12-10', occupation: 'ธุรกิจส่วนตัว', fam_tel: '0844444444', fam_address: '456/7 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330', create_at: '2019-05-15', update_at: '2023-04-18', officer_id: 1002
  },
  {
    family_id: 6, staff_id: 1002, relationship: 'คู่สมรส', full_name: 'เพชรา ศรีสุข', date_of_birth: '1982-07-30', occupation: 'แพทย์', fam_tel: '0855555555', fam_address: '456/7 ถนนราชดำริ แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330', create_at: '2019-05-15', update_at: '2023-04-18', officer_id: 1002
  },
  {
    family_id: 7, staff_id: 1003, relationship: 'ผู้ติดต่อกรณีฉุกเฉิน', full_name: 'นพดล รักเพื่อน', date_of_birth: '1975-09-12', occupation: 'วิศวกร', fam_tel: '0866666666', fam_address: '789/8 ถนนสีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500', create_at: '2021-02-20', update_at: '2023-06-10', officer_id: 1003
  },
  {
    family_id: 8, staff_id: 1004, relationship: 'มารดา', full_name: 'วรรณา จิตดี', date_of_birth: '1952-04-18', occupation: 'แม่บ้าน', fam_tel: '0877777777', fam_address: '321/9 ถนนพระราม 4 แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500', create_at: '2018-11-05', update_at: '2023-03-15', officer_id: 1004
  },
  {
    family_id: 9, staff_id: 1005, relationship: 'คู่สมรส', full_name: 'วิไลลักษณ์ ใจกล้า', date_of_birth: '1985-01-22', occupation: 'นักบัญชี', fam_tel: '0888888888', fam_address: '555/10 ถนนเพชรบุรี แขวงถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400', create_at: '2020-07-30', update_at: '2023-05-05', officer_id: 1005
  },
  {
    family_id: 10, staff_id: 1006, relationship: 'บุตร', full_name: 'เด็กหญิงน้ำทิพย์ เก่งมาก', date_of_birth: '2015-08-08', occupation: 'นักเรียน', fam_tel: '0899999999', fam_address: '999/11 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400', create_at: '2022-03-12', update_at: '2023-04-20', officer_id: 1006
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
  data: FamilyData;
  onView: (data: FamilyData) => void;
};

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.family_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.family_id}
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
        {isLoading ? <Skeleton width={200} /> : data.relationship} <MdPersonOutline />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={200} /> : data.full_name}
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={120} /> : data.date_of_birth} <MdCalendarToday />
      </TableCellWrapper>
      <TableCellWrapper align="left">
        {isLoading ? <Skeleton width={150} /> : data.occupation}
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
  id: keyof FamilyData | 'actions';
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
  data: FamilyData[];
  onView: (data: FamilyData) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof FamilyData>('family_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.05' }); // สมมติว่ามี ID สำหรับเมนูนี้ (อ้างอิงจาก Family History)
    return label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'family_id', label: 'รหัสสมาชิกครอบครัว', minWidth: 100, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'relationship', label: 'ความสัมพันธ์', minWidth: 150, sortable: true },
      { id: 'full_name', label: 'ชื่อ-นามสกุล', minWidth: 200, sortable: true },
      { id: 'date_of_birth', label: 'วันเกิด', minWidth: 120, sortable: true },
      { id: 'occupation', label: 'อาชีพ', minWidth: 150, sortable: true },
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
    property: keyof FamilyData,
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
        // Search in family_id, relationship, full_name, occupation, fam_tel, fam_address, date_of_birth, officer_id
        const rowMatches =
          String(row.family_id).toLowerCase().includes(lowerCaseQuery) ||
          (row.relationship && String(row.relationship).toLowerCase().includes(lowerCaseQuery)) ||
          (row.full_name && String(row.full_name).toLowerCase().includes(lowerCaseQuery)) ||
          (row.occupation && String(row.occupation).toLowerCase().includes(lowerCaseQuery)) ||
          (row.fam_tel && String(row.fam_tel).toLowerCase().includes(lowerCaseQuery)) ||
          (row.fam_address && String(row.fam_address).toLowerCase().includes(lowerCaseQuery)) ||
          (row.date_of_birth && String(row.date_of_birth).toLowerCase().includes(lowerCaseQuery)) ||
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof FamilyData)}
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
                <TableItem key={row.family_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลสมาชิกครอบครัวสำหรับบุคลากรคนนี้
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

// Main Family Component
interface FamilyProps {
  selectedStaffIdProp: number | null;
}

const Family: React.FC<FamilyProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<FamilyData | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: FamilyData) => {
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
        title={<IntlMessages id="common.familyDetail" defaultMessage="รายละเอียดข้อมูลสมาชิกครอบครัว" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสสมาชิกครอบครัว"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.family_id || ''}
            name="family_id"
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
            label="ความสัมพันธ์"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.relationship || ''}
            name="relationship"
            disabled
          />
          <TextField
            fullWidth
            label="ชื่อ-นามสกุล"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.full_name || ''}
            name="full_name"
            disabled
          />
          <TextField
            fullWidth
            label="วันเกิด"
            variant="outlined"
            margin="normal"
            size="small"
            type="date"
            value={currentViewTask?.date_of_birth || ''}
            name="date_of_birth"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="อาชีพ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.occupation || ''}
            name="occupation"
            disabled
          />
          <TextField
            fullWidth
            label="เบอร์โทรศัพท์"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.fam_tel || ''}
            name="fam_tel"
            disabled
          />
          <TextField
            fullWidth
            label="ที่อยู่"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.fam_address || ''}
            name="fam_address"
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

export default Family;

