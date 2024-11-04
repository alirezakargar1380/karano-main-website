import { PhoneVerifyView } from 'src/sections/auth/phone/view';
import PhoneResetPasswordView from 'src/sections/auth/phone/view/reset-password-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Phone: Reset Password',
};

export default function ResetPasswordPage() {
  return <PhoneResetPasswordView />;
}
