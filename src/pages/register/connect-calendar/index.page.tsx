import { signIn } from "next-auth/react";

import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";

// Icon
import { ArrowRight } from "phosphor-react";

// Styles
import { ConnectBox, ConnectItem } from "./styles";
import { Container, Header } from "../styles";

export default function ConnectCalendarPage() {
  // this function trigger event to login with google
  const handleLoginWithGoogle = () => signIn();

  return (
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
          <Button variant="secondary" size="sm" onClick={handleLoginWithGoogle}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
