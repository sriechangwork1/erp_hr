import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import AppInfoView from '../AppInfoView';
import { Box, Slide, Theme, Zoom } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';

import AppSidebar from './AppSidebar';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { Fonts, NavStyle } from '@crema/constants/AppEnums';
import AppContainerWrapper from './AppContainerWrapper';
import { SxProps } from '@mui/system';
import { usePathname } from 'next/navigation';

type AppsContainerProps = {
  title: string | ReactNode;

  sidebarContent?: ReactNode;
  fullView?: boolean;
  children: ReactNode;
  sxStyle?: SxProps<Theme>;
  cardStyle?: CSSProperties;
};

const AppsContainer: React.FC<AppsContainerProps> = (props) => {
  const pathname = usePathname();
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    setNavCollapsed(false);
  }, [pathname]);

  const { footer } = useLayoutContext();
  const { navStyle } = useLayoutContext();
  const { title, sidebarContent, fullView, children } = props;

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: -4,
        padding: 4,
        ...props.sxStyle,
      }}
    >
      <Box
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            mb: {
              lg: 4,
            },
            mt: {
              lg: 0,
            },
          },
          fullView
            ? {
                marginTop: 0,
              }
            : {
                marginTop: -4,
              },
          fullView
            ? {
                mb: {
                  xs: 4,
                },
              }
            : {
                mb: {
                  xs: 2,
                },
              },
          fullView
            ? {
                mt: {
                  xs: 0,
                },
              }
            : {
                mt: {
                  xs: -4,
                },
              },
        ]}
      >
        {fullView ? null : (
          <IconButton
            edge="start"
            sx={(theme) => ({
              display: { lg: 'none', xs: 'block' },
              marginRight: theme.spacing(2),
            })}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleNavCollapsed}
            size="large"
          >
            <MenuIcon
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </IconButton>
        )}
        <Zoom in style={{ transitionDelay: '300ms' }}>
          <Box
            component="h2"
            sx={{
              fontSize: 16,
              color: 'text.primary',
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {title}
          </Box>
        </Zoom>
      </Box>
      <AppContainerWrapper navStyle={navStyle as NavStyle} footer={footer}>
        {sidebarContent ? (
          <AppSidebar
            isAppDrawerOpen={isNavCollapsed}
            footer={footer}
            fullView={fullView}
            sidebarContent={sidebarContent}
            toggleNavCollapsed={toggleNavCollapsed}
          />
        ) : null}

        <Box
          sx={[
            {
              display: 'flex',
              flexDirection: 'column',
              width: {
                xs: '100%',
              },
              pl: {
                lg: props.fullView ? 0 : 8,
              },
            },
            fullView
              ? {
                  width: {
                    lg: {
                      lg: 0,
                    },
                  },
                }
              : {
                  width: {
                    lg: {
                      lg: 280,
                    },
                  },
                },
          ]}
        >
          <Slide direction="left" in mountOnEnter unmountOnExit>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...props.cardStyle,
              }}
            >
              {children}
            </Card>
          </Slide>
          <AppInfoView />
        </Box>
      </AppContainerWrapper>
    </Box>
  );
};

export default AppsContainer;
