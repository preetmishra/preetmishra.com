import { SUFFIX_DAY, VERBOSE_MONTH } from "./constants";

const humanizeDate = (date: string): string => {
  const [day, month, year] = date.split("-");

  const verboseDay = day + SUFFIX_DAY[day.slice(-1)];
  const verboseMonth = VERBOSE_MONTH[month];

  return `${verboseDay} ${verboseMonth}, ${year}`;
};

export { humanizeDate };
