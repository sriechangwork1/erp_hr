import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Checkbox } from '@mui/material';

type AppsStarredIconProps = {
  item: any;
  onChange: (checked: boolean, item: any) => void;
};

const AppsStarredIcon: React.FC<AppsStarredIconProps> = ({ item, onChange }) => {
  return (
    <Checkbox
      sx={(theme) => ({
        color: theme.palette.warning.main,
        '&.Mui-checked': {
          color: theme.palette.warning.main,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      })}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      checked={item?.isStarred || false}
      onChange={(event) => onChange(event.target.checked, item)}
    />
  );
};

export default AppsStarredIcon;
