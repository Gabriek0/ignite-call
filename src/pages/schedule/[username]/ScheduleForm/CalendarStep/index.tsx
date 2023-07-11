import { Calendar } from "@/components/Calendar";

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";

import { Text } from "@ignite-ui/react";

export function CalendarStep() {
  const isDateSelected = true;

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira, <span>20 de setembro</span>
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
