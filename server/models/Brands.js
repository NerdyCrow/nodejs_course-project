const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Brands', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Brands',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Brands__3214EC2739AD135C",
        unique: true,
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
