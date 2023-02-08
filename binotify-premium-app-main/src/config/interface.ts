interface IConfig {
    env: string;
    port: number;
    db: {
        host: string;
        port: number;
        name: string;
        user: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
}

interface IUser {
    name: string;
    age: number;
}

export type { 
    IConfig, 
    IUser 
};