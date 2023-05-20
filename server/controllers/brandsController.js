const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");
const models = initModels(Sequelize);
const brands = models.Brands;
class Brands {
  async create(req, res) {
    const { Name } = req.body;
    console.log(Name.Name)
    const bodystyle = await brands.findOrCreate({where:{ Name:Name.Name },defaults: {
        Name: Name.Name
      }});

    return res.json(bodystyle);
  }
  async getAll(req, res) {
    const bodystyle = await brands.findAll();
    res.json(bodystyle);
  }
  async delete(req,res,next){
    const {ID} = req.body;
    console.log({ID})
    brands.destroy(
        {where: { ID}}
    ).then(data=>{
      return res.json(data)
    }).catch(e=>{
      console.log({e});
      return next(ApiError.conflict({e}));})
}}
module.exports = new Brands();
