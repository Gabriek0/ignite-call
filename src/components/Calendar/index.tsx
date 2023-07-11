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

import { useState } from "react";

import dayjs from "dayjs";
import { capitalize } from "@/utils/capitalize";

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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
