import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import Title from '@/components/Title';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import styled from 'styled-components';

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;
`

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Todas Las Categorias</Title>
        {mainCategories.map((cat) => (
          <div key={cat._id}>
            <h2>{cat.name}</h2>
            <CategoryGrid>
              {categoriesProducts[cat._id].map((p) => (
                <ProductBox key={p._id} {...p} />
              ))}
            </CategoryGrid>
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find({});
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id);
    const categoriesIds = [mainCatId, ...childCatIds]
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
