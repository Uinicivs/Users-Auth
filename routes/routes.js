const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')

const CadValidation = require('../middlewares/CadValidation')
const FindValidation = require('../middlewares/FindValidation')
const UpdateValidation = require('../middlewares/UpdateValidation')
const DelValidation = require('../middlewares/DelValidation')
const AdminAuth = require('../middlewares/AdminAuth')

router.get('/', HomeController.index)
router.get('/users', AdminAuth, UserController.findUsers)
router.get('/user/:id', AdminAuth, FindValidation, UserController.findUser)
router.post('/user', CadValidation, UserController.create)
router.put('/user', AdminAuth, UpdateValidation, UserController.edit)
router.delete('/user/:id', AdminAuth, DelValidation, UserController.del)
router.post('/recoverpassword', UserController.passwordRecover)
router.post('/changepassword', UserController.passwordChange)
router.post('/login', UserController.login)

module.exports = router