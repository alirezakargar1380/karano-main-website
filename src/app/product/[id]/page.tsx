import { Metadata } from 'next';
import { BACKEND_API } from 'src/config-global';
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

  const data = await fetch(BACKEND_API + `/api/meta-tags/${id}`, {
      // cache: 'no-store',
      next: { revalidate: 60 },
    }).then((res) => res.json());

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
