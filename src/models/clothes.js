'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('clothes', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM,
      values: ['small', 'medium', 'Large'],
      allowNull: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
