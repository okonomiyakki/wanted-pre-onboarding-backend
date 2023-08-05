interface UserTable {
    id: number;
    email: string;
    password: string;
}

export type SignUp = Pick<UserTable, 'email' | 'password'>;

export type LogIn = Pick<UserTable, 'email' | 'password'>;
