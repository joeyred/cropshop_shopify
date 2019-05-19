/* eslint prefer-arrow-callback: 0 */

const Routes = require('./koa-routes');

describe('Routes', () => {
  describe('Routes Constructor', () => {
    // beforeEach(() => {
    //
    // });
    // afterEach(() => {
    // });
    it('Properly assigns the router object', () => {
      const MockFn = jest.fn();
      const routerTest = new MockFn();
      const routes = new Routes(routerTest);
      expect(routes.router).toEqual(routerTest);
    });

    it('Creates and empty Array for this.routes', () => {
      const MockFn = jest.fn();
      const routerTest = new MockFn();
      const routes = new Routes(routerTest);
      expect(routes.routes).toEqual([]);
    });

  });
});
