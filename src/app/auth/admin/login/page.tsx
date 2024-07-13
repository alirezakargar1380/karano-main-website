import { JwtLoginView } from 'src/sections/auth/jwt';
import { PhoneLoginOrRegisterView } from 'src/sections/auth/phone';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'ثبت نام ادمین در کارانو',
};

export default function LoginOrRegisterPage() {
  return <JwtLoginView />;
}
