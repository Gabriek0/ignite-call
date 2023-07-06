import { FormAnnotation, ProfileBox } from "./styles";
import { Container, Header } from "../styles";

import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";

import { useForm } from "react-hook-form";

import * as z from "zod";
import { ArrowRight } from "phosphor-react";
import { useSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { NextAuthHandler } from "@/pages/api/auth/[...nextauth].api";

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export default function UpdateProfilePage() {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>();
  const session = useSession();

  // Simple vars
  const avatar_url = session.data?.user.avatar_url;

  // Functions
  async function handleUpdateProfile(data: UpdateProfileData) {
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar src={avatar_url} />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, NextAuthHandler(req, res));

  return {
    props: {
      session: session,
    },
  };
};
