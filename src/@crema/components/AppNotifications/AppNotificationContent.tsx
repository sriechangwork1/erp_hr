import React from 'react';
import { IconButton, Theme } from '@mui/material';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import AppScrollbar from '../AppScrollbar';
import IntlMessages from '@crema/helpers/IntlMessages';
import NotificationItem from './NotificationItem';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { notification } from '@crema/fakedb';

type AppNotificationContentProps = {
  onClose: () => void;
  sxStyle: SxProps<Theme>;
};

const AppNotificationContent: React.FC<AppNotificationContentProps> = ({ onClose, sxStyle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 280,
        height: '100%',
        ...sxStyle,
      }}
    >
      <Box
        sx={(theme) => ({
          padding: '5px 20px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderBottomColor: theme.palette.divider,
          minHeight: { xs: 56, sm: 70 },
        })}
      >
        <Typography component="h3">
          <IntlMessages id="common.notifications" />({notification.length})
        </Typography>
        <IconButton
          sx={{
            height: 40,
            width: 40,
            marginLeft: 'auto',
            color: 'text.secondary',
          }}
          onClick={onClose}
          size="large"
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <AppScrollbar
        sx={{
          height: { xs: 'calc(100% - 96px)', sm: 'calc(100% - 110px)' },
        }}
      >
        <List sx={{ py: 0 }}>
          {notification.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </List>
      </AppScrollbar>
      <Button
        sx={{
          borderRadius: 0,
          width: '100%',
          textTransform: 'capitalize',
          marginTop: 'auto',
          height: 40,
        }}
        variant="contained"
        color="primary"
      >
        <IntlMessages id="common.viewAll" />
      </Button>
    </Box>
  );
};

export default AppNotificationContent;
