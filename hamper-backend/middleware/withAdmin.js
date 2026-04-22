// middleware/withAdmin.js
// Higher-order function that wraps any route handler with JWT protection.
//
// Usage:
//   export const GET = withAdmin(async (request, context, admin) => { ... });

import { getAdminFromRequest, unauthorised } from "@/lib/auth";

/**
 * @param {(request: Request, context: any, admin: object) => Response} handler
 * @returns {(request: Request, context: any) => Response}
 */
export function withAdmin(handler) {
  return async function (request, context) {
    const admin = getAdminFromRequest(request);

    if (!admin) {
      return unauthorised("You must be logged in as admin");
    }

    return handler(request, context, admin);
  };
}
