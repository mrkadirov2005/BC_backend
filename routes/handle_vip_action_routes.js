const express = require('express');
const router = express.Router();
const vip_reqs=require("../controllers/vip_controllers/CRUD")
// Super admin Centers page
router.post('/vip/get_global',vip_reqs.get_global)
    .post('/vip/get_teachers',vip_reqs.get_teachers)
    .post('/vip/get_students',vip_reqs.getStudents)


module.exports = router;