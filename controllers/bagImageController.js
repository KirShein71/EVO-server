import BagImageModel from '../models/BagImage.js'
import AppError from '../errors/AppError.js'

class BagImageController {

    async getAll(req, res, next) {
        try {
            const bagimage = await BagImageModel.getAll(req.params.id);
            res.json(bagimage);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const bagimage = await BagImageModel.create(req.body, req.files.image)
            res.json(bagimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const bagimage = await BagImageModel.delete(req.params.id)
            res.json(bagimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BagImageController()