'use strict';

const Lucid = use('Lucid');

class Category extends Lucid {


  organizations() {
    return this.belongsToMany('App/Model/Organization');
  }
}

module.exports = Category;
