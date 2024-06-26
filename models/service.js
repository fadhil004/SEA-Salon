'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.hasMany(models.Reservation, { foreignKey: 'serviceId' });
      Service.belongsToMany(models.Branch, {
        through: 'BranchService',
        foreignKey: 'serviceId',
        as: 'branches'
      });
    }
  }
  Service.init({
    nameService: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};
