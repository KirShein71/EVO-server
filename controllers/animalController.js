import AnimalModel from '../models/Animal.js'
import AppError from '../errors/AppError.js'

class AnimalController {

    async getAll(req, res, next) {
        try {
            const animals = await AnimalModel.getAll(req.params.id);
            res.json(animals);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const animal = await AnimalModel.getOne(req.params.id)
            res.json(animal)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const animal = await AnimalModel.create(req.body)
            res.json(animal)
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
            const animal = await AnimalModel.update(req.params.id, req.body)
            res.json(animal)
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
            const animal = await AnimalModel.updatePrice(req.params.id, req.body)
            res.json(animal)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const animal = await AnimalModel.delete(req.params.id)
            res.json(animal)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new AnimalController()