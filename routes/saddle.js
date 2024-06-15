import express from 'express'
import SaddleController from '../controllers/saddleController.js'

const router = new express.Router()

router.get('/getall', SaddleController.getAll)
router.post('/create',  SaddleController.create)
router.put('/update/:id([0-9]+)',  SaddleController.update)
router.put('/updatePrice/:id([0-9]+)',  SaddleController.updatePrice)
router.get('/getone/:id([0-9]+)',  SaddleController.getOne)
router.delete('/delete/:id([0-9]+)',  SaddleController.delete)

export default router