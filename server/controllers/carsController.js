const uuid = require("uuid");
const path = require("path");
const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");

const models = initModels(Sequelize);
const BodyStyles = models.BodyStyles;
const Engine = models.EngineTypes;
const Brands = models.Brands;
const TransmissionTypes = models.TransmissionTypes;
const Cars = models.Cars;
const Rental = models.Rental;

class CarsController {
  async create(req, res, next) {
    try {
      const {
        BrandId,
        Model,
        Year,
        Color,
        BodyId,
        EngineTypeId,
        TransmissionTypeId,
        CarNumber,
        Seats,
        PricePerDay,
        Description
      } = req.body;
      const dd = req.body
      console.log(BodyId)
      const { Image } = req.files;
      let fName = uuid.v4() + ".jpg";
      const allCars = await Cars.findAll()
      const carNum = allCars.map((item) =>item.CarNumber );
      console.log(carNum)
      if(carNum.includes(CarNumber)){
        return next(ApiError.badRequest('авто с таким номером существует'));}



      Image.mv(path.resolve(__dirname, "..", "static", fName));

      const car = await Cars.create({
        BrandId,
        Model,
        Year,
        Color,
        BodyId,
        EngineTypeId,
        TransmissionTypeId,
        CarNumber,
        Seats,
        PricePerDay,
        Description,
        Image: fName,
      });

      return res.json(car);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let cars;
    let {BrandId,BodyId,EngineTypeId,TransmissionTypeId}=req.query
    const where = {};

    if (BrandId) {
      where.BrandId = BrandId;
    }
    if (BodyId) {
      where.BodyId = BodyId;
    }
    if (EngineTypeId) {
      where.EngineTypeId = EngineTypeId;
    }
    if (TransmissionTypeId) {
      where.TransmissionTypeId = TransmissionTypeId;
    }
     cars = await Cars.findAll({ where , include: [
         { model: BodyStyles,attributes:['Name'], as: "Body" },
         { model: Engine, attributes: ['Name'], as: 'EngineType' },
         {model: Brands,attributes:['Name'], as: "Brand" },
         {model: TransmissionTypes,attributes:['Name'], as: "TransmissionType" }]});

    return res.json(cars);
  }
  async getOne(req, res) {
    const  ID  = req.params;
    const car = await Cars.findOne({
      where: { ID:ID.ID },
      include: [
          { model: BodyStyles,attributes:['Name'], as: "Body" },
        { model: Engine, attributes: ['Name'], as: 'EngineType' },
        {model: Brands,attributes:['Name'], as: "Brand" },
        {model: TransmissionTypes,attributes:['Name'], as: "TransmissionType" }
      ],
    });
    const startDate = await Rental.findOne({where:{CarID:car.ID},order:[['StartDate','ASC']]})
    const endDate = await Rental.findOne({where:{CarID:car.ID},order:[['EndDate','DESC']]})
    res.json({car,startDate,endDate});
  }
  async delete(req,res,next){
    const {ID} = req.body;
    console.log({ID})
    Cars.destroy(
        {where: { ID}}
    ).then(data=>{
      return res.json(data)
    }).catch(e=>{
      console.log({e});
      return next(ApiError.conflict({e}));})
  }
  async edit(req, res, next) {
    try {
      const {
        ID,
        BrandId,
        Model,
        Year,
        Color,
        BodyId,
        EngineTypeId,
        TransmissionTypeId,
        CarNumber,
        Seats,
        PricePerDay,
        Description
      } = req.body;

      const updateCar = {};

      if (BrandId && BrandId!=='undefined') {

        updateCar.BrandId = BrandId;
      }
      if (Model && Model!=='undefined') {

        updateCar.Model = Model;
      }
      if (Year && Year!=='undefined') {

        updateCar.Year = Year;
      }
      if (Seats && Seats!=='undefined') {

        updateCar.Seats = Seats;
      }
      if (PricePerDay && PricePerDay!=='undefined') {

        updateCar.PricePerDay = PricePerDay;
      }
      if (Description && Description!=='undefined') {

        updateCar.Description = Description;
      }
      if (CarNumber && CarNumber!=='undefined') {

        updateCar.CarNumber = CarNumber;
      }
      if (BodyId && BodyId!=='undefined') {
        updateCar.BodyId = BodyId;
      }
      if (EngineTypeId&& EngineTypeId!=='undefined') {
        updateCar.EngineTypeId = EngineTypeId;
      }
      if (TransmissionTypeId && TransmissionTypeId!=='undefined') {
        updateCar.TransmissionTypeId = TransmissionTypeId;
      }
      if (Color && Color !=='undefined') {
        updateCar.Color = Color;
      }
      const { Image } = req.files?? '';

      let fName = uuid.v4() + ".jpg";

if(Image){Image.mv(path.resolve(__dirname, "..", "static", fName));updateCar.Image=fName;
}
      console.log({...updateCar})
      const car = await Cars.update({
        ...updateCar
      },{where:{ID}});

      return res.json(car);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new CarsController();
