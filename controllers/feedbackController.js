import FeedbackModel from "../models/Feedback.js";
import AppError from '../errors/AppError.js'

class Feedback {
    async getAll(req, res, next) {
        try {
            const feedbacks = await FeedbackModel.getAll()
            res.json(feedbacks)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const feedback = await FeedbackModel.getOne(req.params.id)
            res.json(feedback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async createFeedback(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const feedback = await FeedbackModel.createFeedback(req.body)
            res.json(feedback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async createNoteAdmin(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const feedback = await FeedbackModel.createNoteAdmin(req.params.id, req.body,)
            res.json(feedback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

}

export default new Feedback();