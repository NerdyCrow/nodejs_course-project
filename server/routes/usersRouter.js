const Router = require('express')
const router = new Router();
const usersController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
router.post('/registration', usersController.registration)

router.post('/login', usersController.login)

router.get('/auth',authMiddleware, usersController.check)
router.get('/:ID',checkRoleMiddleware('USER'), usersController.getUser)
router.put('/',checkRoleMiddleware('USER'), usersController.updateUser)


module.exports = router