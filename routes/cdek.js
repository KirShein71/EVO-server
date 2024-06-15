import express from 'express'
import CdekController from '../controllers/cdekController.js'

const router = new express.Router()

router.get('/getAllRegion', CdekController.getAllRegion)



export default router