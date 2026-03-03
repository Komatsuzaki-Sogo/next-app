export type User = {
  id: string;
  profileImage: string | null;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProps = { user: User };
