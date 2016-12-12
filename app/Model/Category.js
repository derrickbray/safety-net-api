'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {


  organizations() {
    return this.hasMany('App/Model/Organization', 'id', 'category_id');
  }
}

module.exports = Category
