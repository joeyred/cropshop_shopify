require('isomorphic-fetch');
// Koa
const Koa = require('koa');
const session = require('koa-session');
const Router = require('koa-router');
const serve = require('koa-static');

// This lets us use values from .env from `process.env`
require('dotenv').config();
// NextJS
const next = require('next');

// Shopify Koa
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

// Node.js stuff
// TODO Replace with config
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
// NextJS setup
const app = next({ dev });
const handle = app.getRequestHandler();

// Axios for API calls
const axios = require('axios');
const _ = require('lodash');

// Utils
const Routes = require('./server/utils/koa-routes');

// Routes
const install = require('./server/routes/install');

// TODO Replace with config
const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  API_VERSION
} = process.env;

// NOTE / WARNING //
// In this context `app` refers to what NextJS is doing, and `server` refers to what is
// typically called `app` in an express or koa application.
//
// When reading any refernces or documentation concerning express and koa, their `app` is
// `server` in this file.
app.prepare().then(() => {
  // The server will be provided by Koa
  const server = new Koa();
  const router = new Router();
  // This will allow routes that must be isolated from NextJS to be registered and
  // properly checked against.
  const routes = new Routes(router);

  // sets up secure session data on each request
  server.use(session(server));

  // TODO ???? why is this here?
  server.keys = [SHOPIFY_API_SECRET_KEY];

  // TODO Replace route additions with a method that not only adds the route and
  // middleware, but adds the path to a method that outputs conditionals to properly
  // isolate these routes from NextJS

  // Set up non-NextJS controlled routes
  // router.use('/install', install);

  routes.registerKoaRoute('/install', install);



  server.use(serve('./public'));

  // Shopify Auth Middleware
  server.use(
    // This runs for /auth
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      // This defines what the app can sccess through the API
      // These are basically permissions
      scopes: [
        'read_products', 'write_products',
        'read_themes', 'write_themes'
      ],
      // `ctx` means "context" in koa
      // this basically combines response and request objects express would use
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });

        ctx.redirect('/install');
      },
    }),
  );

  // server.use('/install', install);

  // This must be updated at least once every 9 months to use most
  // current and supported API version
  //
  // @link https://developers.shopify.com/tutorials/
  // build-a-shopify-app-with-node-and-react/fetch-data-with-apollo#set-up-graphql
  server.use(graphQLProxy({version: ApiVersion.April19}));

  // WARNING
  // Everything after this point will require authentication.

  // NOTE Seperating NextJS from Koa
  //
  // Using a conditional statement, control will only be handed off to NextJS's
  // `handle` method if the paths are not specified koa controlled routes.
  router.get('*', verifyRequest(), async (ctx) => {
    // Only log to console in dev
    if (dev) {
      console.log(ctx.request.url);
      console.log(ctx.path);
    }

    if (!routes.isKoaRoute(ctx.path)) {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    }
  });

  // Set up the router as valid middleware
  // @link https://github.com/ZijianHe/koa-router
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
