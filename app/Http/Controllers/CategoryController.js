'use strict';

const Category = use('App/Model/Category');
const attributes = ['name'];

class CategoryController {

  * index(request, response) {
    const categories = yield Category.with('organizations').fetch();

    response.jsonApi('Category', categories);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const category = yield Category.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Category', category);
  }

  * show(request, response) {
    const id = request.param('id');
    const category = yield Category.with('organizations').where({ id }).firstOrFail();

    response.jsonApi('Category', category);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const category = yield Category.with('organizations').where({ id }).firstOrFail();
    category.fill(Object.assign({}, input, foreignKeys));
    yield category.save();

    response.jsonApi('Category', category);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const category = yield Category.query().where({ id }).firstOrFail();
    yield category.delete();

    response.status(204).send();
  }

}

module.exports = CategoryController;
