import { CommonSection } from '@/components/layouts/CommonSection';
import { SignupForm } from '@/components/pages/auth/SignupForm';

export default function SignupPage() {
  return (
    <CommonSection fullHeight>
      <div className="flex flex-col justify-center h-full">
        <SignupForm />
      </div>
    </CommonSection>
  );
}
