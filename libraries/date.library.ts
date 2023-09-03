import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

const defaultDatetimeFormat = 'YYYY-MM-DD HH:mm:ss';

export function formatDateToHumanReadable(date: string, srcFormat: string = defaultDatetimeFormat): string {
  const dateObj = dayjs(date, srcFormat);
  return dateObj.format('dddd, MMMM D, YYYY h:mm A');
}

export function guessUserTimezone(): string {
  return dayjs.tz.guess() || 'Asia/Manila';
}

export function convertDateStringToUtc(date: string, srcTimezone: string): string {
  const dateWithLocalTz = dayjs.tz(date, defaultDatetimeFormat, srcTimezone);
  return dateWithLocalTz.utc().format(defaultDatetimeFormat);
}

export function convertUtcToLocalTz(date: string, destTimezone: string): string {
  const dateInUtc = dayjs.utc(date, defaultDatetimeFormat);
  return dateInUtc.tz(destTimezone).format(defaultDatetimeFormat);
}

export function isDateBeforeNow(date: string): boolean {
  return dayjs(date, defaultDatetimeFormat).isBefore(dayjs());
}