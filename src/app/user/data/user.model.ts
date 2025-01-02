export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    birthday: Date;
    password: string;
    session: {
        id: string;
        token: string;
    };
};
