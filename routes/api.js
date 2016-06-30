'use strict';

const express = require('express');

const router = express.Router();

 router.use('/properties', require('./properties'));
 router.use('/tenants', require('./tenants'));

module.exports = router;
