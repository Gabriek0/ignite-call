export function getWeekDays(locale: string = "pt-BR") {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) =>
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    );
}
