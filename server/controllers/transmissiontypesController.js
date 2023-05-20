const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");
const models = initModels(Sequelize);
const transmissiontypes = models.TransmissionTypes;
class TransmissionTypesController {
  async create(req, res) {
    const { Name } = req.body;

    const transmissiontype = await transmissiontypes.findOrCreate({where:{ Name:Name.Name },defaults: {
        Name: Name.Name
      }});
    return res.json(transmissiontype);
  }
  async getAll(req, res) {
    const transmissiontype = await transmissiontypes.findAll();
    res.json(transmissiontype);
  }
  async delete(req,res,next){
    const {ID} = req.body;
    console.log({ID})
    transmissiontypes.destroy(
        {where: { ID}}
    ).then(data=>{
      return res.json(data)
    }).catch(e=>{
      console.log({e});
      return next(ApiError.conflict({e}));})}

}
module.exports = new TransmissionTypesController();
