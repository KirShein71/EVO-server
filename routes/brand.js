import express from 'express'
import BrandController from '../controllers/brandController.js'

const router = new express.Router()

router.get('/getall', BrandController.getAll)
router.post('/create',  BrandController.create)
router.put('/update/:id([0-9]+)',  BrandController.update)
router.get('/getone/:name',  BrandController.getOne)
router.delete('/delete/:id([0-9]+)',  BrandController.delete)

export default router