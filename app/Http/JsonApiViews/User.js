const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'is_admin', 'is_approved'];
  }

  organization() {
    return this.belongsTo('App/Http/JsonApiViews/Organization', {
      included: true,
      excludeRelation: 'user',
    });
  }
}

module.exports = User;
