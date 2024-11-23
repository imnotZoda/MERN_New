const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const orderController = require('../controllers/orderController');
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');
const { modelName } = require('../models/Orders');

router.post('/create', isAuthenticatedV2, orderController.create)

router.get('/all', orderController.all)

router.post('/update/status/:id', orderController.updateStatus)

module.exports = router