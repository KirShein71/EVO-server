import express from 'express'
import CellShapeController from '../controllers/cellShapeController.js'

const router = new express.Router()

router.get('/getall', CellShapeController.getAll)
router.get('/getone/:id([0-9]+)',  CellShapeController.getOne)


export default router