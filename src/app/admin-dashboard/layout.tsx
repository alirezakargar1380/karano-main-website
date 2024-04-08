'use client';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/admin-dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>
  // return (
  //   <AuthGuard>
  //     <DashboardLayout>{children}</DashboardLayout>
  //   </AuthGuard>
  // );
}
