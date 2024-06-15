import CdekModel from '../models/cdek.js'
import AppError from '../errors/AppError.js'


class CdekController {
    async getAllRegion(req, res, next) {
        try {
            const cdek = await CdekModel.getAllRegion();
            res.json(cdek);
        } catch (error) {
            next(AppError.badRequest(error.message));
        }
    }
}

export default new CdekController()
