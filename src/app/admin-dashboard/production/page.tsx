import { Viewport } from 'next';
import { ProductionListView } from 'src/sections/admin-panel/production/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Admin: Production',
};

const viewport: Viewport = {
}

export default function ProductionListPage() {
  return <ProductionListView />;
}
