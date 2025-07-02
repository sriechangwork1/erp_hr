//tabdata/SupportExpertise.tsx
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
import { MdSchool, MdPersonOutline, MdDescription } from "react-icons/md"; // ไอคอนสำหรับความเชี่ยวชาญ
import VisibilityIcon from '@mui/icons-material/Visibility';

// Data Interface for Support Expertise Data
interface SupportExpertiseData {
  expertise_id: number;
  staff_id?: number;
  expertise_name?: string;
  isced_code?: string;
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
  { staff_id: 501, prefixname_id: 'นาย', first_name_th: 'ผู้บันทึก', last_name_th: 'หนึ่ง' },
  { staff_id: 502, prefixname_id: 'นาง', first_name_th: 'ผู้บันทึก', last_name_th: 'สอง' },
  { staff_id: 503, prefixname_id: 'นางสาว', first_name_th: 'ผู้บันทึก', last_name_th: 'สาม' },
];

// Mock Data for Support Expertise Information
const initialAllRows: SupportExpertiseData[] = [
  { expertise_id: 1, staff_id: 1001, expertise_name: 'การจัดการระบบเครือข่ายคอมพิวเตอร์', isced_code: '0613', create_at: '2023-01-10', update_at: '2023-06-15', officer_id: 501 },
  { expertise_id: 2, staff_id: 1002, expertise_name: 'การบัญชีและการเงินองค์กร', isced_code: '0414', create_at: '2023-02-15', update_at: '2023-05-20', officer_id: 502 },
  { expertise_id: 3, staff_id: 1003, expertise_name: 'การบริหารงานบุคคลและพัฒนาบุคลากร', isced_code: '0415', create_at: '2022-11-05', update_at: '2023-04-10', officer_id: 503 },
  { expertise_id: 4, staff_id: 1004, expertise_name: 'การบริหารงานทั่วไปและเลขานุการ', isced_code: '0416', create_at: '2023-03-20', update_at: '2023-06-25', officer_id: 501 },
  { expertise_id: 5, staff_id: 1005, expertise_name: 'กฎหมายแรงงานและกฎหมายองค์กร', isced_code: '0421', create_at: '2022-09-12', update_at: '2023-05-18', officer_id: 502 },
  { expertise_id: 6, staff_id: 1006, expertise_name: 'การบริหารงานสารบรรณและเอกสาร', isced_code: '0417', create_at: '2023-04-05', update_at: '2023-06-30', officer_id: 503 },
  { expertise_id: 7, staff_id: 1007, expertise_name: 'การประชาสัมพันธ์และสื่อสารองค์กร', isced_code: '0322', create_at: '2023-01-25', update_at: '2023-06-10', officer_id: 501 },
  { expertise_id: 8, staff_id: 1008, expertise_name: 'การบริหารจัดการพัสดุและครุภัณฑ์', isced_code: '0418', create_at: '2022-12-10', update_at: '2023-05-15', officer_id: 502 },
  { expertise_id: 9, staff_id: 1009, expertise_name: 'การจัดการอาคารและสถานที่', isced_code: '0732', create_at: '2023-02-28', update_at: '2023-06-20', officer_id: 503 },
  { expertise_id: 10, staff_id: 1010, expertise_name: 'การสนับสนุนงานบริการวิชาการ', isced_code: '0914', create_at: '2023-03-15', update_at: '2023-06-28', officer_id: 501 }
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
  data: SupportExpertiseData;
  onView: (data: SupportExpertiseData) => void;
};

const TableItem = ({ data, onView }: TableItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TableRow hover key={data.expertise_id} className="item-hover">
      <TableCellWrapper component="th" scope="row">
        {isLoading ? <Skeleton width={80} /> : data.expertise_id}
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
        {isLoading ? <Skeleton width={200} /> : data.expertise_name} <MdSchool />
      </TableCellWrapper>
      <TableCellWrapper align="center">
        {isLoading ? <Skeleton width={80} /> : data.isced_code}
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
  id: keyof SupportExpertiseData | 'actions';
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
  data: SupportExpertiseData[];
  onView: (data: SupportExpertiseData) => void;
  selectedStaffId: number | null;
}

const DataTable = ({ data, onView, selectedStaffId }: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof SupportExpertiseData>('expertise_id');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intl = useIntl();
  const labeltext = useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.08' }); // สมมติว่ามี ID สำหรับเมนูนี้ (อ้างอิงจาก Support Expertise)
    return label;
  }, [intl]);

  const columns: readonly Column[] = useMemo(
    () => [
      { id: 'expertise_id', label: 'รหัสความเชี่ยวชาญ', minWidth: 100, sortable: true },
      { id: 'staff_id', label: 'ชื่อบุคลากร', minWidth: 150, sortable: true },
      { id: 'expertise_name', label: 'ชื่อความเชี่ยวชาญ', minWidth: 250, sortable: true },
      { id: 'isced_code', label: 'รหัส ISCED', minWidth: 80, sortable: true },
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
    property: keyof SupportExpertiseData,
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
        // Search in expertise_id, expertise_name, isced_code, officer_id
        const rowMatches =
          String(row.expertise_id).toLowerCase().includes(lowerCaseQuery) ||
          (row.expertise_name && String(row.expertise_name).toLowerCase().includes(lowerCaseQuery)) ||
          (row.isced_code && String(row.isced_code).toLowerCase().includes(lowerCaseQuery)) ||
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof SupportExpertiseData)}
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
                <TableItem key={row.expertise_id} data={row} onView={onView} />
              ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  ไม่พบข้อมูลความเชี่ยวชาญสำหรับบุคลากรคนนี้
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

// Main SupportExpertise Component
interface SupportExpertiseProps {
  selectedStaffIdProp: number | null;
}

const SupportExpertise: React.FC<SupportExpertiseProps> = ({ selectedStaffIdProp }) => {
  const [currentViewTask, setCurrentViewTask] = useState<SupportExpertiseData | null>(null);
  const [openViewTask, setOpenViewTask] = useState<boolean>(false);

  const onViewTask = (data: SupportExpertiseData) => {
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
        title={<IntlMessages id="common.supportExpertiseDetail" defaultMessage="รายละเอียดข้อมูลความเชี่ยวชาญ" />}
      >
        <Box sx={{ width: '100%', padding: '20px' }}>
          <TextField
            fullWidth
            label="รหัสความเชี่ยวชาญ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.expertise_id || ''}
            name="expertise_id"
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
            label="ชื่อความเชี่ยวชาญ"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.expertise_name || ''}
            name="expertise_name"
            disabled
          />
          <TextField
            fullWidth
            label="รหัส ISCED"
            variant="outlined"
            margin="normal"
            size="small"
            value={currentViewTask?.isced_code || ''}
            name="isced_code"
            disabled
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

export default SupportExpertise;