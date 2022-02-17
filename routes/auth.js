const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const router = Router();
router.post('/login',
    [
        check('email', 'You must provide an user id').isEmail(),
        check('password', 'You must provide an user password'), validateFields],
    login)
module.exports = router;