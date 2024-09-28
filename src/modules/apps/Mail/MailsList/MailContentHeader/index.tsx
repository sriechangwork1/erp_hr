import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import CheckedMailActions from './CheckedMailActions';
import MoreOptions from './MoreOptions';
import AppsPagination from '@crema/components/AppsPagination';
import AppSearchBar from '@crema/components/AppSearchBar';
import { useIntl } from 'react-intl';
import { useMailActionsContext, useMailContext } from '../../../context/MailContextProvider';
import { MailType } from '@crema/types/models/apps/Mail';

type Props = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
  filterText: any;
  onSetFilterText: (event: any) => void;
  totalMails: number;
  mailList: MailType[];
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => void;
};

const MailContentHeader = (props: Props) => {
  const { checkedMails = [], setCheckedMails, mailList, totalMails, filterText, onSetFilterText } = props;

  const { page = 0 } = useMailContext();
  const { onPageChange } = useMailActionsContext();

  const { messages } = useIntl();

  const onHandleMasterCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const mailIds = mailList.map((mail) => mail.id);
      setCheckedMails(mailIds);
    } else {
      setCheckedMails([]);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <Box component="span">
          <Checkbox
            sx={(theme) => ({
              color: theme.palette.text.disabled,
            })}
            color="primary"
            indeterminate={checkedMails?.length > 0 && checkedMails?.length < mailList?.length}
            checked={mailList?.length > 0 && checkedMails?.length === mailList?.length}
            onChange={onHandleMasterCheckbox}
          />
        </Box>
        <Box sx={{ mr: 5 }}>
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            value={filterText}
            onChange={(event: any) => onSetFilterText(event.target.value)}
            placeholder={messages['common.searchHere'] as string}
          />
        </Box>
        {checkedMails?.length > 0 ? (
          <CheckedMailActions checkedMails={checkedMails} setCheckedMails={setCheckedMails} />
        ) : null}

        <MoreOptions checkedMails={checkedMails} setCheckedMails={setCheckedMails} mailList={mailList || []} />
      </Box>
      {mailList?.length > 0 ? (
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'block' },
            ml: { sm: 'auto' },
          }}
        >
          <AppsPagination count={totalMails} page={page} onPageChange={onPageChange} />
        </Box>
      ) : null}
    </>
  );
};

export default MailContentHeader;
