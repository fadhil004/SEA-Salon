'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      Branch.hasMany(models.Reservation, { foreignKey: 'branchId' });
      Branch.belongsToMany(models.Service, {
        through: 'BranchService',
        foreignKey: 'branchId',
        as: 'services'
      });
    }
  }
  Branch.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};
