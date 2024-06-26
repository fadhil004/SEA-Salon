'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Branch, { foreignKey: 'branchId' });
      Reservation.belongsTo(models.Service, { foreignKey: 'serviceId' });
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Reservation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Services', 
        key: 'id', 
      }
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Branches',
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
