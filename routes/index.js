const express = require('express');
const router = express.Router();

// Config
router.use('/config', require('./config/app').router);

// Department
router.use('/department', require('./department/create').router);
router.use('/department', require('./department/update').router);
router.use('/department', require('./department/list').router);
router.use('/department', require('./department/options').router);

// Class
router.use('/class', require('./class/create').router);
router.use('/class', require('./class/update').router);
router.use('/class', require('./class/list').router);
router.use('/class', require('./class/options').router);

// User
router.use('/user', require('./user/student/register').router);
router.use('/user', require('./user/teacher/register').router);
router.use('/user', require('./user/login').router);
router.use('/user', require('./user/teacher/hod/update').router);
router.use('/user', require('./user/teacher/classteacher/update').router);
router.use('/user', require('./user/teacher/hod/get').router);
router.use('/user', require('./user/teacher/classteacher/get').router);
router.use('/user', require('./user/teacher/autocomplete').router);

// Subject
router.use('/subject', require('./subject/create/local').router);
router.use('/subject', require('./subject/list').router);

module.exports.router = router;