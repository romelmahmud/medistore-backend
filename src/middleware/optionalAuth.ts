import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Convert Express headers to Fetch Headers
    const headers = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      }
    });

    const session = await auth.api.getSession({
      headers,
    });
    if (session?.user) {
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        emailVerified: session.user.emailVerified,
        role: session.user.role ?? "CUSTOMER", // fallback
      };
    }
    next();
  } catch (error) {
    next(); // never block guest
  }
};
