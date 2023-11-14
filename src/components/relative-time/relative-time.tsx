import { Typography } from '@mui/material';
import { FC, HTMLProps } from 'react';

type OptionalDateValue = number | string | Date | null | undefined;

type ElementProps = Omit<HTMLProps<HTMLTimeElement>, 'value'>;

type Props = Omit<Intl.RelativeTimeFormatOptions, 'style'> &
  ElementProps & {
    formatStyle?: Intl.RelativeTimeFormatOptions['style'];
    className?: string;
    locales?: string | string[];
    value?: number | string | Date | null;
  };

export const RelativeTime: FC<Props> = ({ locales = 'en-US', value }) => {
  const date = parseDate(value);
  if (!date) return null;

  const minutes = getMinutesDiff(date);
  const text = new Intl.RelativeTimeFormat(locales, {
    style: 'narrow',
  }).format(...getUnits(minutes));
  return (
    <Typography component="time" id={date.toString()} dateTime={date.toISOString()}>
      {text}
    </Typography>
  );
};

const getMinutesDiff = (data: Date, base = new Date()) => {
  const diff = data.getTime() - base.getTime();
  return diff / MS_IN_MIN;
};

const MS_IN_MIN = 1000 * 60;
const MIN_IN_HOUR = 60;
const MIN_IN_DAY = 60 * 24;
const MIN_IN_MON = MIN_IN_DAY * 30;
const MIN_IN_YEAR = MIN_IN_DAY * 365;

const getUnits = (minutes: number): [number, Intl.RelativeTimeFormatUnit] => {
  const val = Math.abs(minutes);
  const [amount, units] =
    val < MIN_IN_HOUR
      ? [minutes, 'minutes']
      : val < MIN_IN_DAY
        ? [minutes / MIN_IN_HOUR, 'hours']
        : val < MIN_IN_MON
          ? [minutes / MIN_IN_DAY, 'days']
          : val < MIN_IN_YEAR
            ? [minutes / MIN_IN_MON, 'months']
            : [minutes / MIN_IN_YEAR, 'years'];
  return [Math.floor(amount), units as Intl.RelativeTimeFormatUnit];
};

function parseDate(value?: OptionalDateValue): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.valueOf()) ? null : date;
}
