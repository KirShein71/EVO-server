import express from 'express'
import CarModelController from '../controllers/carmodelController.js'

const router = new express.Router()

router.get('/getall', CarModelController.getAll)
router.get('/getall/:id([0-9]+)', CarModelController.getAllByBrandId)
router.post('/create',  CarModelController.create)
router.put('/update/:id([0-9]+)',  CarModelController.update)
router.get('/getone/:id([0-9]+)',  CarModelController.getOne)
router.delete('/delete/:id([0-9]+)',  CarModelController.delete)

export default router