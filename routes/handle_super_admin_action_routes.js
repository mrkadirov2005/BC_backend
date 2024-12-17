const express = require('express');
const router = express.Router();
const handle_super_admin_actions_controller=require("../controllers/super_admin-actions_controller")
// Super admin Centers page
router.post('/super_admin/add_center',handle_super_admin_actions_controller.create_center)
    .post('/super_admin/get_centers',handle_super_admin_actions_controller.get_whole_centers)
    .post('/super_admin/get_vips',handle_super_admin_actions_controller.get_whole_vips)
    .post('/super_admin/add_vip',handle_super_admin_actions_controller.add_vip)
    .post('/super_admin/add_admin',handle_super_admin_actions_controller.add_admin)
    .post('/super_admin/get_admins',handle_super_admin_actions_controller.get_admins)
    .post('/super_admin/add_teacher',handle_super_admin_actions_controller.add_teacher)
    .post('/super_admin/get_teachers',handle_super_admin_actions_controller.get_teachers)
    .post('/super_admin/get_students',handle_super_admin_actions_controller.get_students)
    .post('/super_admin/get_groups',handle_super_admin_actions_controller.get_groups)
    .post('/super_admin/add_group',handle_super_admin_actions_controller.add_group)
    .post('/super_admin/add_student',handle_super_admin_actions_controller.add_student)
    
    // Admin page VIPS routes
    .delete('/super_admin/delete_vip',handle_super_admin_actions_controller.deleteVIP)
    .delete('/super_admin/delete_center',handle_super_admin_actions_controller.delete_center)
    .delete('/super_admin/delete_admin',handle_super_admin_actions_controller.delete_admin)
    .delete('/super_admin/delete_teacher',handle_super_admin_actions_controller.delete_teacher)
    .delete('/super_admin/delete_group',handle_super_admin_actions_controller.delete_group)
    .delete('/super_admin/delete_student',handle_super_admin_actions_controller.delete_student)
    // 
    .get('/super_admin/single_admin',handle_super_admin_actions_controller.get_admin)
    
    
    
    

module.exports = router;