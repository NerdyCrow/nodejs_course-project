const Sequelize = require("../DB");
const initModels = require("../models/init-models");
const ApiError = require("../errors/ApiError");
const models = initModels(Sequelize);
const bodystyles = models.BodyStyles;
class BodyStylesController {
  async create(req, res) {
    const { Name } = req.body;
    const bodystyle = await bodystyles.findOrCreate({where:{ Name:Name.Name },defaults: {
        Name: Name.Name
      }});
    return res.json(bodystyle);
  }
  async getAll(req, res) {
    const bodystyle = await bodystyles.findAll();
    res.json(bodystyle);
  }
  async delete(req,res,next){
    const {ID}= req.body;


      bodystyles.destroy(
          {where: { ID}}
      ).then(data=>{
        return res.json(data)
      }).catch(e=>{

        return next(ApiError.conflict({e}));})

  }

}
module.exports = new BodyStylesController();
