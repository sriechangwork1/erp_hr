import React from 'react';
import { Icon, ListItem, ListItemText } from '@mui/material';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { RouterConfigData } from '@crema/types/models/Apps';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import Link from 'next/link';

type HorizontalItemProps = {
  item: RouterConfigData;
  nestedLevel?: number;
  dense?: boolean;
};

const HorizontalItem: React.FC<HorizontalItemProps> = (props) => {
  const { item, dense } = props;

  const pathname = usePathname();
  const active = isUrlInChildren(item, pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } = useSidebarContext();

  function isUrlInChildren(parent: RouterConfigData, url: string) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (parent.children[i].url === url || url.includes(parent!.children![i].url!)) {
        return true;
      }
    }

    return false;
  }

  return (
    <Link href={item.url as string} style={{ textDecoration: 'none' }}>
      <ListItem
        className={clsx('navItemSubmenu', dense && 'dense', {
          active: item.url === pathname,
        })}
        sx={(theme) => ({
          minHeight: 40,
          padding: '4px 12px',
          color: theme.palette.text.primary,
          textDecoration: 'none!important',
          minWidth: 160,
          '&.active': {
            backgroundColor: sidebarMenuSelectedBgColor,
            color: sidebarMenuSelectedTextColor + '!important',
            pointerEvents: 'none',
            '& .list-item-text-primary': {
              color: 'inherit',
            },
            '& .list-item-icon': {
              color: 'inherit',
            },
          },
          '& .list-item-text': {
            padding: '0 0 0 16px',
          },
          '&.dense': {
            padding: '4px 12px',
            minHeight: 40,
            '& .list-item-text': {
              padding: '0 0 0 8px',
            },
          },
        })}
      >
        {item.icon && (
          <Icon
            sx={[
              {
                mr: 3,
                fontSize: { xs: 16, xl: 18 },
              },
              active
                ? {
                    color: sidebarMenuSelectedTextColor,
                  }
                : {
                    color: 'action',
                  },
            ]}
          >
            {item.icon}
          </Icon>
        )}
        <ListItemText className="AppNavLinkTextSubmenu" primary={<IntlMessages id={item.messageId} />} />
        {item.count && (
          <Box
            sx={{
              ml: 4,
            }}
          >
            <Badge
              badgeContent={item.count}
              sx={{
                color: item.color,
              }}
            />
          </Box>
        )}
      </ListItem>
    </Link>
  );
};

export default HorizontalItem;
