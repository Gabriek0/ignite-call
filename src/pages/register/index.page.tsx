import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'

// Icon
import { ArrowRight } from 'phosphor-react'

// Styles
import { Container, Form, FormError, Header } from './styles'

// useForm + zod
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Axios
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

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

const createRegisterSchemaForm = z.object({
  username: string,
  name: z.string().min(3, {
    message: 'O nome de usuário precisa ter no mínimo 3 caractéres.',
  }),
})

type CreateRegisterSchemaForm = z.infer<typeof createRegisterSchemaForm>

export default function Register() {
  // Hooks
  const router = useRouter()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateRegisterSchemaForm>({
    resolver: zodResolver(createRegisterSchemaForm),
  })

  async function handleRegister(data: CreateRegisterSchemaForm) {
    const { name, username } = data

    try {
      await api.post('/users', {
        name,
        username,
      })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      }
    }
  }

  // Effects
  useEffect(() => {
    if (!router?.query.username) return

    // router.query.username can be string or string[] and with String() method we can transform this data.
    setValue('username', String(router?.query.username))
  }, [router?.query.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />

          {errors.username && <FormError>{errors.username.message}</FormError>}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />

          {errors.name && <FormError>{errors.name.message}</FormError>}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
