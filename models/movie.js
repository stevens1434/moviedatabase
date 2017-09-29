'use strict';
module.exports = (sequelize, DataTypes) => {
  var movie = sequelize.define('movie', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return movie;
};
