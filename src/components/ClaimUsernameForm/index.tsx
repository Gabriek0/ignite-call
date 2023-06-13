import { Button, Text, TextInput } from '@ignite-ui/react'

// Styles
import { Form, FormAnnotation } from './styles'

// Icons
import { ArrowRight } from 'phosphor-react'

// Forms
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const regex = /^([a-z\\\\-]+)$/i
const string = z
  .string()
  .min(3, {
    message: 'O nome de usuário precisa ter no mínimo 3 caractéres.',
  })
  .regex(regex, {
    message: 'O nome de usuário pode ter apenas letras e hifens.',
  })
  .transform((username) => username.toLowerCase())

const createClaimUsernameFormSchema = z.object({
  username: string,
})

type ClaimUsernameFormType = z.infer<typeof createClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormType>({
    resolver: zodResolver(createClaimUsernameFormSchema),
  })

  async function handleClaimUsername(data: ClaimUsernameFormType) {
    console.log(data.username)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o seu nome de usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
