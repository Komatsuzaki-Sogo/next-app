export type Post = {
  id: string;
  title: string;
  email: string;
  password: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

export type PostCardProps = { post: Post };
