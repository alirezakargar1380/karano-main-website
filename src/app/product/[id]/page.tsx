import axios, { endpoints } from 'src/utils/axios';

import { ProductShopDetailsView } from 'src/sections/product/view';

// /product/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2/
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Product: Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ProductShopDetailsPage({ params }: Props) {
  const { id } = params;

  return <ProductShopDetailsView id={id} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product: { id: string }) => ({
    id: product.id,
  }));
}
