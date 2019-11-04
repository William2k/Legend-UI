export const arrayRemoveByIndex = (arr: any[], index: number) => {
  const newArr = [...arr];

  newArr.splice(index, 1);

  return newArr;
};

export interface DateDiffModel {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const dateDiff = (date1: Date, date2: Date = new Date()) => {
  var diff = date2.valueOf() - date1.valueOf();

  const hours = Math.floor(diff / 3.6e6);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.max(
    (date2.getFullYear() - date1.getFullYear()) * 12 -
      (date1.getMonth() + 1) +
      date2.getMonth(),
    0
  );
  const years = date2.getFullYear() - date1.getFullYear();
  const minutes = Math.floor((diff % 3.6e6) / 6e4);
  const seconds = Math.floor((diff % 6e4) / 1000);

  return {
    years,
    weeks,
    months,
    days,
    hours,
    minutes,
    seconds
  } as DateDiffModel;
};
