import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavProps } from '../types';

// ----------------------------------------------------------------------

export default function NavDesktop({ data }: NavProps) {
  return (
    <Stack component="nav" direction="row" spacing={1} sx={{ ml: '54px', height: 1 }}>
      {data.map((list) => (
        <NavList key={list.title} data={list} />
      ))}
    </Stack>
  );
}
