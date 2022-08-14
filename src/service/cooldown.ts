import { add } from 'date-fns';

export const computeCD = (date: Date, diffHours: number): [boolean, [number, number]] => {
  return date > add(new Date(), { hours: -diffHours })
    ? [
        true,
        [
          new Date(add(date, { hours: diffHours }).getTime() - new Date().getTime()).getUTCHours(),
          new Date(add(date, { hours: diffHours }).getTime() - new Date().getTime()).getUTCMinutes(),
        ],
      ]
    : [false, [0, 0]];
};
