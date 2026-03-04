import { CommonSection } from '@/components/layouts/CommonSection';
import { LoginForm } from '@/components/pages/auth/LoginForm';
export default function LoginPage() {
  return (
    <CommonSection fullHeight>
      <div className="flex flex-col justify-center h-full">
        <LoginForm />
      </div>
    </CommonSection>
  );
}
