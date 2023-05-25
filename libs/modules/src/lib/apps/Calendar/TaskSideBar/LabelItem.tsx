import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { alpha, styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';
import { LabelType } from '@crema/models/apps/Todo';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

// interface NavListItemProps {
//   [x: string]: any;
// }

// const NavListItem: React.FC<NavListItemProps> = (props) => (
//   <ListItem component={AppNavLink} {...props} />
// );

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: '0 30px 30px 0',
  marginBottom: 1,
  marginTop: 1,
  [theme.breakpoints.up('md')]: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  '& .MuiSvgIcon-root': {
    marginRight: 14,
    fontSize: 20,
  },

  '&:hover,&:focus,&.active': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },

  '&.active': {
    color: theme.palette.primary.main,
    '& $listItemText': {
      '& .MuiTypography-body1': {
        fontWeight: Fonts.SEMI_BOLD,
      },
    },
  },
}));

type Props = {
  label: LabelType;
};

const LabelItem = ({ label }: Props) => {
  const { asPath } = useRouter();

  return (
    <Link
      href={`/apps/calender/label/${label.alias}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <StyledListItem
        key={label.id}
        className={clsx({
          active: `/apps/todo/label/${label.alias}` === asPath,
        })}
      >
        <LabelOutlinedIcon style={{ color: `${label.color}` }} />

        <ListItemText
          sx={{
            '& .MuiTypography-body1': {
              fontSize: 14,
            },
          }}
          primary={label.name}
        />
      </StyledListItem>
    </Link>
  );
};

export default LabelItem;
