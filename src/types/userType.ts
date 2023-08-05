interface UserTable {
  user_id: number;
  email: string;
  password: string;
}

export type SignUp = Pick<UserTable, 'email' | 'password'>;

export type LogIn = Pick<UserTable, 'email' | 'password'>;

export type Info = Pick<UserTable, 'user_id' | 'email' | 'password'>;

export type Payload = Pick<UserTable, 'user_id' | 'email'>;

export type Tokens = { accessToken: string; refreshToken: string };
