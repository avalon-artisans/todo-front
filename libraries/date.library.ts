import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

export function formatDateToHumanReadable(date: string, srcFormat: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const dateObj = dayjs(date, srcFormat);
  return dateObj.format('dddd, MMMM D, YYYY h:mm A');
}

export function guessUserTimezone(): string {
  return dayjs.tz.guess();
}