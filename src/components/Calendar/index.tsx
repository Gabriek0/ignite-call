import { CaretLeft, CaretRight } from "phosphor-react";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from "./styles";

import { getWeekDays } from "@/utils/get-week-days";

import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { capitalize } from "@/utils/capitalize";

interface Day {
  date: dayjs.Dayjs;
  disabled: boolean;
}

type Days = Day[];

interface CalendarWeek {
  week: number; // week number
  days: Days;
}

type CalendarWeeks = CalendarWeek[];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set("date", 1));

  // Simple vars
  const currentYear = currentDate.format("YYYY");
  const currentMonth = currentDate.format("MMMM");

  const weekDays = getWeekDays({
    locale: "pt-BR",
    short: true,
  });

  // Functions
  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, "month");

    setCurrentDate(nextMonthDate);
  }

  function handlePrevMonth() {
    const prevMonthDate = currentDate.subtract(1, "month");

    setCurrentDate(prevMonthDate);
  }

  // Memo Vars
  const calendarWeeks = useMemo(() => {
    const monthDays = currentDate.daysInMonth();

    const daysInMonthArray = Array.from(
      {
        length: monthDays,
      },
      (_, index) => currentDate.set("date", index + 1)
    );

    const firstWeekDayOfMonth = currentDate.get("day");

    // Get last days of previous month
    const previousMonthFillArray = Array.from(
      {
        length: firstWeekDayOfMonth,
      },
      (_, index) => currentDate.subtract(index + 1, "day")
    ).reverse();

    // Get the last day of month
    const lastWeekDayOfMonth = currentDate.set("date", monthDays).get("day");

    const nextMonthFillArray = Array.from(
      {
        length: 7 - (lastWeekDayOfMonth + 1),
      },

      (_, index) => {
        const nextMonth = currentDate.add(1, "month");
        const nextMonthDaysToFill = nextMonth.add(index, "day");

        return nextMonthDaysToFill;
      }
    );

    const calendarDays = [
      ...previousMonthFillArray.map((date) => ({
        date: date,
        disabled: true,
      })),
      ...daysInMonthArray.map((date) => ({
        date: date,
        disabled: false,
      })),
      ...nextMonthFillArray.map((date) => ({
        date: date,
        disabled: true,
      })),
    ];

    const calendarSplitInWeeks = calendarDays.reduce<CalendarWeeks>(
      (acc, _, index, original_array) => {
        const isNewWeek = index % 7 === 0;

        if (isNewWeek) {
          acc.push({
            week: index / 7 + 1,
            days: original_array.slice(index, index + 7),
          });
        }

        return acc;
      },
      []
    );

    return calendarSplitInWeeks;
  }, [currentDate]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {capitalize(currentMonth)} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePrevMonth} title="Previous month">
            <CaretLeft />
          </button>
        </CalendarActions>

        <CalendarActions>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week.toLocaleString()}>
              {days.map(({ date, disabled }) => (
                <td>
                  <CalendarDay disabled={disabled}>{date.date()}</CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
