export class AppSettings {
    public static env = {
        PORT: (): number => parseInt(process.env.APP_PORT) || 3000,
        NODE_ENV: (): string => process.env.NODE_ENV,
    };
}
