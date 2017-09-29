'use strict';
module.exports = (sequelize, DataTypes) => {
  var genre = sequelize.define('genre', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return genre;
};