//hr601/table/index.tsx
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
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลตำแหน่งบริหาร ---
interface ManagementPositionData {
  position_id: number;
  staff_id: number;
  admin_position_id: number; // สมมติว่ามีตาราง admin_position_id แยกต่างหาก
  position_holder_name: string;
  acting_position_name?: string; // อาจเป็นค่าว่างได้
  position_allowance: number;
  position_status: string;
  start_date: string;
  end_date?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  appointment_order_number: string;
  appointment_order_date: string;
  appointment_order_file: string;
  dismissal_order_number?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  dismissal_order_date?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  dismissal_order_file?: string; // อาจเป็นค่าว่างได้ หากยังอยู่ในตำแหน่ง
  create_at: string;
  update_at: string;
  officer_id: number;
  faculty_id?: number; // อาจเป็นค่าว่างได้
  department_id?: number; // อาจเป็นค่าว่างได้
  program_id?: number; // อาจเป็นค่าว่างได้
  [key: string]: any;
}

// กำหนดประเภทสำหรับทิศทางการจัดเรียง
type Order = 'asc' | 'desc';

// --- กำหนดประเภทข้อมูลสำหรับแต่ละคอลัมน์ของตาราง ---
interface Column {
  id: keyof ManagementPositionData | 'actions'; // เปลี่ยนเป็น keyof ManagementPositionData
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

// ฟังก์ชันเปรียบเทียบสำหรับจัดเรียง
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ฟังก์ชันรับ comparator ที่เหมาะสมกับการจัดเรียง
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
  data: ManagementPositionData[]; // เปลี่ยนเป็น ManagementPositionData[]
  setTableData: React.Dispatch<React.SetStateAction<ManagementPositionData[]>>; // เปลี่ยนเป็น ManagementPositionData[]
  onView: (data: ManagementPositionData) => void;
  onEdit: (data: ManagementPositionData) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, setTableData, onView, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ManagementPositionData>('position_id'); // เปลี่ยนเป็น position_id
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const intl = useIntl();

  const labeltext = React.useMemo(() => {
    const label = intl.formatMessage({ id: 'sidebar.hr13.01' }); // เปลี่ยน id
    const words = label.split("HR113 "); // เปลี่ยน HR112 เป็น HR113
    return words[1] || '';
  }, [intl]);

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'position_id', label: 'รหัสตำแหน่ง', minWidth: 80, sortable: true },
      { id: 'staff_id', label: 'รหัสบุคลากร', minWidth: 80, sortable: true },
      { id: 'position_holder_name', label: 'ชื่อผู้ดำรงตำแหน่ง', minWidth: 200, sortable: true },
      { id: 'acting_position_name', label: 'ตำแหน่งรักษาการ', minWidth: 150, sortable: true },
      { id: 'position_status', label: 'สถานะ', minWidth: 100, sortable: true },
      { id: 'start_date', label: 'วันที่เริ่มต้น', minWidth: 120, sortable: true },
      { id: 'end_date', label: 'วันที่สิ้นสุด', minWidth: 120, sortable: true },
      { id: 'appointment_order_number', label: 'เลขที่คำสั่งแต่งตั้ง', minWidth: 150, sortable: true },
      { id: 'dismissal_order_number', label: 'เลขที่คำสั่งพ้นตำแหน่ง', minWidth: 150, sortable: true },
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
      { id: 'officer_id', label: 'ผู้บันทึก', minWidth: 80, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 100, align: 'right', sortable: false },
    ],
    [], 
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
    property: keyof ManagementPositionData, // เปลี่ยนเป็น keyof ManagementPositionData
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const { messages } = useIntl();

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof ManagementPositionData)} // เปลี่ยนเป็น keyof ManagementPositionData
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
                  key={row.position_id} // เปลี่ยน key เป็น position_id
                  data={row}
                  onView={() => onView(row)}
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row.position_id)} // เปลี่ยน onDelete เป็น position_id
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