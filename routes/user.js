import express from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = new express.Router()


router.post('/login', UserController.login)
router.get('/check', authMiddleware, UserController.check)

router.post('/createAccount',  UserController.createAccount)


export default router