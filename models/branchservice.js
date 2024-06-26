'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchService extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  BranchService.init({
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Branches',
        key: 'id'
      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'BranchService',
  });
  return BranchService;
};
