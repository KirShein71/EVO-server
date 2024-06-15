import BrandModel from "../models/Brand.js";
import AppError from '../errors/AppError.js'

class BrandController {

    async getAll(req, res, next) {
        try {
            const brand = await BrandModel.getAll()
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const brand = await BrandModel.getOne(req.params.id)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const brand = await BrandModel.create(req.body, req.files.image)
            res.json(brand)
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
            const brand = await BrandModel.update(req.params.id, req.body, req.files.image)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const brand = await BrandModel.delete(req.params.id)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BrandController()