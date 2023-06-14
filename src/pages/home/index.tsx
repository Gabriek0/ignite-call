import Image from 'next/image'

import { Heading, Text } from '@ignite-ui/react'

// Components
import { ClaimUsernameForm } from '@/components/ClaimUsernameForm'

// Styles
import { Container, Hero, Preview } from './styles'

// Image
import CalendarPreviewImage from '../../../public/calendar_preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>

        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={CalendarPreviewImage}
          alt="Calendar Image"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
