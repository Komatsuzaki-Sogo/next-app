import { auth } from '@/auth';
import { getOwnPosts } from '@/lib/ownPost';
import { CommonSection } from '@/components/layouts/CommonSection';
import { HeadingLevel01 } from '@/components/ui/heading-level01';

type SearchParams = {
  search?: string;
};

export default async function DashBoardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです');
  }

  const posts = await getOwnPosts(userId);

  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.search || '';
  console.log('query', query);
  return (
    <CommonSection>
      <HeadingLevel01>{query} の検索結果</HeadingLevel01>

      {posts.length > 0 ? (
        <table className="table-auto w-full border-collapse border mt-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">タイトル</th>
              <th className="border p-2 text-center">メールアドレス</th>
              <th className="border p-2 text-center">パスワード</th>
              <th className="border p-2 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="border p-2">{post.title}</td>
                <td className="border p-2">{post.email}</td>
                <td className="border p-2">{post.password}</td>
                <td className="border p-2">
                  {new Date(post.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-8 text-center text-gray-500">
          <b>データがありません</b>
        </p>
      )}
    </CommonSection>
  );
}
