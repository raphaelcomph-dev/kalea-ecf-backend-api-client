import { Constants } from "./shared/constants";

export class AppSettings {
    public static env = {
        PORT: (): number => parseInt(process.env.APP_PORT) || 3000,
        NODE_ENV: (): string => process.env.NODE_ENV,
        JWT: {
            ACCESS_TOKEN: {
                SECRET: (): string => process.env.JWT_ACCESS_TOKEN_SECRET,
                EXPIRES_IN: (): string => process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            },
            REFRESH_TOKEN: {
                SECRET: (): string => process.env.JWT_REFRESH_TOKEN_SECRET,
                EXPIRES_IN: (): string => process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
            },
        },
        DATABASE: {
            MSSQL: {
                DB_NAME: (): string => process.env.DB_NAME,
                DB_HOST: (): string => process.env.DB_HOST,
                DB_PORT: (): number => parseInt(process.env.DB_PORT),
                DB_USERNAME: (): string => process.env.DB_USERNAME,
                DB_PASSWORD: (): string => process.env.DB_PASSWORD,
            },
        },
        MAIL: {
            MAILGUN: {
                USER: (): string => process.env.MAILGUN_USER,
                PASSWORD: (): string => process.env.MAILGUN_PASSWORD,
            },
        },
        PORTAL: {
            BASE_URL: (): string => process.env.PORTAL_BASE_URL,
            PATHS: {
                LOGIN: (): string => `${process.env.PORTAL_BASE_URL}${process.env.PORTAL_PATHS_LOGIN}`,
            },
        },
    };

    public static isLocalEnv = (): boolean => AppSettings.env.NODE_ENV() === Constants.ENVIRONMENTS.LOCAL;
}
