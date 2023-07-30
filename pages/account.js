import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductBox from '@/components/ProductBox';
import Spinner from '@/components/Spinner';
import Title from '@/components/Title';
import WhiteBox from '@/components/WhiteBox';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { RevealWrapper } from 'next-reveal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [state, setState] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [wishedProducts, setWishedProducts] = useState([])

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn('google', {
      callbackUrl: process.env.NEXT_PUBLIC_URL, // funciona con y sin esta opcion
    });
  }

  async function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, state };
    await axios.put('/api/address', data);
  }

  useEffect(() => {
    axios.get('/api/address').then((response) => {
      if (response.data) {
        const { name, email, city, postalCode, streetAddress, state } =
        response.data;
      setName(name);
      setEmail(email);
      setCity(city);
      setPostalCode(postalCode);
      setStreetAddress(streetAddress);
      setState(state);
      setLoaded(true);
      } else {setLoaded(true)}
      
    });

    axios.get('/api/wishlist').then(response=>{
      if (response.data !== 'No user') setWishedProducts(response.data.map(wp=> wp.product))
    })
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Lista de deseos</h2>
                {wishedProducts.length > 0 && wishedProducts.map(wp =>(
                  <ProductBox key={wp._id} {...wp} wished={true} />
                ))}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>Detalles</h2>
                {!loaded && <Spinner fullWidth={true} />}

                {loaded && (
                  <>
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Correo"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="Ciudad"
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Codigo Postal"
                        value={postalCode}
                        name="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Dirección"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Estado"
                      value={state}
                      name="state"
                      onChange={(ev) => setState(ev.target.value)}
                    />
                    <Button onClick={saveAddress} black block>
                      Guardar
                    </Button>
                    <hr />
                  </>
                )}

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
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
