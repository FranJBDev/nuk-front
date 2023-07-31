import styled from 'styled-components';

const StyledOrder = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: grid;
  gap: 20px;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  time {
    font-size: 0.8rem;
    color: #555;
  }
`;

const ProductRow = styled.div`
  span {
    color: #aaa;
  }
`;

const Address = styled.div`
  font-size: .8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: #888;
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return (
    <StyledOrder>
      <div>
        <time>{new Date(createdAt).toLocaleString('es-MX', dateOptions)}</time>
        <Address>
          {rest.name}<br />
          {rest.email}<br />
          {rest.streetAddress}<br />
          {rest.postalCode} {rest.city}, {rest.state}<br />
        </Address>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={item._id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrder>
  );
}
