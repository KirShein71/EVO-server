import BagModel from '../models/Bag.js'
import AppError from '../errors/AppError.js'

class BagController {

    async getAll(req, res, next) {
        try {
            const bags = await BagModel.getAll(req.params.id);
            res.json(bags);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.originalName) {
                throw new Error('Не указан имя товара')
            }
            const bag = await BagModel.getOne(req.params.originalName)
            res.json(bag)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const bag = await BagModel.create(req.body, req.files.image)
            res.json(bag)
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
            const bag = await BagModel.update(req.params.id, req.body, req.files.image)
            res.json(bag)
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
            const bag = await BagModel.updatePrice(req.params.id, req.body)
            res.json(bag)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const bag = await BagModel.delete(req.params.id)
            res.json(bag)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAllBagSize(req, res, next) {
        try {
            const bags = await BagModel.getAllBagSize(req.params.id);
            res.json(bags);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }


    async getAllBagMaterial(req, res, next) {
        try {
            const materials = await BagModel.getAllBagMaterial(req.params.id);
            res.json(materials);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }
}

export default new BagController()