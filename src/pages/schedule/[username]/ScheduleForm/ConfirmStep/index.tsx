import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import { CalendarBlank, Clock } from 'phosphor-react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome precisa ter no mínimo 3 caracteres')
    .nonempty('Esse campo é obrigatório.'),
  email: z
    .string()
    .nonempty('Esse campo é obrigatório.')
    .email('Digite um email válido.'),
  observations: z.string().optional(),
})

type ConfirmFormSchema = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormSchema>({
    resolver: zodResolver(confirmFormSchema),
  })

  async function handleConfirmScheduling(data: any) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Seu nome</Text>
        <TextInput
          prefix={`cal.com/`}
          placeholder="seu-nome"
          {...register('name')}
        />

        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="seu-email@exemplo.com" {...register('email')} />

        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observaçções</Text>
        <TextArea
          placeholder="Digite algumas observações..."
          {...register('observations')}
        />
      </label>

      <FormActions>
        <Button variant="tertiary" type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
