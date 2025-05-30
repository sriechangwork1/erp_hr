import React, { useState } from 'react';
import { Grow, Icon, IconButton, ListItem, ListItemText, Paper } from '@mui/material';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { Manager, Popper, Reference } from 'react-popper';
import HorizontalItem from './HorizontalItem';
import HorizontalGroup from './HorizontalGroup';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import { RouterConfigData } from '@crema/types/models/Apps';
import ClientOnlyPortal from './ClientPortal';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';

type HorizontalCollapseProps = {
  item: RouterConfigData;
  nestedLevel: number;
  dense?: number;
};

const HorizontalCollapse: React.FC<HorizontalCollapseProps> = (props) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { theme } = useThemeContext();
  const { item, nestedLevel, dense } = props;
  const pathname = usePathname();
  const active = isUrlInChildren(item, pathname);
  const { sidebarMenuSelectedBgColor, sidebarMenuSelectedTextColor } = useSidebarContext();

  const handleToggle = (open: boolean) => {
    setOpened(open);
  };

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
    <List
      sx={{
        py: 0,
        '& .list-item-text': {
          padding: '0 0 0 16px',
        },
      }}
      className="navbarNavSubmenu"
    >
      <Manager>
        <Reference>
          {({ ref }) => (
            <ListItem
              ref={ref}
              sx={{
                color: theme.palette.text.primary,
                padding: '0px 12px',
                '&.active, &.active:hover, &.active:focus': {
                  backgroundColor: sidebarMenuSelectedBgColor + '!important',
                  color: sidebarMenuSelectedTextColor + '!important',
                },
                '&.open': {
                  backgroundColor: 'rgba(0,0,0,.08)',
                },
                '&.dense': {
                  padding: '0px 12px',
                  '& .list-item-text': {
                    padding: '0 0 0 8px',
                  },
                },
              }}
              className={clsx('navItemSubmenu', opened && 'open', dense && 'dense', active && 'active')}
              onMouseEnter={() => handleToggle(true)}
              onMouseLeave={() => handleToggle(false)}
            >
              {item.icon && (
                <Icon
                  sx={[
                    {
                      mr: 3.5,
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
              <ListItemText className="navLinkTextSubmenu" primary={<IntlMessages id={item.messageId} />} />
              <Box
                sx={{
                  p: 0,
                }}
              >
                <IconButton disableRipple>
                  <Icon
                    sx={[
                      active
                        ? {
                            color: sidebarMenuSelectedTextColor,
                          }
                        : {
                            color: 'action',
                          },
                    ]}
                  >
                    {theme.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}
                  </Icon>
                </IconButton>
              </Box>
            </ListItem>
          )}
        </Reference>
        {/*<ClientOnlyPortal selector='#root'>*/}
        <Popper placement="right">
          {({ ref, style, placement }) =>
            opened && (
              <Box
                ref={ref}
                sx={{
                  boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                  zIndex: 1110 + nestedLevel + 1,
                  ...style,
                  '& .popperClose': {
                    pointerEvents: 'none',
                  },
                }}
                data-placement={placement}
                className={clsx({
                  popperClose: !opened,
                })}
              >
                <Grow in={opened}>
                  <Paper onMouseEnter={() => handleToggle(true)} onMouseLeave={() => handleToggle(false)}>
                    {item.children && (
                      <List
                        sx={{
                          px: 0,
                        }}
                      >
                        {item.children.map((item) => (
                          <React.Fragment key={item.id}>
                            {item.type === 'group' && <HorizontalGroup item={item} nestedLevel={nestedLevel + 1} />}

                            {item.type === 'collapse' && (
                              <HorizontalCollapse item={item} nestedLevel={nestedLevel + 1} />
                            )}

                            {item.type === 'item' && <HorizontalItem item={item} nestedLevel={nestedLevel + 1} />}
                          </React.Fragment>
                        ))}
                      </List>
                    )}
                  </Paper>
                </Grow>
              </Box>
            )
          }
        </Popper>
        {/*</ClientOnlyPortal>*/}
      </Manager>
    </List>
  );
};

export default HorizontalCollapse;
