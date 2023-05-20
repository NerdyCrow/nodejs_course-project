const Router = require('express')
const router = new Router();
const transmissionController = require('../controllers/transmissiontypesController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const enginetypesController = require("../controllers/enginetypeController");

router.post('/', checkRoleMiddleware('ADMIN'), transmissionController.create)

router.get('/', transmissionController.getAll)
router.delete('/',checkRoleMiddleware('ADMIN'), transmissionController.delete)


module.exports = router