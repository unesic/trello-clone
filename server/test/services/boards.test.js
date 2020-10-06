const app = require('../../src/app');

describe('\'boards\' service', () => {
  it('registered the service', () => {
    const service = app.service('boards');
    expect(service).toBeTruthy();
  });
});
