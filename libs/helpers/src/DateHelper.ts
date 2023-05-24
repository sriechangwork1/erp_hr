import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat'; // load on demand
import relativeTime from 'dayjs/plugin/relativeTime'; // load on demand

dayjs.extend(AdvancedFormat); // use plugin
dayjs.extend(relativeTime); // use plugin

export const getDateObject = (dateObject?: string) => {
  if (dateObject) return dayjs(dateObject);
  return dayjs();
};

export const getFormattedDate = (
  dateObject?: dayjs.Dayjs | string,
  format = 'YYYY-MM-DD'
) => {
  if (dateObject) return dayjs(dateObject).format(format);
  return '';
};

export const getFormattedDateTime = (
  value = 0,
  unit = 'days',
  format = 'YYYY-MM-DD'
) => {
  if (value === 0) {
    return dayjs().format(format);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return dayjs().add(value, unit).format(format);
  }
};

export const timeFromNow = (date: string) => {
  const timestamp = dayjs(date).format('X');
  const newDate = dayjs.unix(Number(timestamp));
  return dayjs(newDate).fromNow();
};
