const Router = require('express');
const carsController = require('../controllers/carsController');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();

router.post('/',checkRoleMiddleware('ADMIN'), carsController.create)
router.get('/', carsController.getAll)
router.get('/:ID', carsController.getOne)//взять отдельную машину
router.delete('/',checkRoleMiddleware('ADMIN'), carsController.delete)
router.put('/',checkRoleMiddleware('ADMIN'), carsController.edit)
module.exports = router