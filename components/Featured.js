import Center from '@/components/Center';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import FlyingButton from './FlyingButton';
import { RevealWrapper } from 'next-reveal';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <RevealWrapper origin={'left'}>
                <Title>{product.title}</Title>
                <Desc>{product.description.substring(0, 150)}...</Desc>
                <ButtonsWrapper>
                  <ButtonLink
                    href={'/product/' + product._id}
                    outline={1}
                    white={1}
                    size="l"
                  >
                    Leer mas
                  </ButtonLink>
                  <FlyingButton
                    white
                    _id={product._id}
                    src={product.images?.[0]}
                  >
                    <CartIcon />
                    Agregar al carrito
                  </FlyingButton>
                </ButtonsWrapper>
              </RevealWrapper>
            </div>
          </Column>
          <Column>
            <RevealWrapper>
              <img src={product.images[0]} alt="" />
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
