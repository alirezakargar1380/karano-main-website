import { OverviewAppView } from 'src/sections/admin-overview/app/view';
import AdminPanelOverview from 'src/sections/admin-panel/view/overview-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: App',
};

export default function OverviewPage() {
  return <AdminPanelOverview />;
}
