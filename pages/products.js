import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductsGrid from '@/components/ProductsGrid';
import Title from '@/components/Title';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { getServerSession } from 'next-auth';
import styled from 'styled-components';
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from '@/models/WishedProduct';
import NewProducts from '@/components/NewProducts';

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Todos los productos</Title>
        <ProductsGrid products={products} wishedProducts={wishedProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  const user = session?.user
  const wishedProducts = await WishedProduct.find({
    userEmail: user?.email,
    product: products.map(p=>p._id.toString())
  })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map((i) => i.product.toString()),
    },
  };
}
