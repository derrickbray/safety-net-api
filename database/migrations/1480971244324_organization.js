'use strict';

const Schema = use('Schema');

class OrganizationSchema extends Schema {

  up() {
    this.create('organizations', (table) => {
      table.increments();
      table.string('name');
      table.string('address');
      table.string('phone');
      table.string('website');
      table.float('lat');
      table.float('lng');
      table.integer('user_id').references('users.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('organizations');
  }

}

module.exports = OrganizationSchema;
