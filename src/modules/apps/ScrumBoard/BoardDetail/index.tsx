import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import AppsContainer from '@crema/components/AppsContainer';
import BoardDetailView from './BoardDetailView';
import { useParams, useRouter } from 'next/navigation';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { BoardType } from '@crema/types/models/apps/ScrumbBoard';

const BoardDetail = () => {
  const router = useRouter();

  const params = useParams();
  const { id } = params;

  const [{ apiData: boardDetail }, { setData, setQueryParams }] =
    useGetDataApi<BoardType>('scrumboard', undefined, { id: id }, false);

  useEffect(() => {
    setQueryParams({ id });
    return () => {
      setQueryParams({});
    };
  }, [id]);

  const onGoToBoardList = () => {
    router.back();
  };

  if (!boardDetail?.name) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      title={
        <>
          <Box
            component='span'
            sx={{
              cursor: 'pointer',
              mr: 2,
              color: 'primary.main',
            }}
            onClick={onGoToBoardList}
          >
            Scrum Board
          </Box>
          &gt; {boardDetail.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} setData={setData} />
    </AppsContainer>
  );
};

export default BoardDetail;
