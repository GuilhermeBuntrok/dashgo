import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Sidebar } from "../../components/Sidebar";

import { Input } from '../../components/Form/input';
import { Header } from '../../components/Header';
import Link from 'next/link';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')

  ], 'As senhas  precisam ser iguais')


})

export default function CreateUser() {

  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    console.log(values);
  }

  const { errors } = formState

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6",
            "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.name}
                label="Nome completo"
                {...register('name')}
              />
              <Input
                error={errors.email}
                type="email"
                label="E-mail"
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={errors.password}
                type="password"
                label="Senha"
                {...register('password')}
              />
              <Input
                error={errors.password_confirmation}
                type="password"
                label="Confirmação da senha"
                {...register('password_confirmation')}
              />
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type='submit' colorScheme="pink">Salvar</Button>

            </HStack>

          </Flex>
        </Box>
      </Flex >
    </Box >
  )
}