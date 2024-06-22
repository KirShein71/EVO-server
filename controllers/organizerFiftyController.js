import OrganizerFiftyModel from '../models/OrganizerFifty.js'
import AppError from '../errors/AppError.js'

class OrganizerFiftyController {

    async getAll(req, res, next) {
        try {
            const organizers = await OrganizerFiftyModel.getAll(req.params.id);
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
            const organizer = await OrganizerFiftyModel.getOne(req.params.id)
            res.json(organizer)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

}

export default new OrganizerFiftyController()