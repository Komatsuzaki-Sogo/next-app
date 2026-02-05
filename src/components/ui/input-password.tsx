'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

type Props = {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputPassword({
  id,
  name,
  placeholder,
  required,
  handleBlur,
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={onChange}
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
