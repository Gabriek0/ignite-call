import { Calendar } from '@/components/Calendar'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

import { api } from '@/lib/axios'
import { capitalize } from '@/utils/capitalize'
import { Text } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectedDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectedDateTime }: CalendarStepProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const weekDaySelected = useMemo(() => {
    const weekDay = dayjs()
      .day(selectedDate?.getDay() || 0)
      .format('dddd')

    return capitalize(weekDay)
  }, [selectedDate])

  const weekDayExtendedSelected = useMemo(() => {
    const day = dayjs(selectedDate).format('DD')
    const month = dayjs(selectedDate).format('MMMM')

    return `${day} de ${capitalize(month)}`
  }, [selectedDate])

  const username = router.query.username as string

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get(`/users/${username}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      const { data } = response
      const times = data as Availability

      return times
    },
    {
      enabled: selectedDateWithoutTime !== null,
    },
  )

  function handleSelectDate(hour: number) {
    const selectedDateTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectedDateTime(selectedDateTime)
  }

  return (
    <Container isTimePickerOpen={!!selectedDate}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {selectedDate && (
        <TimePicker>
          <TimePickerHeader>
            {weekDaySelected}, <span>{weekDayExtendedSelected}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes?.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectDate(hour)}
                disabled={availability?.availableTimes?.includes(hour)}
              >
                <Text>{String(hour).padStart(2, '0')}:00h</Text>
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
