import React from 'react';
import { useAuthMethod, useAuthUser } from '@crema/hooks/AuthHooks';
//import { useAuthUser, } from '@crema/hooks/AuthHooks';
import { alpha, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fonts } from '@crema/constants/AppEnums';
import { useRouter } from 'next/navigation';
import { orange } from '@mui/material/colors';
import { signOut } from 'next-auth/react';

const UserInfo = () => {
  const { logout } = useAuthMethod();
  const { user } = useAuthUser();
  const router = useRouter();

  console.log(user);
  

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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

  return (
    <Box
      sx={{
        py: 3,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Box onClick={handleClick}>
        {user.photoURL ? (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              backgroundColor: orange[500],
            }}
            src={user.photoURL}
          />
        ) : (
          <Avatar
            sx={{
              height: 30,
              width: 30,
              fontSize: 20,
              backgroundColor: orange[500],
            }}
          >
            {getUserAvatar()}
          </Avatar>
        )}
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          py: 4,
        }}
      >
        <MenuItem
          sx={(theme) => ({
            backgroundColor: alpha(theme.palette.common.black, 0.08),
            px: 6,
            py: 3,
          })}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            {user.photoURL ? (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={user.photoURL}
              />
            ) : (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 20,
                  backgroundColor: orange[500],
                }}
              >
                {getUserAvatar()}
              </Avatar>
            )}
          </Box>

          <Box>
            <Box
              sx={{
                mb: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              }}
              component="span"
            >
              {user.displayName ? user.displayName : 'Admin User '}
            </Box>
            <Box
              sx={(theme) => ({
                mt: -0.5,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 12,
                color: theme.palette.text.secondary,
              })}
            >
              System Manager
            </Box>
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('account/my-profile');
          }}
          sx={{
            px: 6,
            py: 1.5,
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          // onClick={() => {
          //   handleClose(); // ปิดเมนู
          //   signOut();
          // }}
          onClick={logout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserInfo;
