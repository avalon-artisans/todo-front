import dayjs from 'dayjs';

export function formatDateToHumanReadable(date: string, srcFormat: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const dateObj = dayjs(date, srcFormat);
  return dateObj.format('dddd, MMMM D, YYYY h:mm A');
}