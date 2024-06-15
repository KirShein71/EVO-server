import MaterialModel from "../models/Material.js";
import AppError from '../errors/AppError.js'

class MaterialController {

    async getAll(req, res, next) {
        try {
            const material = await MaterialModel.getAll()
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAllMaterialForAnimal(req, res, next) {
        try {
            const material = await MaterialModel.getAllMaterialForAnimal()
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const material = await MaterialModel.getOne(req.params.id)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const material = await MaterialModel.create(req.body, req.files.image)
            res.json(material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const Material = await MaterialModel.delete(req.params.id)
            res.json(Material)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new MaterialController()