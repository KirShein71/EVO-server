import express from 'express'
import BagPictureController from '../controllers/bagPictureController.js'

const router = new express.Router()

router.get('/getall', BagPictureController.getAll)
router.post('/create',  BagPictureController.create)
router.delete('/delete/:id([0-9]+)',  BagPictureController.delete)

export default router