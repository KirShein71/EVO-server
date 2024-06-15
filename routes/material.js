import express from 'express'
import MaterialController from '../controllers/materialController.js'


const router = new express.Router()

router.get('/getall', MaterialController.getAll)
router.get('/getAllMaterialForAnimal', MaterialController.getAllMaterialForAnimal)
router.post('/create',  MaterialController.create)
router.get('/getone/:id([0-9]+)',  MaterialController.getOne)
router.delete('/delete/:id([0-9]+)',  MaterialController.delete)

export default router