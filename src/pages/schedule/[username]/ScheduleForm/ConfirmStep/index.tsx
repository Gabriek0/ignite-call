import { CalendarBlank, Clock } from "phosphor-react";
import * as z from "zod";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";

import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome precisa ter no mínimo 3 caracteres")
    .nonempty("Esse campo é obrigatório."),
  email: z
    .string()
    .nonempty("Esse campo é obrigatório.")
    .email("Digite um email válido."),
  observations: z.string().optional(),
});

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onBack: () => void;
}

export function ConfirmStep({ schedulingDate, onBack }: ConfirmStepProps) {
  const router = useRouter();
  const { username } = router.query;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  });

  async function handleConfirmScheduling(data: ConfirmFormSchema) {
    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    });

    onBack();
  }

  const hour = dayjs(schedulingDate).format("HH:mm[h]");
  const date = dayjs(schedulingDate).format("DD [de] MMMM [de] YYYY");

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {date}
        </Text>

        <Text>
          <Clock />
          {hour}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Seu nome</Text>
        <TextInput placeholder="Seu nome" {...register("name")} />

        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="seu-email@exemplo.com" {...register("email")} />

        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observaçções</Text>
        <TextArea
          placeholder="Digite algumas observações..."
          {...register("observations")}
        />
      </label>

      <FormActions>
        <Button variant="tertiary" type="button" onClick={onBack}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
