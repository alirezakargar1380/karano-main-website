import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'پیگیری سفارش',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/order-tracking',
    badge: true
  },
  {
    title: 'نحوه سفارش',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: '/how-order',
    // path: paths.components,
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

export const navDesktopConfig = [
  {
    title: 'دسته بندی محصولات',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/page',
    children: [{
      subheader: 'sdf',
      items: [
        {
          title: 'قطعات درب کابینت',
          path: '',
        },
        {
          title: 'قطعات درب کمد',
          path: '/aa',
        },
        {
          title: 'درب کابینت',
          path: '/aa',
        },
        {
          title: 'قطعات درب اتاقی',
          path: '/aa',
        },
      ]
    }]
  },
];
