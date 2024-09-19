import express from 'express'
import FeedbackController from '../controllers/feedbackController.js'

const router = new express.Router()

router.get('/getall', FeedbackController.getAll)
router.post('/createFeedback',  FeedbackController.createFeedback)
router.put('/createNoteAdmin/:id([0-9]+)',  FeedbackController.createNoteAdmin)
router.get('/getone/:id([0-9]+)',  FeedbackController.getOne)

export default router