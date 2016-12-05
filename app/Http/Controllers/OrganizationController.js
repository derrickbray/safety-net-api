'use strict';

const Organization = use('App/Model/Organization');
const attributes = ['name', 'address', 'phone', 'website', 'lat', 'lng'];

class OrganizationController {

  * index(request, response) {
    const organizations = yield Organization.with('user').fetch();

    response.jsonApi('Organization', organizations);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };
    const organization = yield Organization.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Organization', organization);
  }

  * show(request, response) {
    const id = request.param('id');
    const organization = yield Organization.with('user').where({ id }).firstOrFail();

    response.jsonApi('Organization', organization);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };

    const organization = yield Organization.with('user').where({ id }).firstOrFail();
    organization.fill(Object.assign({}, input, foreignKeys));
    yield organization.save();

    response.jsonApi('Organization', organization);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const organization = yield Organization.query().where({ id }).firstOrFail();
    yield organization.delete();

    response.status(204).send();
  }

}

module.exports = OrganizationController;
