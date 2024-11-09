import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';
import ShoppingCartButton from '../common/shopping-cart-button';
import LoginButton from '../common/login-button';
import Image from 'src/components/image';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: paths.about },
      { name: 'Contact us', href: paths.contact },
      { name: 'FAQs', href: paths.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
  {
    headline: 'Contact',
    children: [{ name: 'support@minimals.cc', href: '#' }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const homePage = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href="https://minimals.cc/"> minimals.cc </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Stack direction={"row"} sx={{ border: '1px solid #D1D1D1', borderRadius: '36px', px: 4, my: 6 }}>
      <Logo sx={{ my: 3 }} />
      <Stack direction={'row'} justifyItems={'center'}>
        {/* <NavDesktop data={navConfig} /> */}
      </Stack>
      <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }} sx={{ ml: 'auto', }} spacing={0.7}>
        <Box sx={{ borderLeft: '2px solid #000000' }} display={'flex'} alignItems={'center'} gap={'8px'}>
          <Typography variant='body3' sx={{ pt: 0.5, pl: 2 }}>karanowood</Typography>
          <SvgColor src='/assets/icons/home/instagram.svg' sx={{ width: 24, height: 24 }} />
        </Box>
        <LoginButton />
      </Stack>
    </Stack>
  );

  return mainFooter;

  // return homePage ? simpleFooter : mainFooter;
}
