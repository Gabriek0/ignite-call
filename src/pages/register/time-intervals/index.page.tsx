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

// Utils
import { getWeekDays } from '@/utils/get-week-days'

import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import {
  TimeIntervalsInput,
  TimeIntervalsOutput,
  TimeIntervalsSchema,
} from './_schema'
import { useRouter } from 'next/router'

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
  const router = useRouter()

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
  const weekDay = getWeekDays({
    locale: 'pt-BR',
  })
  const intervals_watch = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsOutput

    await api.post('/users/time-intervals', { intervals })
    await handleNextStep()
  }

  const handleNextStep = async () => router.push('/register/update-profile')

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
