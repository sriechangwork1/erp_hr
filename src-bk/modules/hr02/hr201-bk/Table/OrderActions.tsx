import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const options = [
  { label: 'รายละเอียด', icon: <VisibilityIcon sx={{ color: 'blue' }} />, action: 'view' },
  { label: 'แก้ไขข้อมูล', icon: <EditIcon sx={{ color: 'orange' }} />, action: 'edit' },
  { label: 'ลบข้อมูล', icon: <DeleteIcon sx={{ color: 'red' }} />, action: 'delete' },
];


const OrderActions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton aria-controls="alpha-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="alpha-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {
           
        /* <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          View Order
        </MenuItem>
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Edit
        </MenuItem>
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Delete
        </MenuItem> */
        }
      </Menu>
    </Box>
  );
};
export default OrderActions;
