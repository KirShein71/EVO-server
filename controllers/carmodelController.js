import CarModelModel from "../models/CarModel.js";
import AppError from '../errors/AppError.js'

class CarModelController {

    async getAll(req, res, next) {
        try {
            const carmodel = await CarModelModel.getAll()
            res.json(carmodel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAllByBrandId(req, res, next) {
        try {
            const carmodels = await CarModelModel.getAllByBrandId(req.params.id);
            res.json(carmodels);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const carmodel = await CarModelModel.getOne(req.params.id)
            res.json(carmodel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const carmodel = await CarModelModel.create(req.body)
            res.json(carmodel)
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
            const carmodel = await CarModelModel.update(req.params.id, req.body)
            res.json(carmodel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const carmodel = await CarModelModel.delete(req.params.id)
            res.json(carmodel)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new CarModelController()