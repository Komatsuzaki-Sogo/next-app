export type User = {
  id?: string;
  profileImage: string | null;
  name: string;
  email: string;
  createdAt: Date;
};

export type UserProps = { user: User };
