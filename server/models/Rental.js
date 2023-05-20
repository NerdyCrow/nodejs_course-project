const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rental', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'ID'
      }
    },
    CarID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cars',
        key: 'ID'
      }
    },
    PaymentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Rental',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Rental__3214EC2771A1CB83",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
