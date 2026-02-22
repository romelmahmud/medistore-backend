"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const client_1 = require("../../generated/prisma/client");
function errorHandler(err, req, res, next) {
    let success = false;
    let status = 500;
    let title = "Internal Server Error";
    let message = "Something went wrong on the server.";
    let details = undefined;
    // === Prisma Errors ===
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        status = 400;
        title = "Validation Error";
        message = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002": // Unique constraint failed
                status = 409;
                title = "Conflict Error";
                message = "Duplicate value exists for a unique field.";
                details = err.meta;
                break;
            case "P2025": // Record not found
                status = 404;
                title = "Not Found";
                message = "Required record does not exist.";
                details = err.meta;
                break;
            default:
                status = 400;
                title = "Database Error";
                message = err.message;
                details = err.meta;
                break;
        }
    }
    else if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        status = 500;
        title = "Unknown Database Error";
        message = err.message;
    }
    else if (err instanceof client_1.Prisma.PrismaClientRustPanicError) {
        status = 500;
        title = "Prisma Engine Crash";
        message = err.message;
    }
    // === Custom Error objects ===
    else if (typeof err === "object" && err !== null && "statusCode" in err) {
        const e = err;
        status = e.statusCode || 500;
        title = e.title || "Error";
        message = e.message || "Something went wrong";
        details = e.details;
    }
    // === Fallback for other unknown errors ===
    else if (err instanceof Error) {
        message = err.message;
    }
    // Return structured JSON response
    const response = {
        success,
        status,
        title,
        message,
        ...(details && { details }),
    };
    res.status(status).json(response);
}
//# sourceMappingURL=errorHandler.js.map