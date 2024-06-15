import express from 'express'
import HomeController from '../controllers/homeController.js'

const router = new express.Router()

router.get('/getall', HomeController.getAll)
router.post('/create',  HomeController.create)
router.put('/update/:id([0-9]+)',  HomeController.update)
router.put('/updatePrice/:id([0-9]+)',  HomeController.updatePrice)
router.get('/getone/:id([0-9]+)',  HomeController.getOne)
router.delete('/delete/:id([0-9]+)',  HomeController.delete)

export default router