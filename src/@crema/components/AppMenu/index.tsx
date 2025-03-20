import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const options = [
  { label: 'รายละเอียด', icon: <VisibilityIcon sx={{ color: 'blue' }} />, action: 'view' },
  { label: 'แก้ไขข้อมูล', icon: <EditIcon sx={{ color: 'orange' }} />, action: 'edit' },
  { label: 'ลบข้อมูล', icon: <DeleteIcon sx={{ color: 'red' }} />, action: 'delete' },
];

const AppMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action?: string) => {
    setAnchorEl(null);
    if (action) {
      console.log(`Selected action: ${action}`); // สามารถเปลี่ยนเป็นฟังก์ชันจริงได้
    }
  };

  return (
    <>
      <IconButton style={{ height: 30, width: 30 }} aria-label="more" onClick={handleClick} size="large">
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={() => handleClose()}>
        {options.map((option) => (
          <MenuItem key={option.label} onClick={() => handleClose(option.action)}>
            {option.icon} <span style={{ marginLeft: 10 }}>{option.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AppMenu;
