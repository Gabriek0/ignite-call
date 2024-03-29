import { useRouter } from 'next/router'

import { signIn, useSession } from 'next-auth/react'

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'

// Icon
import { ArrowRight, Check } from 'phosphor-react'

// Styles
import { NextSeo } from 'next-seo'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendarPage() {
  const router = useRouter()
  const { status } = useSession()

  // this function trigger event to login with google
  const handleLoginWithGoogle = async () => await signIn()
  const handleNextStep = () => router.push('/register/time-intervals')

  // Simple vars
  const hasAuthError = !!router.query.error
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>

          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            {!isAuthenticated ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLoginWithGoogle}
              >
                Conectar
                <ArrowRight />
              </Button>
            ) : (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            type="submit"
            onClick={handleNextStep}
            disabled={!isAuthenticated}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
