'use strict';

const Lucid = use('Lucid');

class Organization extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }

  categories() {
    return this.belongsToMany('App/Model/Category');
  }
}

module.exports = Organization;
