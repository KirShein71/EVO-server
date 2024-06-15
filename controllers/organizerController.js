import OrganizerModel from '../models/Organizer.js'
import AppError from '../errors/AppError.js'

class OrganizerController {

    async getAll(req, res, next) {
        try {
            const organizers = await OrganizerModel.getAll(req.params.id);
            res.json(organizers);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

 

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const organizer = await OrganizerModel.getOne(req.params.id)
            res.json(organizer)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const organizer = await OrganizerModel.create(req.body, req.files.image)
            res.json(organizer)
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
            const organizer = await OrganizerModel.update(req.params.id, req.body, req.files?.image)
            res.json(organizer)
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
            const organizer = await OrganizerModel.updatePrice(req.params.id, req.body)
            res.json(organizer)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const organizer = await OrganizerModel.delete(req.params.id)
            res.json(organizer)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new OrganizerController()