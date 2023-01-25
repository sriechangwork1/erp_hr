import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import AppsContainer from '@crema/components/AppsContainer';
import BoardDetailView from './BoardDetailView';
import {useGetDataApi} from '@crema/hooks/APIHooks';
import {useRouter} from "next/router";
import {BoardType} from "@crema/models/apps/ScrumbBoard";

const BoardDetail = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  const [{ apiData: boardDetail }, { setData, setQueryParams }] = useGetDataApi<BoardType>(
    '/api/scrumboard/board/',
    undefined,
    { id: id },
    false
  );

  useEffect(() => {
    setQueryParams({ id });
  }, [id]);

  const onGoToBoardList = () => {
    router.back();
  };

  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      title={
        <>
          <Box
            component="span"
            sx={{
              cursor: 'pointer',
              mr: 2,
              color: 'primary.main',
            }}
            onClick={onGoToBoardList}
          >
            Scrum Board
          </Box>
          &gt; {boardDetail?.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} setData={setData} />
    </AppsContainer>
  );
};

export default BoardDetail;
