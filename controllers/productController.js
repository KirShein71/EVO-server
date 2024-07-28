import ProductModel from "../models/Product.js";
import AppError from '../errors/AppError.js'

class ProductController {

    async getAll(req, res, next) {
        try {
            const products = await ProductModel.getAll(req.params.id);
            res.json(products);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getAllByBrandId(req, res, next) {
        try {
            const products = await ProductModel.getAllByBrandId(req.params.id);
            res.json(products);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getSaleProduct(req, res, next) {
        try {
            const products = await ProductModel.getSaleProduct(req.params.id);
            res.json(products);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteSaleProduct(req, res, next) {
        try {
            const id = req.params.sale;
            
            const product = await ProductModel.deleteSaleProduct(id);
            res.json(product);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.originalName) {
                throw new Error('Не указан id товара')
            }
          console.log(req.params.originalName)
            const product = await ProductModel.getOne(req.params.originalName)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const brand = await ProductModel.create(req.body, req.files.image, req.files.pattern_image)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async createSale(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const product = await ProductModel.createSale(req.params.id, req.body,)
         
            res.json(product)
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
            const product = await ProductModel.update(req.params.id, req.body, req.files.image, req.files.pattern_image)
            res.json(product)
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
            const product = await ProductModel.updatePrice(req.params.id, req.body)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.delete(req.params.id)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new ProductController()