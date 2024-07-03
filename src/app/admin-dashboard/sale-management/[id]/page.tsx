import axios, { endpoints } from 'src/utils/axios';

import { ProductShopDetailsView } from 'src/sections/product/view';
import { SaleManagementDetailsView } from 'src/sections/admin-panel/sale-management/view';
import { Viewport } from 'next';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'sale-management: Details',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

type Props = {
  params: {
    id: string;
  };
};

export default function SaleManagementDetailsPage({ params }: Props) {
  const { id } = params;

  return <SaleManagementDetailsView id={id} />;
}

// export async function generateStaticParams() {
//   const res = await axios.get(endpoints.product.list);

//   return res.data.products.map((product: { id: string }) => ({
//     id: product.id,
//   }));
// }
