import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Title from '@/components/Title';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AccountPage() {
  const { data: session } = useSession();
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn('google', {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  return (
    <>
      <Header />
      {process.env.NEXT_PUBLIC_URL}
      <Center>
        <Title>Cuenta</Title>
        {session && (
          <Button primary onClick={logout}>
            Salir
          </Button>
        )}
        {!session && (
          <Button primary onClick={login}>
            Ingresar
          </Button>
        )}
      </Center>
    </>
  );
}
