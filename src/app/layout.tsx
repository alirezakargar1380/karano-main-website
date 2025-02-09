import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider } from 'src/auth/context/jwt';
import { OrderContext } from 'src/sections/order/context/order-context';
import { OrderProvider } from 'src/sections/order/context/order-provider';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Karano',
  description:
    'wood',
  keywords: 'react,material,kit,application,dashboard,admin,template',
  // themeColor: '#000000',
  // manifest: '/manifest.json',
  // viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/logo/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/logo/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/logo/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/logo/apple-touch-icon.png' },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000'
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fa" dir='rtl'>
      <meta name="enamad" content="6190063" />
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'rtl', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <CheckoutProvider>
                      <OrderProvider>
                        <SettingsDrawer />
                        <ProgressBar />
                        {children}
                      </OrderProvider>
                    </CheckoutProvider>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
