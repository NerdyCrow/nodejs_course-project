const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");
const models = initModels(Sequelize);
const Rentals = models.Rental;
const BodyStyles = models.BodyStyles;
const Users = models.Users;
const EngineTypes = models.EngineTypes;
const TransmissionTypes = models.TransmissionTypes;
const Cars = models.Cars;
const Brands = models.Brands;
const {differenceInDays} = require('date-fns');
const {FLOAT} = require("sequelize");
const moment = require('moment');

class RentalController {
    async create(req, res,next) {
        try {

            const {StartDate, EndDate, UserID, CarID, PricePerDay} = req.body
            let countOfDays = differenceInDays(new Date(EndDate), new Date(StartDate));
            console.log(PricePerDay)
            let cost = countOfDays * PricePerDay

            console.log(cost)
            console.log(new Date(StartDate))
            console.log(parseFloat(cost).toFixed(2))
            const userRents = await Rentals.findAll({where: {UserID}})

            if (countOfDays<=0){return next(ApiError.badRequest('Неверно указаны даты'));}

           else if (userRents.length!=0){ return next(ApiError.badRequest('Извините, нельзя бронировать больше одного автомобиля'));}

            else { const rent = await Rentals.create({StartDate, EndDate, UserID, CarID, PaymentAmount: parseFloat(cost).toFixed(2)})
                res.json(rent)
            }


    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
    }

    async getOne(req, res) {
        let {UserID}=req.query
        console.log(UserID)
        const userRental = await Rentals.findOne({where:{UserID},include:[{model:Cars,as:"Car",include: [
                    {
                        model: Brands,attributes:['Name'],
                        as: 'Brand',
                    },
                    {
                        model: BodyStyles,attributes:['Name'],
                        as: 'Body',
                    },
                    {
                        model: EngineTypes,attributes:['Name'],
                        as: 'EngineType',
                    },
                    {
                        model: TransmissionTypes,attributes:['Name'],
                        as: 'TransmissionType',
                    }
                ]}]})
        res.json(userRental)

    }
    async getAll(req, res) {

        const userRental = await Rentals.findAll({include:[{model:Cars, as:'Car',include:[{model:Brands,as:'Brand'},{model:BodyStyles,as:'Body'}]},{model:Users,attributes:['Email'],as:'User'}]})
        res.json(userRental)

    }
    async delete(req,res,next){
        const {ID} = req.body;
        console.log(ID)
 Rentals.destroy(
            {where:  {UserID:ID}}
        ).then(data=>{
            return res.json(data)
        }).catch(e=>{
            console.log({e});
            return next(ApiError.conflict(`Ошибка удаления: ${e.message}`));})

}}

module.exports = new RentalController()