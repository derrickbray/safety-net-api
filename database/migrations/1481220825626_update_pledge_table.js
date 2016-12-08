'use strict';

const Schema = use('Schema');

class PledgesTableSchema extends Schema {

  up() {
    this.table('pledges', (table) => {
      table.boolean('is_approved');
      table.boolean('is_claimed');
    });
  }

  down() {
    this.table('pledges', (table) => {
      table.dropColumn('is_approved');
      table.dropColumn('is_claimed');
    });
  }

}

module.exports = PledgesTableSchema;
