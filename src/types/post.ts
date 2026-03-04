import { Prisma } from '@prisma/client';

export type DashboardPostType = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    email: true;
    password: true;
    published: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type PostCardProps = {
  post: DashboardPostType;
};
