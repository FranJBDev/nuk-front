import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductBox from '@/components/ProductBox';
import SingleOrder from '@/components/SingleOrder';
import Spinner from '@/components/Spinner';
import Tabs from '@/components/Tabs';
import Title from '@/components/Title';
import WhiteBox from '@/components/WhiteBox';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { RevealWrapper } from 'next-reveal';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const NavLink = styled(Link)`
  gap: 20px;
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavWrapper = styled.div`
  padding: 20px;
  text-align: center;
`

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [state, setState] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishListLoaded, setWishListLoaded] = useState(true);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Ordenes');
  const [orders, setOrders] = useState([]);

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
    if (!session) {
      return;
    }

    setAddressLoaded(false);
    setWishListLoaded(false);
    setOrdersLoaded(false);
    axios.get('/api/address').then((response) => {
      const { name, email, city, postalCode, streetAddress, state } =
        response.data;
      setName(name);
      setEmail(email);
      setCity(city);
      setPostalCode(postalCode);
      setStreetAddress(streetAddress);
      setState(state);
      setAddressLoaded(true);
    });

    axios.get('/api/wishlist').then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishListLoaded(true);
    });

    axios.get('/api/orders').then((response) => {
      setOrders(response.data);
      setOrdersLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Ordenes', 'Lista de deseos']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Ordenes' && (
                  <>
                    {!ordersLoaded && <Spinner fullWidth={true} />}
                    {ordersLoaded && (
                      <div>
                        {!session && <p>Ingresa para ver tus ordenes.</p>}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder key={o._id} {...o} />)}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Lista de deseos' && (
                  <>
                    {!wishListLoaded && <Spinner fullWidth={true} />}

                    {wishListLoaded && (
                      <>
                        <WishedProductGrid>
                          {wishedProducts.length > 0 &&
                            wishedProducts.map((wp) => (
                              <ProductBox
                                key={wp._id}
                                {...wp}
                                wished={true}
                                onRemoveFromWishlist={
                                  productRemovedFromWishlist
                                }
                              />
                            ))}
                        </WishedProductGrid>

                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Tu lista esta vacia</p>}
                            {!session && (
                              <p>
                                Ingresa para agregar productos a tu lista de
                                deseos.
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Detalles' : 'Ingresar'}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}

                {addressLoaded && session && (
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
                    Ingresar con Google
                  </Button>
                )}
                <NavWrapper>
                  <NavLink href={'/privacy'}>Aviso de Privacidad </NavLink>
                </NavWrapper>
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
