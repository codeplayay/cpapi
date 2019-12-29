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
router.use('/class', require('./class/students').router);

// User
router.use('/user', require('./user/student/register').router);
router.use('/user', require('./user/teacher/register').router);
router.use('/user', require('./user/login').router);
router.use('/user', require('./user/teacher/hod/update').router);
router.use('/user', require('./user/teacher/hod/get').router);
router.use('/user', require('./user/teacher/autocomplete').router);

// Subject
router.use('/subject', require('./subject/create/local').router);
router.use('/subject', require('./subject/list').router);

// TimeTable
router.use('/timetable', require('./timetable/slot').router);
router.use('/timetable', require('./timetable/update').router);

// Collection
router.use('/collection', require('./collection/marks/create').router);
router.use('/collection', require('./collection/marks/get').router);
router.use('/collection', require('./collection/marks/list').router);
router.use('/collection', require('./collection/marks/update').router);

// Notice
router.use('/notice', require('./notice/post').router);
router.use('/notice', require('./notice/list').router);

module.exports.router = router;