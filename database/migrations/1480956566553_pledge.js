'use strict';

const Schema = use('Schema');

class PledgeSchema extends Schema {

  up() {
    this.create('pledges', (table) => {
      table.increments();
      table.string('name');
      table.text('description');
      table.string('contact_info');
      table.integer('user_id').references('users.id');
      table.date('end_date');
      table.timestamp('deleted_at');
      table.timestamps('timestamp');
    });
  }

  down() {
    this.drop('pledges');
  }

}

module.exports = PledgeSchema;
