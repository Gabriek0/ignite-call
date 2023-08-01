import { Calendar } from "@/components/Calendar";

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";

import { api } from "@/lib/axios";
import { capitalize } from "@/utils/capitalize";
import { Text } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export function CalendarStep() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState(null);

  const weekDaySelected = useMemo(() => {
    const weekDay = dayjs()
      .day(selectedDate?.getDay() || 0)
      .format("dddd");

    return capitalize(weekDay);
  }, [selectedDate]);

  const weekDayExtendedSelected = useMemo(() => {
    const day = dayjs(selectedDate).format("DD");
    const month = dayjs(selectedDate).format("MMMM");

    return `${day} de ${capitalize(month)}`;
  }, [selectedDate]);

  const username = router.query.username as string;

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
        },
      })
      .then((response) => {
        const times = response.data;

        console.log(times);
      });
  }, [selectedDate]);

  return (
    <Container isTimePickerOpen={!!selectedDate}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {selectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDaySelected}, <span>{weekDayExtendedSelected}</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem disabled>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>

            <TimePickerItem>
              <Text>14:00</Text>
            </TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
