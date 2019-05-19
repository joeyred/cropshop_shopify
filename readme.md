# CropShop Shopify App

# Config

More to come.

# Theme Asset Additions

More to come.

# Server Utilities

## Routes

The Routes module encapsulates the koa or koa router method for adding
routes and middleware. The registered routes are then able to be checked against in the
final `router.get` call in the `server.js` file, which would normally turn all query
handling over to NextJS.

### API

#### `registerKoaRoute(path, middleware)`

This method allows for the registering of routes. It is to be used the exact same way
`router.use` or `server.use` would be implemented. The difference is that this method will
add the path string to an array to be used in `isKoaRoute`.

This means that with a single method call, the path will be automatically isolated from
NextJS.

#### `isKoaRoute(queryPath)`

This method looks at all registered paths and and checks if any match with the path
passed to it. This is meant to be used in the final `router.get` call inside of a
conditional statement.
