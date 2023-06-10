import { Button, TextInput } from "@ignite-ui/react";

// Styles
import { Form } from "./styles";

// Icons
import { ArrowRight } from "phosphor-react";

// Forms
import z from "zod";
import { useForm } from "react-hook-form";
import { create } from "domain";

const createClaimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameForm = z.infer<typeof createClaimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameForm>();

  async function handleClaimUsername(data: ClaimUsernameForm) {
    console.log(data.username);
  }

  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register("username")}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Form>
  );
}
