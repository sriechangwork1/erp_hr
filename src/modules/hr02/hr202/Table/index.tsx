// //hr202/table/index.tsx
import * as React from 'react';
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตาราง (จาก Staff model) ---
interface StaffData {
  staff_id: number;
  citizen_id?: string;
  foreigner_id?: string;
  prefixname_id?: number;
  academic_title?: string;
  first_name_th?: string;
  last_name_th?: string;
  middle_name_th?: string;
  first_name_en?: string;
  last_name_en?: string;
  middle_name_en?: string;
  gender?: string;
  ethnicity?: string;
  nationality?: string;
  religion?: string;
  date_of_birth?: string; 
  birth_province?: string;
  current_address?: string;
  house_registration_address?: string;
  domicile_address?: string;
  country?: string;
  marital_status?: string;
  military_status?: string;
  enlistment_date?: string; 
  ordained_temple?: string;
  ordained_date?: string; 
  blood_type?: string;
  weight?: number;
  height?: number;
  phone_number?: string;
  mobile_number1?: string;
  mobile_number2?: string;
  email1?: string;
  email2?: string;
  line_id?: string;
  budget_type?: string;
  profile_picture?: string;
  hobbies?: string;
  language_skills?: string;
  computer_skills?: string;
  create_at?: string; 
  update_at?: string; 
  officer_id?: number;
  faculty_id?: number;
  department_id?: number;
  program_id?: number;
  staff_status?: number;
  staff_type_id?: number;
  position_type_id?: number;
  job_title_id?: number;
  work_line_id?: number;
  position_level_id?: number;
  academic_position_id?: number;
  support_position_id?: number;
  admin_position_id?: number;
  [key: string]: any;
}

type Order = 'asc' | 'desc';

interface Column {
  id: keyof StaffData | 'actions';
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
  a: { [key in Key]: number | string | boolean | undefined | null }, // เพิ่ม null ที่นี่
  b: { [key in Key]: number | string | boolean | undefined | null }, // เพิ่ม null ที่นี่
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
  data: StaffData[];
  onView: (data: StaffData) => void;
  onEdit: (data: StaffData) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, onView, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof StaffData>('staff_id');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const intl = useIntl();

  const labeltext = React.useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr02.02', defaultMessage: 'HR202 ข้อมูลบุคลากร' });
    const words = label.split("HR202 ");
    return words.length > 1 ? words[1] : label;
  }, [intl]);

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'staff_id', label: 'รหัสบุคลากร', minWidth: 80, sortable: true },
      { id: 'citizen_id', label: 'เลข ปชช.', minWidth: 120, sortable: true },
      { id: 'first_name_th', label: 'ชื่อ (ไทย)', minWidth: 120, sortable: true },
      { id: 'last_name_th', label: 'สกุล (ไทย)', minWidth: 120, sortable: true },
      { id: 'gender', label: 'เพศ', minWidth: 80, sortable: true },
      { 
        id: 'date_of_birth', 
        label: 'วันเกิด', 
        minWidth: 120, 
        sortable: true,
        format: (value: string) => value ? new Date(value).toLocaleDateString('th-TH') : '-'
      },
      { id: 'mobile_number1', label: 'เบอร์มือถือ', minWidth: 120, sortable: true },
      { id: 'email1', label: 'อีเมล์', minWidth: 150, sortable: true },
      { 
        id: 'create_at', 
        label: 'วันที่สร้าง', 
        minWidth: 120, 
        sortable: true,
        format: (value: string) => value ? new Date(value).toLocaleDateString('th-TH') : '-'
      },
      { 
        id: 'update_at', 
        label: 'วันที่ปรับปรุง', 
        minWidth: 120, 
        sortable: true,
        format: (value: string) => value ? new Date(value).toLocaleDateString('th-TH') : '-'
      },
      { id: 'officer_id', label: 'ผู้จัดการข้อมูล', minWidth: 120, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 50, align: 'right', sortable: false },
    ],
    []
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
    property: keyof StaffData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredRows = React.useMemo(() => {
    if (!searchQuery) {
      return data;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery]);

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
            placeholder="ค้นหาบุคลากร..."
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof StaffData)}
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
                <TableItem
                  key={row.staff_id}
                  data={row}
                  onView={() => onView(row)}
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row.staff_id)}
                  columns={columns} 
                />
              ))}
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
  
