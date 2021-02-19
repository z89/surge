var express = require('express');
var router = express.Router();

// Swagger docs
const swaggerUI = require('swagger-ui-express'); 
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// Serve swagger docs
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

module.exports = router;


