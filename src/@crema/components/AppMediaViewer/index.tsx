import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slider, { Settings } from 'react-slick';
import Zoom from '@mui/material/Zoom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';
import MediaSlider from './MediaSlider';
import { TransitionProps } from '@mui/material/transitions';
import { MediaType } from '@crema/types/models/apps/Chat';
import Image from 'next/image';

const settings: Settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const renderRow = (data: any, index: number) => {
  if (data.mime_type.startsWith('image')) {
    return (
      <Image
        key={'IMAGE-' + index}
        src={`${data.url}`}
        alt={data.name ? data.name : 'detail view'}
        width={390}
        height={300}
      />
    );
  } else if (data.mime_type.startsWith('docs')) {
    return (
      <div className="embed-responsive">
        <iframe key={'DOC-' + index} src={data.url} title={data.name ? data.name : 'detail view'} />
      </div>
    );
  } else {
    return (
      <div className="embed-responsive">
        <iframe key={'DOC-' + index} src={data.url} title={data.name ? data.name : 'detail view'} />
      </div>
    );
  }
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  // eslint-disable-next-line no-undef
  ref: React.Ref<unknown>,
) {
  return <Zoom in ref={ref} {...props} />;
});

type AppMediaViewerProps = {
  index: number;
  medias: any[] | MediaType[];
  onClose: () => void;
};

const AppMediaViewer: React.FC<AppMediaViewerProps> = ({ index, medias, onClose }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (index > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [index]);

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paperFullScreen': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      TransitionComponent={Transition}
    >
      <Box
        sx={(theme) => ({
          position: 'relative',
          backgroundColor: 'rgb(49, 53, 65)',
          color: theme.palette.common.white,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <IconButton
          sx={(theme) => ({
            color: theme.palette.common.white,
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 1,
          })}
          onClick={onClose}
          size="large"
        >
          <HighlightOffIcon />
        </IconButton>
        {index >= 0 ? (
          <MediaSlider>
            <Slider {...settings} slidesToScroll={index}>
              {medias.map((data, index) => renderRow(data, index))}
            </Slider>
          </MediaSlider>
        ) : null}
      </Box>
    </Dialog>
  );
};

export default AppMediaViewer;
