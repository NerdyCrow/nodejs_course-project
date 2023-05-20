const Router = require('express')
const router = new Router();
const bodystylesRouter=require('./bodystylesRouter')
const carsRouter = require('./carsRouter')
const usersRouter = require('./usersRouter')
const rentalRouter  = require ('./rentalRouter')
const transmissiontypesRouter  = require ('./transmissiontypesRouter')
const brandsRouter  = require ('./brandsRouter')
const enginetypesRouter  = require ('./enginetypesRouter')

router.use('/user',usersRouter)
router.use('/bodystyles',bodystylesRouter)
router.use('/rental',rentalRouter)
router.use('/transmissiontypes',transmissiontypesRouter)
router.use('/brands', brandsRouter)
router.use('/enginetypes', enginetypesRouter)
router.use('/cars',carsRouter)

module.exports=router