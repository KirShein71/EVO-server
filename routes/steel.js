import express from 'express'
import SteelController from '../controllers/steelController.js'

const router = new express.Router()

router.get('/getall', SteelController.getAll)
router.put('/update/:id([0-9]+)',  SteelController.update)
router.put('/updatePrice/:id([0-9]+)',  SteelController.updatePrice)
router.get('/getone/:id([0-9]+)',  SteelController.getOne)
router.delete('/delete/:id([0-9]+)',  SteelController.delete)

export default router