import ThirdrowModel from "../models/Thirdrow.js";
import AppError from '../errors/AppError.js'

class ThirdrowController {

    async getAll(req, res, next) {
        try {
            const thirdrows = await ThirdrowModel.getAll(req.params.id);
            res.json(thirdrows);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const thirdrow = await ThirdrowModel.getOne(req.params.id)
            res.json(thirdrow)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAllProductId(req, res, next) {
        try {
            const thirdrow = await ThirdrowModel.getAllProductId(req.params.id);
            res.json(thirdrow);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const thirdrow = await ThirdrowModel.create(req.body, req.files.image,)
            res.json(thirdrow)
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
            const thirdrow = await ThirdrowModel.update(req.params.id, req.body)
            res.json(thirdrow)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const thirdrow = await ThirdrowModel.delete(req.params.id)
            res.json(thirdrow)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ThirdrowController()