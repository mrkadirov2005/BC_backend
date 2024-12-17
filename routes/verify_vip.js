const express = require('express');
const router = express.Router();
const verify_vip=require("../controllers/vip_controllers/verify_vip")

router.post('/verify_vip',verify_vip.verify_VIP_Login)
    .get('/verify_vip',verify_vip.verifyIsSigned_vip)


module.exports = router;