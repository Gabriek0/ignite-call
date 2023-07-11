import { capitalize } from "./capitalize";

interface GetWeekDaysProps {
  locale: string;
  short?: boolean;
}

export function getWeekDays({
  locale = "pt-BR",
  short = false,
}: GetWeekDaysProps) {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase().concat(" .");
      }

      return capitalize(weekDay);
    });
}
