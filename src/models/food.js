'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('food', {
    meal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mealSize: {
      type: DataTypes.STRING,
      allowNullL: true,
    },
    mealType: {
      type: DataTypes.ENUM,
      values: ['Breakfast', 'Lunch', 'Dinner'],
      allowNull: true,
    },
  });
};
