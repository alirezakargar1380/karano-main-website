import { SaleManagementDetailsView } from 'src/sections/admin-panel/sale-management/view';
import { Viewport } from 'next';
import { StorageDetailsView } from 'src/sections/admin-panel/storage/view';

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

export default function StorageDetailsPage({ params }: Props) {
  const { id } = params;

  return <StorageDetailsView id={id} />;
}