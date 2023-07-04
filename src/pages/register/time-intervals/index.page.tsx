import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@ignite-ui/react";

import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from "./styles";
import { Container, Header } from "../styles";

import { ArrowRight } from "phosphor-react";

import { useFieldArray, useForm } from "react-hook-form";

// Utils
import { getWeekDays } from "@/utils/get-week-days";

const intervals = [
  { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
  { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
  { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
];

export default function TimeIntervalsPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: intervals,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  // Simple vars
  const weekDay = getWeekDays();

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Checkbox />
                <Text>{weekDay[field.weekDay]}</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />

                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
