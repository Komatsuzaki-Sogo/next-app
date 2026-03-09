import { Prisma } from '@prisma/client';

export type DashboardPostType = Prisma.PostGetPayload<{
  select: {
    id: true;
    title: true;
    userName?: true;
    email: true;
    password: true;
    shared: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type PostCardProps = {
  post: DashboardPostType;
};
