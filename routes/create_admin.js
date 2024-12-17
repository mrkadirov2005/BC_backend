const express = require('express');
const router = express.Router();
const sub_admin_controller=require("../controllers/super_admin")

router.post('/create_sub_admin',sub_admin_controller)
    

module.exports = router;