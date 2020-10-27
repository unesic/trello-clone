// Initializes the `lists` service on path `/lists`
const { Lists } = require('./lists.class');
const createModel = require('../../models/lists.model');
const hooks = require('./lists.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/lists', new Lists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('lists');

  service.hooks(hooks);
};
