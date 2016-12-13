'use strict';

const Schema = use('Schema');

class CategoryOrganizationTableSchema extends Schema {

  up() {
    this.create('category_organization', (table) => {
      table.increments();
      table.timestamps();
      table.integer('organization_id');
      table.integer('category_id');
    });
  }

  down() {
    this.drop('category_organization');
  }

}

module.exports = CategoryOrganizationTableSchema;
