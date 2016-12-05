'use strict';

const Schema = use('Schema');

class UsersTableSchema extends Schema {

  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('password', 60).notNullable();
      table.string('email', 254).notNullable().unique();


      // table.string('org_name', 80);
      // table.string('address', 80);
      // table.string('phone', 80);
      // table.string('website', 80);

      table.boolean('is_admin').default(false);
      table.boolean('is_approved').default(false);


      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }

}

module.exports = UsersTableSchema;
