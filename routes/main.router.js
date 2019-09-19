const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Serve Public directory as a static site.
 */
router.use(express.static(path.join(__dirname, '../public')));

module.exports = router;
