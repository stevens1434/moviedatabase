'use strict';
module.exports = (sequelize, DataTypes) => {
  var moviesTags = sequelize.define('moviesTags', {
    movieId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return moviesTags;
};