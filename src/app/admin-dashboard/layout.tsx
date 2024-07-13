'use client';

import { AuthGuard } from 'src/auth/guard';
import AdminGuard from 'src/auth/guard/admin-guard';
import DashboardLayout from 'src/layouts/admin-dashboard';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AdminGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AdminGuard>
  );
}
