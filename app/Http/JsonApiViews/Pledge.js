const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Pledge extends JsonApiView {
  get attributes() {
    return ['name', 'description', 'contact_info', 'end_date', 'deleted_at', 'is_claimed', 'is_approved'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'pledges',
    });
  }

}

module.exports = Pledge;
