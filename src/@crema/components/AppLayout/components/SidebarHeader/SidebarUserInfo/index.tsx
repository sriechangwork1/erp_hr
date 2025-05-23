import React from 'react';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha, Typography } from '@mui/material';
import { useAuthMethod, useAuthUser } from '@crema/hooks/AuthHooks';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { Fonts } from '@crema/constants/AppEnums';
import Status from './Status';
import { useRouter } from 'next/navigation';
import AppLoader from '../../../../AppLoader';
import { signOut } from 'next-auth/react';

const SidebarUserInfo = () => {
  const { borderColor, sidebarTextColor } = useSidebarContext();
  const { user } = useAuthUser();
  const router = useRouter();
  const { logout } = useAuthMethod();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  if (!user || !user.email) {
    return <AppLoader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '15px 10px 25px',
        borderBottom: `dashed 1px ${alpha(borderColor!, 0.4)}`,
      }}
    >
      {user?.photoURL ? (
        <Box
          sx={{
            position: 'relative',
            border: `solid 2px ${alpha(sidebarTextColor, 0.6)}`,
            padding: 1,
            borderRadius: '50%',
            marginBottom: 2.5,
            '& .avatar-pic': {
              height: 74,
              width: 74,
            },
          }}
        >
          <Avatar className="avatar-pic" src={user.photoURL} />
          <Status />
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            border: `solid 2px ${alpha(sidebarTextColor, 0.6)}`,
            padding: 1,
            borderRadius: '50%',
            marginBottom: 2.5,
            '& .avatar-pic': {
              height: 74,
              width: 74,
            },
          }}
        >
          <Avatar className="avatar-pic">{getUserAvatar()}</Avatar>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          '& .arrowIcon': {
            transition: 'all 0.4s linear',
            opacity: 0,
            visibility: 'hidden',
            cursor: 'pointer',
          },
        }}
      >
        <Typography
          component="h3"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 16,
            fontWeight: Fonts.MEDIUM,
            marginBottom: 0.5,
            marginLeft: 6,
            color: sidebarTextColor,
            display: 'flex',
          }}
        >
          {user.displayName ? user.displayName : 'Admin User '}
          <KeyboardArrowDownIcon className="arrowIcon" onClick={handleClick} />
        </Typography>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: sidebarTextColor,
            fontSize: 14,
          }}
        >
          {user.email ? user.email : 'demo@crema-react.com '}
        </Typography>
      </Box>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/account/my-profile');
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(); // ปิดเมนู
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SidebarUserInfo;
