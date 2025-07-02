// src/components/CrudTable.tsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import Swal from 'sweetalert2';

interface CrudTableProps<T extends Record<string, any>> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: { header: string; field: string }[];
  tableName: string; // Used for export filename and unique ID generation (if needed)
  uniqueIdField: keyof T; // The field that contains the unique ID for each record
  generateNewId: () => string; // Function to generate a new unique ID for new records
  onExportExcel: (data: T[], fileName: string, columns: { header: string; field: string }[]) => void;
}

const CrudTable = <T extends Record<string, any>>({
  data,
  setData,
  columns,
  tableName,
  uniqueIdField,
  generateNewId,
  onExportExcel,
}: CrudTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<T | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (row?: T) => {
    if (row) {
      setEditingRow({ ...row }); // Create a copy to edit
      setIsNewRecord(false);
    } else {
      setEditingRow({} as T); // Empty object for new record
      setIsNewRecord(true);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRow(null);
    setIsNewRecord(false);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editingRow) {
      setEditingRow((prev) => ({ ...prev!, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!editingRow) return;

    if (isNewRecord) {
      // For a new record, generate a unique ID if the uniqueIdField is meant to be generated
      const newId = generateNewId();
      const newRecord = { ...editingRow, [uniqueIdField]: newId };
      setData((prevData) => [...prevData, newRecord]);
      Swal.fire('บันทึกสำเร็จ!', 'เพิ่มข้อมูลใหม่เรียบร้อยแล้ว', 'success');
    } else {
      // For existing record, update it
      setData((prevData) =>
        prevData.map((row) =>
          row[uniqueIdField] === editingRow[uniqueIdField] ? editingRow : row
        )
      );
      Swal.fire('บันทึกสำเร็จ!', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
    }
    handleCloseDialog();
  };

  const handleDelete = (rowToDelete: T) => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.filter((row) => row[uniqueIdField] !== rowToDelete[uniqueIdField])
        );
        Swal.fire('ลบสำเร็จ!', 'ข้อมูลถูกลบเรียบร้อยแล้ว', 'success');
      }
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          เพิ่มข้อมูลใหม่
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => onExportExcel(data, tableName, columns)}
        >
          ส่งออก Excel
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label={`${tableName} table`}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.header}
                </TableCell>
              ))}
              <TableCell align="center">
                <IntlMessages id="table_actions" defaultMessage="การดำเนินการ" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={column.field}>
                        {value !== null && value !== undefined ? String(value) : '-'}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleOpenDialog(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<IntlMessages id="table_rows_per_page" defaultMessage="จำนวนแถวต่อหน้า:" />}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`
        }
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isNewRecord ? 'เพิ่มข้อมูลใหม่' : 'แก้ไขข้อมูล'}</DialogTitle>
        <DialogContent dividers>
          {editingRow && columns.map((column) => (
            <TextField
              key={column.field}
              margin="dense"
              name={column.field}
              label={column.header}
              type="text"
              fullWidth
              variant="outlined"
              value={editingRow[column.field] || ''} // Handle null/undefined values
              onChange={handleFieldChange}
              disabled={column.field === uniqueIdField && !isNewRecord} // Disable editing ID for existing records
              sx={{ mb: 2 }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<CancelIcon />}>
            ยกเลิก
          </Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />} variant="contained">
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CrudTable;

// Mock IntlMessages for CrudTable if not globally available
const IntlMessages: React.FC<{ id: string; defaultMessage: string }> = ({ defaultMessage }) => (
  <span>{defaultMessage}</span>
);