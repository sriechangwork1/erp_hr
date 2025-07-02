'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import './index.css';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { initialUrl } from '@crema/constants/AppConst';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
const menuItems = [
  {
    name: 'Community',
    link: '/',
  },
  {
    name: 'GitHub',
    link: '/',
  },
  {
    name: 'Docs',
    link: '/',
  },
];
const NavBar = () => {
  const [isScroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthUser();
  window.onscroll = function () {
    myFunction();
  };

  const myFunction = () => {
    if (window.pageYOffset > 10 && isScroll === false) {
      setScroll(true);
    } else if (window.pageYOffset <= 10 && isScroll === true) {
      setScroll(false);
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box id="navbar" className={isScroll ? 'sticky' : 'nav_bar'}>
      <Box
        sx={[
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: ' 16px',
            maxWidth: ' 1370px',
            margin: ' 0 auto',
            width: '100%',
            zIndex: 1250,
          },
          isScroll
            ? {
                padding: 0,
              }
            : {
                padding: '30px 0 16px',
              },
        ]}
      >
        <Box>
          <Image
            src={`${isScroll ? '/assets/ERP_LOGO/9.png' : '/assets/ERP_LOGO/9.png'}`}
            alt="logo"
            width={130}
            height={42}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {menuItems.map((items) => (
            <Link rel="stylesheet" href={items.link} key={items.name} className={isScroll ? 'text_color' : 'nav_link'}>
              {items.name}
            </Link>
          ))}
          <Button
            variant="contained"
            href={isAuthenticated ? initialUrl : '/signin'}
            sx={[
              isScroll
                ? {
                    backgroundColor: '',
                  }
                : {
                    backgroundColor: 'red',
                  },
            ]}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
          </Button>
          <span style={{ fontSize: '32px', color: isScroll ? '#000' : '#fff' }} className="menu_icon">
            <MenuSharpIcon onClick={showDrawer} />
          </span>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        onClose={onClose}
        open={open}
        key="left"
        style={{ maxWidth: '420px', width: '100%', padding: '60px' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'left',
            gap: '50px',
            flexDirection: 'column',
            padding: ' 60px',
          }}
        >
          {menuItems.map((items) => (
            <Link
              rel="stylesheet"
              href={items.link}
              key={items.name}
              onClick={onClose}
              style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#000',
                textDecoration: 'none',
              }}
            >
              {items.name}
            </Link>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
