'use client';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>
  // return (
  //   <AuthGuard>
  //     <DashboardLayout>{children}</DashboardLayout>
  //   </AuthGuard>
  // );
}
