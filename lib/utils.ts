import { SUFFIX_DAY, VERBOSE_MONTH } from "./constants";

const humanizeDate = (date: string): string => {
  let [month, day, year] = date.split("-");

  if (day[0] === "0") {
    day = day[1];
  }

  const verboseDay = day + SUFFIX_DAY[day.slice(-1)];
  const verboseMonth = VERBOSE_MONTH[month];

  return `${verboseDay} ${verboseMonth}, ${year}`;
};

export { humanizeDate };
