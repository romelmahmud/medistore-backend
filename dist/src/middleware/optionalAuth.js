"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = void 0;
const auth_1 = require("../lib/auth");
const optionalAuth = async (req, res, next) => {
    var _a;
    try {
        // Convert Express headers to Fetch Headers
        const headers = new Headers();
        Object.entries(req.headers).forEach(([key, value]) => {
            if (typeof value === "string") {
                headers.append(key, value);
            }
            else if (Array.isArray(value)) {
                value.forEach((v) => headers.append(key, v));
            }
        });
        const session = await auth_1.auth.api.getSession({
            headers,
        });
        if (session === null || session === void 0 ? void 0 : session.user) {
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                emailVerified: session.user.emailVerified,
                role: (_a = session.user.role) !== null && _a !== void 0 ? _a : "CUSTOMER", // fallback
            };
        }
        next();
    }
    catch (error) {
        next(); // never block guest
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=optionalAuth.js.map