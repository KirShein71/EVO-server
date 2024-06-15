import BodyModel from "../models/Body.js";
import AppError from '../errors/AppError.js'

class BodyController {

    async getAll(req, res, next) {
        try {
            const body = await BodyModel.getAll()
            res.json(body)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const body = await BodyModel.getOne(req.params.id)
            res.json(body)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

}

export default new BodyController()