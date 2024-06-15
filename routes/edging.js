import express from 'express'
import EdgingController from '../controllers/edgingController.js'

const router = new express.Router()

router.get('/getall', EdgingController.getAll)
router.post('/create',  EdgingController.create)
router.get('/getone/:id([0-9]+)',  EdgingController.getOne)
router.delete('/delete/:id([0-9]+)',  EdgingController.delete)

export default router