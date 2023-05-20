const Router = require('express')
const router = new Router();
const enginetypesController = require('../controllers/enginetypeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const bodystylesController = require("../controllers/bodystylesController");

router.post('/', checkRoleMiddleware('ADMIN'), enginetypesController.create)

router.get('/', enginetypesController.getAll)
router.delete('/',checkRoleMiddleware('ADMIN'), enginetypesController.delete)


module.exports = router