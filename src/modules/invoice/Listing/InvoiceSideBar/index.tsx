import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppScrollbar from '@crema/components/AppScrollbar';
import AppsSideBarFolderItem from '@crema/components/AppsSideBarFolderItem';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import SidebarPlaceholder from '@crema/components/AppSkeleton/SidebarListSkeleton';
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { useRouter } from 'next/navigation';
import { InvFolderType } from '@crema/types/models/invoice';

const ListWrapper = styled(List)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up('xl')]: {
    marginBottom: 20,
  },
}));

const TaskSideBar = () => {
  const router = useRouter();
  const [{ apiData: folderList }] = useGetDataApi<InvFolderType[]>('/invoice/folders', [], {}, true);
  return (
    <>
      <Box sx={{ px: { xs: 4, md: 5 }, pt: { xs: 4, md: 5 }, pb: 2.5 }}>
        <Zoom in style={{ transitionDelay: '300ms' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: '8px 28px',
              borderRadius: 30,
              '& .MuiSvgIcon-root': {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={() => router.push('/invoice/add-invoice')}
          >
            <IntlMessages id="invoice.addNewInvoice" />
          </Button>
        </Zoom>
      </Box>
      <AppScrollbar
        sx={{
          height: 'calc(100% - 76px)',
        }}
      >
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
          <ListWrapper aria-label="main task folders">
            <AppList
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => <AppsSideBarFolderItem key={item.id} item={item} path={`/invoice/${item.alias}`} />}
            />
          </ListWrapper>
        </Box>
      </AppScrollbar>
    </>
  );
};

export default TaskSideBar;
