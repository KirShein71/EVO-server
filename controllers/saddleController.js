import SaddleModel from '../models/Saddle.js';
import AppError from '../errors/AppError.js'

class SaddleController {

    async getAll(req, res, next) {
        try {
            const saddles = await SaddleModel.getAll(req.params.id);
            res.json(saddles);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const saddle = await SaddleModel.getOne(req.params.id)
            res.json(saddle)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const saddle = await SaddleModel.create(req.body, req.files?.image)
            res.json(saddle)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const saddle = await SaddleModel.update(req.params.id, req.body, req.files?.image)
            res.json(saddle)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async updatePrice(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const saddle = await SaddleModel.updatePrice(req.params.id, req.body)
            res.json(saddle)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const saddle = await SaddleModel.delete(req.params.id)
            res.json(saddle)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new SaddleController()