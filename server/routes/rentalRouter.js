const Router = require('express')
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const router = new Router();
const rentalController = require("../controllers/rentalController");


router.post('/',checkRoleMiddleware('USER'),rentalController.create)

router.get('/',checkRoleMiddleware('ADMIN'),rentalController.getAll)
router.get('/user',checkRoleMiddleware('USER'),rentalController.getOne)
router.delete('/',checkRoleMiddleware('USER'),rentalController.delete)
router.delete('/delete',checkRoleMiddleware('ADMIN'),rentalController.delete)


module.exports = router