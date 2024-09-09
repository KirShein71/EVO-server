import express from 'express'
import BagController from '../controllers/bagController.js'

const router = new express.Router()

router.get('/getall', BagController.getAll)
router.post('/create',  BagController.create)
router.put('/update/:id([0-9]+)',  BagController.update)
router.put('/updatePrice/:id([0-9]+)',  BagController.updatePrice)
router.get('/getone/:originalName',  BagController.getOne)
router.delete('/delete/:id([0-9]+)',  BagController.delete)

router.get('/getAllBagSize', BagController.getAllBagSize)

router.get('/getAllBagMaterial', BagController.getAllBagMaterial)

export default router