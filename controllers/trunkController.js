import TrunkModel from "../models/Trunk.js";
import AppError from '../errors/AppError.js'

class TrunkController {

    async getAll(req, res, next) {
        try {
            const trunks = await TrunkModel.getAll(req.params.id);
            res.json(trunks);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const trunk = await TrunkModel.getOne(req.params.id)
            res.json(trunk)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAllProductId(req, res, next) {
        try {
            const trunk = await TrunkModel.getAllProductId(req.params.id);
            res.json(trunk);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const trunk = await TrunkModel.create(req.body, req.files.image,)
            res.json(trunk)
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
            const trunk = await TrunkModel.update(req.params.id, req.body, req.files.image,)
            res.json(trunk)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const trunk = await TrunkModel.delete(req.params.id)
            res.json(trunk)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new TrunkController()