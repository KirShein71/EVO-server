import express from 'express'
import ThirdrowController from '../controllers/thirdrowController.js'

const router = new express.Router()


router.get('/getall', ThirdrowController.getAll)
router.get('/getall/:id([0-9]+)', ThirdrowController.getAllProductId)
router.post('/create',  ThirdrowController.create)
router.put('/update/:id([0-9]+)',  ThirdrowController.update)
router.get('/getone/:id([0-9]+)',  ThirdrowController.getOne)
router.delete('/delete/:id([0-9]+)',  ThirdrowController.delete)

export default router