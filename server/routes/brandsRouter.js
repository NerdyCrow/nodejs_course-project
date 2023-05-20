const Router = require('express')
const router = new Router();
const brandsController = require('../controllers/brandsController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const bodystylesController = require("../controllers/bodystylesController");

router.post('/', checkRoleMiddleware('ADMIN'), brandsController.create)

router.get('/', brandsController.getAll)
router.delete('/',  checkRoleMiddleware('ADMIN'),brandsController.delete)


module.exports = router