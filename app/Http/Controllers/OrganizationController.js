'use strict';

const Organization = use('App/Model/Organization');
const attributes = ['name', 'address', 'phone', 'website', 'lat', 'lng'];

const NodeGeocoder = require('node-geocoder');
const Env = use('Env');

const options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: Env.get('GOOGLE_API_KEY'), // for Mapquest, OpenCage, Google Premier
  formatter: null,         // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

class OrganizationController {

  * index(request, response) {
    const organizations = yield Organization.with('user', 'categories').fetch();

    response.jsonApi('Organization', organizations);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };
    const [result] = yield geocoder.geocode(`${input.address} Nashville`);

    input.lat = result.latitude;
    input.lng = result.longitude;

    const organization = yield Organization.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Organization', organization);
  }

  * show(request, response) {
    const id = request.param('id');
    const organization = yield Organization.with('user', 'categories').where({ id }).firstOrFail();

    response.jsonApi('Organization', organization);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };

    const categoryIds = request.jsonApi.getRelationId('categories');

    const organization = yield Organization.with('user', 'categories').where({ id }).firstOrFail();
    organization.fill(Object.assign({}, input, foreignKeys));
    yield organization.save();
    yield organization.categories().sync(categoryIds);

    yield organization.related('categories').load();

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
