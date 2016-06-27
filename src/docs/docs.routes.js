var express = require('express');

var router = express.Router();

router.use('/docs', function(req, res, next) {
  if (!req.query.url) {
    return res.redirect(301, '?url=/docs/swagger.json');
  }
  next();
});
router.use('/docs', express.static(__dirname + '/../../node_modules/swagger-ui/dist'));
router.get('/docs/swagger.json', function(req, res, next) {
  res.json(require('./swagger.json'));
})

module.exports = router;
