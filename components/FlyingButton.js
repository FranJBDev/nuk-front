import { primary } from '@/lib/colors';
import { ButtonStyle } from './Button';
import FlyingButtonOriginal from 'react-flying-item';
import { CartContext } from './CartContext';
import { useContext } from 'react';
import styled from 'styled-components';

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle}
    ${(props) =>
      props.main
        ? `
    background-color: ${primary};
    color:white;
    `
        : `
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
    `}
    ${(props) =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;      
      font-weight: 500;
      padding: 10px 15px;
    `}
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  return (
    <FlyingButtonWrapper
      white={props.white}
      main={props.main}
      onClick={() => addProduct(props._id)}
    >
      <FlyingButtonOriginal
        {...props}
        targetTop={'5%'}
        targetLeft={'95%'}
        flyingItemStyling={{
          width: 'auto',
          height: 'auto',
          maxWidth: '60px',
          maxHeight: '60px',
          borderRadius: 0,
        }}
      />
    </FlyingButtonWrapper>
  );
}
