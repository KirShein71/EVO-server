import express from 'express'
import BodyController from '../controllers/bodyController.js'

const router = new express.Router()

router.get('/getall', BodyController.getAll)
router.get('/getone/:id([0-9]+)',  BodyController.getOne)


export default router