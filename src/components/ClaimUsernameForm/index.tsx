import { Button, TextInput } from "@ignite-ui/react";

// Styles
import { Form } from "./styles";

// Icons
import { ArrowRight } from "phosphor-react";

export function ClaimUsernameForm() {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuario" />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  );
}
