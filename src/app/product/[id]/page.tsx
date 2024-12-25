import { Metadata } from 'next';
import { ProductShopDetailsView } from 'src/sections/product/view';
import { IProductMetaTags } from 'src/types/product';
import { server_axios } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  // Fetch product data from server
  const { data }: { data: IProductMetaTags } = await server_axios.get(`/api/meta-tags/${id}`);

  console.log(data);

  return {
    title: data?.title || 'جزئیات محصول',
    description: data?.description || '',
    keywords: data?.meta_tags || 'محصول، فروشگاه، فروشگاه اینترنتی',
  };
}

export default function ProductShopDetailsPage({ params }: Props) {
  const { id } = params;

  return <ProductShopDetailsView id={id} />;
}
