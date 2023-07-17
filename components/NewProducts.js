import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';
import ProductsGrid from './ProductsGrid';


const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products }) {
  {
    products?.length > 0 &&
      products.map((product) => {
      });
  }
  return (
    <Center>
      <Title>Ultimos Productos</Title>
      <ProductsGrid products={products}/>
    </Center>
  );
}
