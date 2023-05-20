const Router = require('express')
const router = new Router();
const bodystylesController = require('../controllers/bodystylesController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), bodystylesController.create)

router.get('/', bodystylesController.getAll)
router.delete('/', checkRoleMiddleware('ADMIN'), bodystylesController.delete)


module.exports = router