import React, { ReactNode } from 'react';
import { Dialog, DialogTitle, Slide, Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AppScrollbar from '../AppScrollbar';
import { Fonts } from '@crema/constants/AppEnums';
import { TransitionProps } from '@mui/material/transitions';
import { Breakpoint, SxProps } from '@mui/system';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  // eslint-disable-next-line no-undef
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AppDialogProps = {
  maxWidth?: Breakpoint;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | ReactNode;
  dividers?: boolean;
  hideClose?: boolean;
  fullHeight?: boolean;
  actionTitle?: string;
  maxScrollHeight?: number;
  sxStyle?: SxProps<Theme>;
};

const AppDialog: React.FC<AppDialogProps> = ({
  sxStyle,
  maxWidth = 'sm',
  hideClose = false,
  open,
  onClose,
  children,
  dividers = false,
  title,
  actionTitle,
  fullHeight = false,
  maxScrollHeight,
}) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
        },
        '& .MuiDialogContent-root': {
          overflowY: 'hidden',
          paddingLeft: 0,
          paddingRight: 0,
        },
        ...sxStyle,
      }}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          fontSize: 14,
          fontWeight: Fonts.MEDIUM,
        }}
        id="app-dialog-title"
      >
        {title}
        {hideClose ? null : (
          <IconButton
            aria-label="close"
            sx={{
              position: 'absolute',
              right: 4,
              top: 4,
              color: 'grey.500',
            }}
            onClick={onClose}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers={dividers}>
        <AppScrollbar
          sx={[
            {
              paddingTop: 1,
              minHeight: '300px',
              paddingRight: 6,
              paddingLeft: 6,
            },
            fullHeight
              ? {
                  height: '70vh',
                }
              : {
                  height: '100%',
                },
            maxScrollHeight
              ? {
                  maxHeight: maxScrollHeight,
                }
              : {
                  maxHeight: '400px',
                },
          ]}
        >
          {children}
        </AppScrollbar>
      </DialogContent>
      {actionTitle ? (
        <DialogActions>
          <Button color="primary" variant="contained" type="submit">
            {actionTitle}
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};
export default AppDialog;
