import { defineMiddleware } from "astro:middleware";

/* Only preview site is deployed via SSR, so we can always ensure we don't index this page */
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Only intercept headers for document requests
  if (context.request.headers.get("Accept")?.includes("text/html")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
});
