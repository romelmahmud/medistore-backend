export declare const auth: import("better-auth/*").Auth<{
    database: (options: import("better-auth/*").BetterAuthOptions) => import("better-auth/*").DBAdapter<import("better-auth/*").BetterAuthOptions>;
    cookie: {
        httpOnly: boolean;
        sameSite: string;
        secure: boolean;
    };
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                required: false;
            };
            phone: {
                type: "string";
                required: false;
            };
            status: {
                type: "string";
                defaultValue: string;
                required: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: false;
    };
    socialProviders: {
        google: {
            prompt: "select_account consent";
            accessType: "offline";
            clientId: string;
            clientSecret: string;
        };
    };
    databaseHooks: {
        user: {
            create: {
                before: (user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & Record<string, unknown>, ctx: import("better-auth/*").GenericEndpointContext | null) => Promise<{
                    data: {
                        role: unknown;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                }>;
            };
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map