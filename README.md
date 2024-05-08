# Clerk 5 express middleware

This repo is a demonstration of a bug in Clerk 5 express middleware.

## Getting started

1. Create `.env`

   ```
   // .env
   CLERK_SECRET_KEY=REPLACE_ME
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Run app

   ```
   npm run dev
   ```

4. Visit `http://localhost:3000/protected`

## Bug

When visiting a protected route, the Clerk middleware crashes with the following error:

```sh
/home/clerk5-express/node_modules/@clerk/shared/src/keys.ts:43
      throw new Error('Publishable key not valid.');
            ^
Error: Publishable key not valid.
    at parsePublishableKey (/home/clerk5-express/node_modules/@clerk/shared/src/keys.ts:43:13)
    at authenticateRequest (/home/clerk5-express/node_modules/@clerk/backend/src/tokens/request.ts:180:14)
    at Proxy.authenticateRequest2 (/home/clerk5-express/node_modules/@clerk/backend/src/tokens/factory.ts:51:12)
    at authenticateRequest (/home/clerk5-express/node_modules/@clerk/clerk-sdk-node/src/authenticateRequest.ts:34:22)
    at /home/clerk5-express/node_modules/@clerk/clerk-sdk-node/src/clerkExpressWithAuth.ts:9:34
    at Layer.handle [as handle_request] (/home/clerk5-express/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/clerk5-express/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/home/clerk5-express/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/home/clerk5-express/node_modules/express/lib/router/layer.js:95:5)
    at /home/clerk5-express/node_modules/express/lib/router/index.js:284:15
```

## Observations

The demo app is created using the guides:

- https://clerk.com/docs/references/nodejs/overview
- https://clerk.com/docs/backend-requests/handling/nodejs

The publishable key is not mentioned, only the secret key. As express runs on the server, the publishable key should not be used.
