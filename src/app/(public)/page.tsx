import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'パスワード管理アプリ',
  description: 'パスワード管理アプリのトップページです。',
};

import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';
import { TextBase } from '@/components/ui/text-base';

export default async function PostsPage() {
  return (
    <CommonSection>
      <HeadingLevel01>HOME</HeadingLevel01>
      <TextBase>
        <p>あああああああああああああああW</p>
        <p>あああああああああああああああああああああW</p>
      </TextBase>
    </CommonSection>
  );
}
