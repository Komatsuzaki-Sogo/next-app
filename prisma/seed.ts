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
      profileImage: null,
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      posts: {
        create: [
          {
            title: 'パスワード管理1',
            userName: 'testuser01',
            email: 'password-01@gmail.com',
            password: 'password-01',
            shared: true,
          },
          {
            title: 'パスワード管理2',
            userName: 'testuser02',
            email: 'password-02@gmail.com',
            password: 'password-02',
            shared: true,
          },
          {
            title: 'パスワード管理3',
            userName: 'testuser03',
            email: 'password-03@gmail.com',
            password: 'password-03',
            shared: true,
          },
          {
            title: 'パスワード管理4',
            userName: 'testuser04',
            email: 'password-04@gmail.com',
            password: 'password-04',
            shared: true,
          },
          {
            title: 'パスワード管理6',
            email: 'password-06@gmail.com',
            password: 'password-06',
            shared: true,
          },
          {
            title: 'パスワード管理7',
            email: 'password-07@gmail.com',
            password: 'password-07',
            shared: true,
          },
          {
            title: 'パスワード管理8',
            email: 'password-08@gmail.com',
            password: 'password-08',
            shared: true,
          },
          {
            title: 'パスワード管理9',
            email: 'password-09@gmail.com',
            password: 'password-09',
            shared: true,
          },
          {
            title: 'パスワード管理10',
            email: 'password-010@gmail.com',
            password: 'password-010',
            shared: true,
          },
          {
            title: 'パスワード管理11',
            email: 'password-011@gmail.com',
            password: 'password-011',
            shared: true,
          },
          {
            title: 'パスワード管理12',
            email: 'password-012@gmail.com',
            password: 'password-012',
            shared: true,
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
