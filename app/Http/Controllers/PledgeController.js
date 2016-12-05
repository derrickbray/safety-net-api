'use strict';

const Pledge = use('App/Model/Pledge');
const attributes = ['name', 'description', 'contact-info', 'end-date', 'deleted-at'];

class PledgeController {

  * index(request, response) {
    const pledges = yield Pledge.with('user').fetch();

    response.jsonApi('Pledge', pledges);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.authUser.id,
    };
    const pledge = yield Pledge.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Pledge', pledge);
  }

  * show(request, response) {
    const id = request.param('id');
    const pledge = yield Pledge.with('user').where({ id }).firstOrFail();

    response.jsonApi('Pledge', pledge);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.jsonApi.getRelationId('user'),
    };

    const pledge = yield Pledge.with('user').where({ id }).firstOrFail();
    pledge.fill(Object.assign({}, input, foreignKeys));
    yield pledge.save();

    response.jsonApi('Pledge', pledge);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const pledge = yield Pledge.query().where({ id }).firstOrFail();
    yield pledge.delete();

    response.status(204).send();
  }

}

module.exports = PledgeController;
