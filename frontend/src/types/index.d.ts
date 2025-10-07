// global types

interface User {
  id: String;
  username: String;
  name: String;
  phone: String;
  password: String;
  refreshToken: String | null;
  createdAt: DateTime;
  updatedAt: DateTime;
}

type AuthT = User & {
  password: null;
  refreshToken: string;
  accessToken: string;
};

type SignupPayload = pick<User, "username" | "name", "phone" | "password">;

type LoginPayload = pick<User, "phone" | "password">;

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  mediaURLs: string[];
  createdAt: Date;
  updatedAt: Date;
}

type CreatePostPayload = Pick<Post, "title" | "content">;

type UpdatePostPayload = Pick<Post, "title" | "content">;
