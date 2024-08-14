import AnimalImageModel from '../models/AnimalImage.js'
import AppError from '../errors/AppError.js'

class AnimalImageController {

    async getAll(req, res, next) {
        try {
            const animalimage = await AnimalImageModel.getAll(req.params.id);
            res.json(animalimage);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const animalimage = await AnimalImageModel.create(req.body, req.files.image)
            res.json(animalimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const animalimage = await AnimalImageModel.delete(req.params.id)
            res.json(animalimage)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new AnimalImageController()