import EdgingModel from "../models/Edging.js";
import AppError from '../errors/AppError.js'

class EdgingController {

    async getAll(req, res, next) {
        try {
            const edging = await EdgingModel.getAll()
            res.json(edging)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

   

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const edging = await EdgingModel.getOne(req.params.id)
            res.json(edging)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const edging = await EdgingModel.create(req.body, req.files.image)
            res.json(edging)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const edging = await EdgingModel.delete(req.params.id)
            res.json(edging)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new EdgingController()