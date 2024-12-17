const express = require('express');
const router = express.Router();
const create_center_controller=require("../controllers/create_center")

router.post('/00110001',create_center_controller)
    

module.exports = router;