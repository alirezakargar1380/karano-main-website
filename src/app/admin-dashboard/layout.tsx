'use client';

import AdminGuard from 'src/auth/guard/admin-guard';
import DashboardLayout from 'src/layouts/admin-dashboard';

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
