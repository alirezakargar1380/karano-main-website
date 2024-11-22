import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'ثبت نام ادمین در کارانو',
};

export default function LoginOrRegisterPage() {
  return <JwtLoginView />;
}
