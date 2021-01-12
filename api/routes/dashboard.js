const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const dashboardController = require('../controllers/dashboardController');

const auth = require('../middlewares/auth')

router.get('/', catchErrors(dashboardController.getAllUsers));
router.post('/', catchErrors(dashboardController.createUser));
router.delete('/', catchErrors(dashboardController.deleteUser));


module.exports = router;