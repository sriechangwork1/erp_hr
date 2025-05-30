import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import clsx from 'clsx';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { alpha, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import AppMediaViewer from '@crema/components/AppMediaViewer';
import { Fonts } from '@crema/constants/AppEnums';
import { styled } from '@mui/material/styles';
import { getFileSize } from '@crema/helpers/Common';
import Image from 'next/image';

import { ConnectionType, MediaType, MessageDataType, MessageType } from '@crema/types/models/apps/Chat';

const ReceiverMessageWrapper = styled('div')(() => {
  return {
    mt: 5.5,
    display: 'flex',
    justifyContent: 'flex-start',
    '&:last-of-type': {
      marginBottom: 0,
    },
    '&.hideUser-info': {
      position: 'relative',
      marginTop: 1,
      '& .message-time, & .message-chat-avatar': {
        display: 'none',
      },
      '& .message-chat-sender': {
        marginBottom: 0,
      },
      '& .message-chat-item': {
        marginLeft: 44,
      },
    },
  };
});
const VideoWrapper = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    width: 56,
    height: 56,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: theme.palette.common.black,
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      paddingTop: '100%',
    },
    '& video, & iframe, & embed, & object': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      border: '0 none',
      objectFit: 'cover',
    },
  };
});
const MessageChat = styled('div')(({ theme }: { theme: any }) => {
  return {
    display: 'inline-flex',
    border: `solid 1px ${theme.palette.grey[200]}`,
    borderTopRightRadius: theme.cardRadius,
    borderBottomRightRadius: theme.cardRadius,
    padding: '10px 16px',
    position: 'relative',
    fontSize: 14,
    backgroundColor: theme.palette.background.paper,
    '& .download-icon': {
      position: 'absolute',
      right: 5,
      bottom: 5,
      zIndex: 1,
    },
    '.last-chat-message &': {
      borderBottomLeftRadius: theme.cardRadius,
    },
  };
});

const showMediaItems = 2;
const getMediaMessage = (item: MediaType) => {
  if (item.mime_type.startsWith('image')) {
    return (
      <Box
        sx={{
          position: 'relative',
          '& img': {
            objectFit: 'cover',
            borderRadius: 1,
            width: 56,
            height: 56,
            display: 'block',
          },
        }}
      >
        <Image alt="" src={`${item.url}`} width={56} height={56} />
      </Box>
    );
  } else if (item.mime_type.startsWith('video')) {
    return (
      <VideoWrapper>
        <video src={item.url} />
        <PlayCircleOutlineIcon
          sx={(theme) => ({
            fontSize: 20,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: theme.palette.common.white,
          })}
        />
      </VideoWrapper>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
        }}
      >
        <DescriptionOutlinedIcon />
        <Box
          component="p"
          sx={{
            ml: 2,
          }}
        >
          <Box component="span" sx={{ display: 'block' }}>
            {item.file_name}
          </Box>
          <Box component="span" sx={{ display: 'block' }}>
            {getFileSize(item.file_size as number)}
          </Box>
        </Box>
      </Box>
    );
  }
};

const getMessage = (item: MessageDataType, setIndex: (index: number) => void) => {
  if (item.message_type === MessageType.TEXT) {
    return <Typography>{item.message}</Typography>;
  } else {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: -1,
          }}
        >
          {item.media?.slice(0, showMediaItems).map((data, index) => (
            <Box
              sx={{
                padding: 1,
                cursor: 'pointer',
              }}
              key={'media-' + data.id}
              onClick={() => setIndex(index)}
            >
              {getMediaMessage(data)}
            </Box>
          ))}
          {item.media!.length > showMediaItems ? (
            <Box
              sx={{
                padding: 1,
                cursor: 'pointer',
              }}
              onClick={() => setIndex(showMediaItems)}
            >
              <Box
                sx={(theme) => ({
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: Fonts.MEDIUM,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                +{item.media!.length - showMediaItems}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  }
};

type ReceiverMessageItemProps = {
  selectedUser: ConnectionType;
  item: MessageDataType;
  isPreviousSender: boolean;
  isLast: boolean;
};
const ReceiverMessageItem = ({ selectedUser, item, isPreviousSender = false, isLast }: ReceiverMessageItemProps) => {
  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };

  return (
    <ReceiverMessageWrapper
      className={clsx(isPreviousSender ? 'hideUser-info' : '', isLast ? 'last-chat-message' : '')}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
        }}
      >
        {selectedUser.image ? (
          <Avatar
            sx={{
              backgroundColor: orange[500],
              width: 34,
              height: 34,
              mr: 2.5,
              mb: 5.5,
            }}
            className="message-chat-avatar"
            src={selectedUser.image}
          />
        ) : (
          <Avatar
            sx={{
              backgroundColor: orange[500],
              width: 34,
              height: 34,
              mr: 2.5,
              mb: 5.5,
            }}
            className="message-chat-avatar"
          >
            {selectedUser.name.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <Box
          sx={{
            position: 'relative',
          }}
          className="message-chat-item"
        >
          <Box
            component="span"
            sx={(theme) => ({
              fontSize: 12,
              color: theme.palette.text.secondary,
              display: 'block',
              mb: 1.5,
            })}
            className="message-time"
          >
            {item.time}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <MessageChat>{getMessage(item, setIndex)}</MessageChat>

            {item.edited && (
              <Box
                sx={(theme) => ({
                  pl: 2.5,
                  color: theme.palette.text.secondary,
                  '& .MuiSvgIcon-root': {
                    fontSize: 16,
                  },
                })}
              >
                <EditIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <AppMediaViewer index={index} medias={item?.media as MediaType[]} onClose={onClose} />
    </ReceiverMessageWrapper>
  );
};

export default ReceiverMessageItem;
