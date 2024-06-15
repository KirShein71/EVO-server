import express from 'express'
import OrganizerController from '../controllers/organizerController.js'

const router = new express.Router()

router.get('/getall', OrganizerController.getAll)
router.post('/create',  OrganizerController.create)
router.put('/update/:id([0-9]+)',  OrganizerController.update)
router.put('/updatePrice/:id([0-9]+)',  OrganizerController.updatePrice)
router.get('/getone/:id([0-9]+)',  OrganizerController.getOne)
router.delete('/delete/:id([0-9]+)',  OrganizerController.delete)

export default router