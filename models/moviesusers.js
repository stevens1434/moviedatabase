'use strict';
module.exports = (sequelize, DataTypes) => {
  var moviesUsers = sequelize.define('moviesUsers', {
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return moviesUsers;
};