import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  // eslint-disable-next-line no-undef
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AppConfirmDialogProps = {
  dialogTitle: string | ReactNode;
  open: boolean;
  onDeny: (isOpen: boolean) => void;
  title: string | ReactNode;
  onConfirm: () => void;
};

const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({ open, onDeny, onConfirm, title, dialogTitle }) => {
  return (
    <Dialog TransitionComponent={Transition} open={open} onClose={() => onDeny(false)}>
      <DialogTitle>
        <Typography
          sx={{
            mb: 3,
            fontWeight: Fonts.SEMI_BOLD,
          }}
          id="alert-dialog-title"
        >
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ color: 'text.secondary', fontSize: 14 }} id="alert-dialog-description">
        {title}
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={onConfirm}
          color="primary"
          autoFocus
        >
          <IntlMessages id="common.yes" />
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
          onClick={() => onDeny(false)}
          color="secondary"
        >
          <IntlMessages id="common.no" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
