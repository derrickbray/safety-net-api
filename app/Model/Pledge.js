'use strict';

const Lucid = use('Lucid');

class Pledge extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id', 'is_claimed', 'is_approved');
  }
}

module.exports = Pledge;
