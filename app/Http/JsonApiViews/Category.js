const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Category extends JsonApiView {
  get attributes() {
    return ['name'];
  }

  organizations() {
    return this.hasMany('App/Http/JsonApiViews/Organization', {
      included: true,
      excludeRelation: 'category'
    });
  }

}

module.exports = Category;
