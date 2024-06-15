import express from 'express'
import TrunkController from '../controllers/trunkController.js'

const router = new express.Router()


router.get('/getall', TrunkController.getAll)
router.get('/getall/:id([0-9]+)', TrunkController.getAllProductId)
router.post('/create',  TrunkController.create)
router.put('/update/:id([0-9]+)',  TrunkController.update)
router.get('/getone/:id([0-9]+)',  TrunkController.getOne)
router.delete('/delete/:id([0-9]+)',  TrunkController.delete)

export default router