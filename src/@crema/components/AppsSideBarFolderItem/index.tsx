import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { alpha, styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';
import Link from 'next/link';
import clsx from 'clsx';
import { useParams, usePathname, useRouter } from 'next/navigation';

const AppsSideBarFolderList = styled(ListItem)(({ theme }) => {
  return {
    padding: '7px 16px',
    borderRadius: '0 30px 30px 0',
    marginBottom: 1,
    marginTop: 1,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& svg': {
      fontSize: '18px',
    },
    '&:hover,&:focus,&.active': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      '& .material-icons, & svg, & .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
    },
    '&.active': {
      color: theme.palette.primary.main,
      '& .material-icons, & .MuiTypography-root': {
        color: theme.palette.primary.main,
      },
      '& .data-item-text': {
        '& .MuiTypography-body1': {
          fontWeight: Fonts.SEMI_BOLD,
        },
      },
    },
  };
});

const getIconByName = (name: string) => {
  switch (name) {
    case 'inbox':
      return <EmailOutlinedIcon />;
    case 'sent':
      return <SendOutlinedIcon />;
    case 'draft':
      return <DraftsOutlinedIcon />;
    case 'starred':
      return <StarBorderOutlinedIcon />;
    case 'spam':
      return <InfoOutlinedIcon />;
    case 'trash':
      return <DeleteOutlineIcon />;
    case 'archive':
      return <ArchiveOutlinedIcon />;
    case 'all':
      return <GroupOutlinedIcon />;
    case 'frequent':
      return <AutorenewOutlinedIcon />;
    case 'priority':
      return <LabelImportantIcon />;
    case 'scheduled':
      return <ScheduleOutlinedIcon />;
    case 'today':
      return <TodayOutlinedIcon />;
    case 'completed':
      return <CheckCircleOutlinedIcon />;
    case 'deleted':
      return <DeleteOutlineIcon />;
    default:
      return <PersonOutlinedIcon />;
  }
};

type AppsSideBarFolderItemProps = {
  item: any;
  path: string;
};

const AppsSideBarFolderItem: React.FC<AppsSideBarFolderItemProps> = ({ item, path }) => {
  const pathname = usePathname();

  return (
    <Link href={path as string} style={{ textDecoration: 'none' }}>
      <AppsSideBarFolderList
        key={item.id}
        className={clsx({
          active: path === pathname,
        })}
      >
        <ListItemIcon
          sx={(theme) => ({
            minWidth: 10,
            mr: 3.5,
            '& .material-icons, & svg': {
              fontSize: 22,
              color: theme.palette.text.secondary,
            },
          })}
        >
          {getIconByName(item.alias)}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          sx={{
            my: 0,
            '& .MuiTypography-body1': {
              fontSize: 14,
              mb: 0.5,
            },
          }}
          className="data-item-text"
        />
      </AppsSideBarFolderList>
    </Link>
  );
};

export default AppsSideBarFolderItem;
