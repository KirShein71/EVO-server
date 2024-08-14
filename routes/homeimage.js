import express from 'express'
import HomeImageController from '../controllers/homeimageController.js'

const router = new express.Router()

router.get('/getall', HomeImageController.getAll)
router.post('/create',  HomeImageController.create)
router.delete('/delete/:id([0-9]+)',  HomeImageController.delete)

export default router