var express = require('express'),
    index   = require('../controllers/index'),
    create  = require('../controllers/create'),
    read    = require('../controllers/read'),
    readall = require('../controllers/readall'),
    update  = require('../controllers/update'),
    del     = require('../controllers/del'),
    about   = require('../controllers/about'),
    router  = express.Router();

router.route('/')
.get(index)
router.route('/update')
.get(index)
router.route('/logo')
.get(readall)
router.route('/person')
  .post(create)
  .get(readall);
router.route('/person/:id')
  .get(read)
  .put(update)
  .delete(del);
router.route('/about').get(about);
module.exports = router;
