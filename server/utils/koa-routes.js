/**
 * @module Routes
 *
 * A module meant to make it simple to seperate route handling between Koa and NextJS,
 * All while still calling a single method to register paths and an extra method to
 * handle the conditional in the final `router.use`.
 *
 * @since 0.1.0
 */
class Routes {

  /**
   * Routes Insatnce
   *
   * @method constructor
   *
   * @param  {Object}    router - The object currently handling server routing.
   */
  constructor(router) {
    this.router = router;
    this.routes = [];
  }

  /**
   * Method to be used in place of `router.use` when adding a Koa route
   * that will not be handled by NextJS
   *
   * @method registerKoaRoute
   *
   * @public
   *
   * @param  {String}         path       - The path endpoint being queried.
   * @param  {Func}           middleware - The middleware to be invoked for the query.
   */
  registerKoaRoute(path, middleware) {
    this.router.use(path, middleware);
    this.routes.push(path);
  }

  /**
   * Checks the passed path against all registered Koa only paths and
   * returns true if there is a match.
   *
   * @method isKoaRoute
   *
   * @public
   *
   * @param  {String}   queryPath - The path currently being queried.
   * @return {Boolean}            - True if a match is found, false if not.
   */
  isKoaRoute(queryPath) {
    if (this.routes.length > 0) {
      for (let i = 0; i < this.routes.length; i++) {
        if (queryPath === this.routes[i]) {
          return true;
        }
      }
    } else {
      return false;
    }
    return false;
  }
}

module.exports = Routes;
