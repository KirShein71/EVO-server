import express from 'express'
import OrganizerFiftyController from '../controllers/organizerFiftyController.js'

const router = new express.Router()

router.get('/getall', OrganizerFiftyController.getAll)
router.get('/getone/:id([0-9]+)',  OrganizerFiftyController.getOne)


export default router