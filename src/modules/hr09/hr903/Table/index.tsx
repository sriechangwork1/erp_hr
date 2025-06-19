//hr902/table/index.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Hr903TableItem from './TableItem'; // ตรวจสอบชื่อและ path
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

// --- กำหนดประเภทข้อมูลสำหรับแต่ละแถวในตารางสำหรับข้อมูลเครื่องราชอิสริยาภรณ์ ---
// ควรดึงมาจากไฟล์กลาง หรือนิยามซ้ำ
interface AwardData {
  award_id: number;
  staff_id: number;
  award_name: string;
  award_date: string;
  award_type: string;
  announcement_details: string;
  announcement_date: string;
  gazette_volume: string;
  gazette_number: string;
  gazette_section: string;
  return_date?: string;
  create_at: string;
  update_at: string;
  officer_id: number;
  award_status: string;
  [key: string]: any;
}

type Order = 'asc' | 'desc';

interface Column {
  id: keyof AwardData | 'actions';
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
    ?
    (a, b) => descendingComparator(a, b, orderBy)
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
  data: AwardData[]; // ข้อมูลที่ถูกกรองจาก parent
  onView: (data: AwardData) => void; // เหลือแค่ onView
}

const Hr903Table = ({ data, onView }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof AwardData>('award_id');
  const [searchQuery, setSearchQuery] = React.useState<string>(''); // Search Bar ภายในตาราง

  const { messages } = useIntl();

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'award_id', label: 'รหัสเครื่องราชฯ', minWidth: 50, sortable: true },
      { id: 'staff_id', label: 'รหัสพนักงาน', minWidth: 100, sortable: true }, // เพิ่มคอลัมน์รหัสพนักงาน
      { id: 'award_name', label: 'ชื่อเครื่องราชอิสริยาภรณ์', minWidth: 200, sortable: true },
      { id: 'award_date', label: 'วันที่ได้รับ', minWidth: 100, sortable: true },
      { id: 'award_type', label: 'ประเภท', minWidth: 250, sortable: true },
      { id: 'announcement_date', label: 'วันที่ประกาศ', minWidth: 100, sortable: true },
      { id: 'gazette_volume', label: 'เล่มที่', minWidth: 70, sortable: true },
      { id: 'gazette_number', label: 'ตอนที่', minWidth: 70, sortable: true },
      { id: 'gazette_section', label: 'หน้า', minWidth: 70, sortable: true },
      { id: 'award_status', label: 'สถานะ', minWidth: 80, sortable: true },
    /*  { id: 'create_at', label: 'สร้างเมื่อ', minWidth: 100, sortable: true },
      { id: 'update_at', label: 'แก้ไขล่าสุด', minWidth: 100, sortable: true },
      { id: 'officer_id', label: 'รหัสผู้บันทึก', minWidth: 80, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 100, align: 'right', sortable: false },*/
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
    property: keyof AwardData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่าใน Search Bar ภายในตาราง
  const onSearchCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // กรองข้อมูลตาม searchQuery ภายในตาราง (จากข้อมูลที่ได้รับมา)
  const filteredRows = React.useMemo(() => {
    if (!searchQuery) {
      return data; // ถ้าไม่มี search query ก็คืนข้อมูลที่ได้รับมาทั้งหมด
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [data, searchQuery]); // data เป็น dependency เพราะจะกรองจาก data ที่ได้รับ

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
            placeholder="ค้นหา (ในผลลัพธ์ที่กรองแล้ว)"
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
                      onClick={(event) => handleRequestSort(event, column.id as keyof AwardData)}
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
                <Hr903TableItem
                  key={row.award_id}
                  data={row}
                  onView={() => onView(row)}
                  // onEdit และ onDelete ถูกลบออกไปจาก props
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
export default Hr903Table;