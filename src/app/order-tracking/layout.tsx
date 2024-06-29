'use client';

import { AuthGuard } from 'src/auth/guard';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
