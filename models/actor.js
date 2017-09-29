'use strict';
module.exports = (sequelize, DataTypes) => {
  var actor = sequelize.define('actor', {
    first: DataTypes.STRING,
    last: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return actor;
};