import type { NextPage } from 'next'
import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/input';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


import { SubmitHandler, useForm } from 'react-hook-form'

type SignInFormData = {
  email: string;
  password: string;

}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail Invalido'),
  password: yup.string().required('Senha Obrigatória'),
})



export default function SignIn() {

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={368}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            error={errors.email}
            type="email"
            label="E-mail"
            {...register('email')}
          />
          <Input
            error={errors.password}
            type="password"
            label="Senha"
            {...register('password')}
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex >
  )
}


