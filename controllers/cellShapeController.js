import CellShapeModel from "../models/CellShape.js";
import AppError from '../errors/AppError.js'

class CellShapeController {

    async getAll(req, res, next) {
        try {
            const cellshape = await CellShapeModel.getAll()
            res.json(cellshape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const cellshape = await CellShapeModel.getOne(req.params.id)
            res.json(cellshape)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

}

export default new CellShapeController()