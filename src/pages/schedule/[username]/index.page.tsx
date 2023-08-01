// Styles
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { prisma } from '@/lib/prisma'
import { ScheduleForm } from './ScheduleForm'

type User = {
  name: string
  avatar_url: string
  bio: string
}

interface SchedulePageProps {
  user: User
}

export default function SchedulePage({ user }: SchedulePageProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatar_url} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>

      <ScheduleForm />
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const username = params?.username as string

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!username || !user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        avatar_url: user.avatar_url,
        name: user.name,
        bio: user.bio,
      },
    },
    redirect: 60 * 60 * 24, // 1 day
  }
}
