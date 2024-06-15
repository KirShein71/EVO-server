import SteelModel from '../models/Steel.js'
import AppError from '../errors/AppError.js'

class SteelController {

    async getAll(req, res, next) {
        try {
            const steels = await SteelModel.getAll(req.params.id);
            res.json(steels);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const steel = await SteelModel.getOne(req.params.id)
            res.json(steel)
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
            const steel = await SteelModel.update(req.params.id, req.body, req.files.image)
            res.json(steel)
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
            const steel = await SteelModel.updatePrice(req.params.id, req.body)
            res.json(steel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const steel = await SteelModel.delete(req.params.id)
            res.json(steel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new SteelController()