import express from 'express'
import AnimalController from '../controllers/animalController.js'

const router = new express.Router()

router.get('/getall', AnimalController.getAll)
router.post('/create',  AnimalController.create)
router.put('/update/:id([0-9]+)',  AnimalController.update)
router.put('/updatePrice/:id([0-9]+)',  AnimalController.updatePrice)
router.get('/getone/:id([0-9]+)',  AnimalController.getOne)
router.delete('/delete/:id([0-9]+)',  AnimalController.delete)

export default router