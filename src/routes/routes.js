const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');


router.get('/', controller.renderBackendHome);

router.get('/load_data', controller.loadCsvController);



module.exports = router;