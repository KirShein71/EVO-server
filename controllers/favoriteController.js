import FavoriteModel from '../models/Favorite.js'
import BasketModel from '../models/Basket.js'
import AppError from '../errors/AppError.js'

const check = async (req, res, next) => {
    try {
        if (!req.signedCookies.basketId) {
            throw new Error('Корзина еще не создана')
        }
        const exist = await BasketModel.getOne(req.signedCookies.basketId)
        if (!exist) {
            res.clearCookie('basketId')
            throw new Error('Корзина не найдена в БД')
        }
    } catch(e) {
        next(AppError.badRequest(e.message))
    }
}

class FavoriteController {

    async getAll(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            const products = await FavoriteModel.getAll(req.signedCookies.basketId)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await FavoriteModel.create(
                req.signedCookies.basketId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const favorite = await FavoriteModel.delete(
                req.signedCookies.basketId,
                req.params.productId,
            )
            res.json(favorite)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    
}

export default new FavoriteController()