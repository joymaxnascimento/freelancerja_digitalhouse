var express = require('express');
var router = express.Router();
const FreelancerController = 
      require("../controllers/FreelancerController");

/* GET home page. */

router.get('/', FreelancerController.index );


module.exports = router;
