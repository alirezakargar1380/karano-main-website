'use client';

import { Grid } from '@mui/material';
import { GuestGuard } from 'src/auth/guard';
import AdminGuestGuard from 'src/auth/guard/admin-guest-guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AdminGuestGuard>
      <AuthClassicLayout maxWidth={320}>
        {children}
      </AuthClassicLayout>
    </AdminGuestGuard>
  );
}
