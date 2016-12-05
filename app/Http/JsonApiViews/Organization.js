const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Organization extends JsonApiView {
  get attributes() {
    return ['name', 'address', 'phone', 'website', 'lat', 'lng'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'organizations'
    });
  }

}

module.exports = Organization;
