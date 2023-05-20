var DataTypes = require("sequelize").DataTypes;
var _BodyStyles = require("./BodyStyles");
var _Brands = require("./Brands");
var _Cars = require("./Cars");
var _EngineTypes = require("./EngineTypes");
var _Rental = require("./Rental");
var _TransmissionTypes = require("./TransmissionTypes");
var _Users = require("./Users");

function initModels(sequelize) {
  var BodyStyles = _BodyStyles(sequelize, DataTypes);
  var Brands = _Brands(sequelize, DataTypes);
  var Cars = _Cars(sequelize, DataTypes);
  var EngineTypes = _EngineTypes(sequelize, DataTypes);
  var Rental = _Rental(sequelize, DataTypes);
  var TransmissionTypes = _TransmissionTypes(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Cars.belongsTo(BodyStyles, { as: "Body", foreignKey: "BodyID"});
  BodyStyles.hasMany(Cars, { as: "Cars", foreignKey: "BodyID"});
  Cars.belongsTo(Brands, { as: "Brand", foreignKey: "BrandId"});
  Brands.hasMany(Cars, { as: "Cars", foreignKey: "BrandId"});
  Rental.belongsTo(Cars, { as: "Car", foreignKey: "CarID"});
  Cars.hasMany(Rental, { as: "Rentals", foreignKey: "CarID"});
  Cars.belongsTo(EngineTypes, { as: "EngineType", foreignKey: "EngineTypeId"});
  EngineTypes.hasMany(Cars, { as: "Cars", foreignKey: "EngineTypeId"});
  Cars.belongsTo(TransmissionTypes, { as: "TransmissionType", foreignKey: "TransmissionTypeId"});
  TransmissionTypes.hasMany(Cars, { as: "Cars", foreignKey: "TransmissionTypeId"});
  Rental.belongsTo(Users, { as: "User", foreignKey: "UserID"});
  Users.hasMany(Rental, { as: "Rentals", foreignKey: "UserID"});

  return {
    BodyStyles,
    Brands,
    Cars,
    EngineTypes,
    Rental,
    TransmissionTypes,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
