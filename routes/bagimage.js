import express from 'express'
import BagImageController from '../controllers/bagImageController.js'

const router = new express.Router()

router.get('/getall', BagImageController.getAll)
router.post('/create',  BagImageController.create)
router.delete('/delete/:id([0-9]+)',  BagImageController.delete)

export default router