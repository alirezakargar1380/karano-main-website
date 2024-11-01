'use client';

import { Grid } from '@mui/material';
import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    // <GuestGuard>
      <AuthClassicLayout maxWidth={780}>
        {children}
      </AuthClassicLayout>
    // </GuestGuard>
  );
}
