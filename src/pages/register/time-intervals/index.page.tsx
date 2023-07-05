import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'

import {
  FormError,
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'

import { Container, Header } from '../styles'

import { ArrowRight } from 'phosphor-react'

import { Controller, useFieldArray, useForm } from 'react-hook-form'

// Utils
import { getWeekDays } from '@/utils/get-week-days'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { api } from '@/lib/axios'

const TimeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana.',
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeMinutes: convertTimeStringToMinutes(interval.endTime),
      })),
    )
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeMinutes - 60 >= interval.startTimeMinutes,
        ),
      {
        message:
          'O horário de término deve ter a diferença de pelo menos 1h do de ínicio.',
      },
    ),
})

type TimeIntervalsInput = z.input<typeof TimeIntervalsSchema>
type TimeIntervalsOutput = z.output<typeof TimeIntervalsSchema>

const intervals = [
  { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
  { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
  { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
  { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
  { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
  { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
  { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
]

export default function TimeIntervalsPage() {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsInput>({
    resolver: zodResolver(TimeIntervalsSchema),
    defaultValues: {
      intervals,
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  // Simple vars
  const weekDay = getWeekDays()
  const intervals_watch = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsOutput

    await api.post('/users/time-intervals', { intervals })
  }

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

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => (
            <IntervalItem key={field.id}>
              <IntervalDay>
                <Controller
                  control={control}
                  name={`intervals.${index}.enabled`}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />

                <Text>{weekDay[field.weekDay]}</Text>
              </IntervalDay>

              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals_watch[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />

                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals_watch[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalsContainer>

        {errors.intervals && <FormError>{errors.intervals.message}</FormError>}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
