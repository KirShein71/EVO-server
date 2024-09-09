import BagPictureModel from '../models/BagPicture.js'
import AppError from '../errors/AppError.js'

class BagPictureController {

    async getAll(req, res, next) {
        try {
            const bagpicture = await BagPictureModel.getAll(req.params.id);
            res.json(bagpicture);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const bagpicture = await BagPictureModel.create(req.body, req.files.image)
            res.json(bagpicture)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const bagpicture = await BagPictureModel.delete(req.params.id)
            res.json(bagpicture)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BagPictureController()