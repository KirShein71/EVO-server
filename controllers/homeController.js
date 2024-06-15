import HomeModel from '../models/Home.js'
import AppError from '../errors/AppError.js'

class HomeController {

    async getAll(req, res, next) {
        try {
            const homes = await HomeModel.getAll(req.params.id);
            res.json(homes);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const home = await HomeModel.getOne(req.params.id)
            res.json(home)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const home = await HomeModel.create(req.body, req.files?.image)
            res.json(home)
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
            const home = await HomeModel.update(req.params.id, req.body, req.files?.image)
            res.json(home)
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
            const home = await HomeModel.updatePrice(req.params.id, req.body)
            res.json(home)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const home = await HomeModel.delete(req.params.id)
            res.json(home)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new HomeController()
