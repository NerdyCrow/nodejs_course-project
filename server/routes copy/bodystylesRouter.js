const Router = require('express')
const router = new Router();
const bodystylesController = require('../controllers/transmissiontypeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), bodystylesController.create)

router.get('/', bodystylesController.getAll)


module.exports = router