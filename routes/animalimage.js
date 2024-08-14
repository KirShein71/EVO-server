import express from 'express'
import AnimalImageController from '../controllers/animalImageController.js'

const router = new express.Router()

router.get('/getall', AnimalImageController.getAll)
router.post('/create',  AnimalImageController.create)
router.delete('/delete/:id([0-9]+)',  AnimalImageController.delete)

export default router