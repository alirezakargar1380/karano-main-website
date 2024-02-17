import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'پیگیری سفارش',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'نحوه سفارش',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.components,
  },
  {
    title: 'سوالات متداول',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
  },
  {
    title: 'درباره کارانو',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
  },
  {
    title: 'تماس با ما',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.docs,
  },
];
