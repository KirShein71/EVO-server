import HomeImageModel from '../models/HomeImage.js'
import AppError from '../errors/AppError.js'

class HomeImageController {

    async getAll(req, res, next) {
        try {
            const homeimage = await HomeImageModel.getAll(req.params.id);
            res.json(homeimage);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const homeimage = await HomeImageModel.create(req.body, req.files.image)
            res.json(homeimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const homeimage = await HomeImageModel.delete(req.params.id)
            res.json(homeimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new HomeImageController()