import { PrismaClient } from '@prisma/client';
import * as bcypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcypt.hash('password123', 12);

  // ユーザー作成
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: 'パスワード管理1',
            email: 'password-01@gmail.com',
            password: 'password-01',
            published: true,
          },
          {
            title: 'パスワード管理2',
            email: 'password-01@gmail.com',
            password: 'password-02',
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
