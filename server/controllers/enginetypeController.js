const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");
const models = initModels(Sequelize);
const enginetypes = models.EngineTypes;
class EngineTypes {
  async create(req, res) {
    const { Name } = req.body;

    const bodystyle = await enginetypes.findOrCreate({where:{ Name:Name.Name },defaults: {
        Name: Name.Name
      }});
    return res.json(bodystyle);
  }
  async getAll(req, res) {
    const bodystyle = await enginetypes.findAll();
    res.json(bodystyle);
  }
  async delete(req,res,next){
    const {ID} = req.body;
    console.log({ID})
    enginetypes.destroy(
        {where: { ID}}
    ).then(data=>{
      return res.json(data)
    }).catch(e=>{

      return next(ApiError.conflict({e}));})}

}
module.exports = new EngineTypes();
