import { CommonSection } from '@/components/layouts/CommonSection';
import { PasswordChangeForm } from '@/components/pages/user/PasswordChangeForm';
import { UserInfo } from '@/components/pages/user/UserInfo';

export default function UserPage() {
  return (
    <CommonSection>
      <UserInfo />
      <PasswordChangeForm />
    </CommonSection>
  );
}
