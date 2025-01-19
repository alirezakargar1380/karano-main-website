import { Metadata } from 'next';
import { BACKEND_API } from 'src/config-global';
import { HomeView } from 'src/sections/home/view';
import { ISettings } from 'src/types/settings';
import { endpoints, server_axios, fetcher } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  // Fetch product data from server
  // const { data }: { data: ISettings } = await server_axios.get(endpoints.settings.meta);

  const data = await fetch(BACKEND_API + endpoints.settings.meta, {
    cache: 'no-store',
    // next: { revalidate: 60 },
  }).then((res) => res.json());

  console.log(data);

  return {
    title: data?.meta_title || 'جزئیات محصول',
    description: data?.meta_description || '',
    keywords: data?.meta_tags || 'محصول، فروشگاه، فروشگاه اینترنتی',
  };
}

export default function HomePage() {
  return <HomeView />;
}
