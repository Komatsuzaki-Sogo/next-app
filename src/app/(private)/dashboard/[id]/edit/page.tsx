import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { Edit } from 'lucide-react';
import { EditDashboardPost } from '@/components/pages/dashboard/EditDashboardPost';

type Params = {
  params: Promise<{ id: string }>;
};
export default async function EditPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const { id } = await params;
  const post = await getPost(userId, id);

  if (!post) {
    notFound();
  }
  return (
    <CommonSection>
      <EditDashboardPost post={post} />
    </CommonSection>
  );
}
