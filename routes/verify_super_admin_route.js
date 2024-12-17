const express = require('express');
const router = express.Router();
const {verify_super_admin,checkIsSginedIn}=require("../controllers/verify_super_admin")

router.post('/verify_super_admin',verify_super_admin)
      .get('/verify_super_admin',checkIsSginedIn)
    

module.exports = router;