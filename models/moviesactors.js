'use strict';
module.exports = (sequelize, DataTypes) => {
  var moviesActors = sequelize.define('moviesActors', {
    movieId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return moviesActors;
};