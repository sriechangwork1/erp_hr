import React, { useState } from 'react';
import { Grow, Icon, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import clsx from 'clsx';
import { Manager, Popper, Reference } from 'react-popper';
import HorizontalCollapse from './HorizontalCollapse';
import HorizontalItem from './HorizontalItem';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import { usePathname } from 'next/navigation';
import { RouterConfigData } from '@crema/types/models/Apps';

type HorizontalCollapseProps = {
  item: RouterConfigData;
  nestedLevel: number;
  dense?: number;
};

const HorizontalGroup: React.FC<HorizontalCollapseProps> = (props) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { item, nestedLevel } = props;
  const pathname = usePathname();

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
    <Manager>
      <Reference>
        {({ ref }) => (
          <ListItem
            ref={ref}
            className={clsx('navItem', isUrlInChildren(item, pathname) && 'active')}
            onMouseEnter={() => handleToggle(true)}
            onMouseLeave={() => handleToggle(false)}
          >
            {item.icon && (
              <Icon color="action" className="navLinkIcon">
                {item.icon}
              </Icon>
            )}
            <ListItemText
              primary={<IntlMessages id={item.messageId} />}
              sx={{
                fontWeight: Fonts.MEDIUM,
              }}
            />
            {nestedLevel > 0 && (
              <IconButton
                sx={{
                  ml: 2,
                }}
                disableRipple
              >
                <Icon
                  sx={{
                    fontSize: 18,
                  }}
                  className="arrow-icon"
                >
                  keyboard_arrow_right
                </Icon>
              </IconButton>
            )}
          </ListItem>
        )}
      </Reference>
      {/*<ClientOnlyPortal selector='#root'>*/}
      <Popper placement={nestedLevel === 0 ? 'bottom-start' : 'right'}>
        {({ ref, style, placement }) =>
          opened && (
            <Box
              ref={ref}
              sx={{
                ...style,
                boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)',
                zIndex: 1110 + nestedLevel,
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
                          {item.type === 'group' && <HorizontalGroup item={item} nestedLevel={nestedLevel} />}

                          {item.type === 'collapse' && <HorizontalCollapse item={item} nestedLevel={nestedLevel} />}

                          {item.type === 'item' && <HorizontalItem item={item} nestedLevel={nestedLevel} />}
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
  );
};

export default HorizontalGroup;
