// hr1101/table/index.tsx
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
import { Data } from '../types'; // *** เปลี่ยนมา import จากไฟล์กลาง ***

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
  // แก้ไขการเปรียบเทียบสำหรับค่าที่อาจเป็น null
  const valA = (a[orderBy] ?? '') as string | number;
  const valB = (b[orderBy] ?? '') as string | number;

  if (valB < valA) {
    return -1;
  }
  if (valB > valA) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean | undefined | null }, // เพิ่ม null
  b: { [key in Key]: number | string | boolean | undefined | null }, // เพิ่ม null
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
  setTableData: React.Dispatch<React.SetStateAction<Data[]>>;
  onView: (data: Data) => void;
  onEdit: (data: Data) => void;
  onDelete: (id: number) => void;
}

const DataTable = ({ data, setTableData, onView, onEdit, onDelete }: DataTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('research_id'); // เปลี่ยนเป็น research_id
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const intl = useIntl();

  const labeltext = React.useMemo(() => {
    return intl.formatMessage({ id: 'sidebar.hr11.01' });
  }, [intl]);

  const columns: readonly Column[] = React.useMemo(
    () => [
      { id: 'research_id', label: 'รหัสผลงานวิจัย', minWidth: 50, sortable: true },
      { id: 'title', label: 'ชื่อเรื่องผลงานวิจัย', minWidth: 200, sortable: true },
      { id: 'author_1', label: 'ผู้เขียนหลัก', minWidth: 150, sortable: true },
      { id: 'work_type', label: 'ประเภทผลงาน', minWidth: 100, sortable: true },
      { id: 'published_year', label: 'ปีที่ตีพิมพ์', minWidth: 80, sortable: true },
      { id: 'created_at', label: 'วันที่บันทึก', minWidth: 120, sortable: true },
      { id: 'created_by', label: 'ผู้บันทึก', minWidth: 120, sortable: true },
      { id: 'actions', label: 'Actions', minWidth: 50, align: 'right', sortable: false },
    ],
    [] // ไม่มี labeltext ใน dependency array เพราะ columns ไม่ได้ใช้ labeltext
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

  const { messages } = useIntl();

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
        // แปลงค่าเป็น string ก่อน includes เพื่อรองรับ number หรือ null
        String(value || '').toLowerCase().includes(lowerCaseQuery)
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
            placeholder={"ค้นหา"}
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
                  {column.sortable ?
                    (
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
                <TableItem
                  key={row.research_id} // เปลี่ยน key เป็น research_id
                  data={row}
                  onView={() => onView(row)}
                  onEdit={() => onEdit(row)}
                  onDelete={() => onDelete(row.research_id)} // เปลี่ยน onDelete เป็น research_id
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