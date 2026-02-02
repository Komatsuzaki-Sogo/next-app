import { useState } from 'react';
import { Input } from '@/components/ui/input';

type InputPasswordProps = {
  id?: string;
  name?: string;
  required?: boolean;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default function InputPassword({
  id,
  name,
  required,
  handleBlur,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        name={name}
        required={required}
        onBlur={handleBlur}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
      >
        {showPassword ? '非表示' : '表示'}
      </button>
    </div>
  );
}
