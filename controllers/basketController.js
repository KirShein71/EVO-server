import BasketModel from '../models/Basket.js'
import AppError from '../errors/AppError.js'

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class Basket {
    async getOne(req, res, next) {
        try {
            let basket
            if (req.signedCookies.basketId) {
                basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId))
            } else {
                basket = await BasketModel.create()
            }
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async append(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create({ userId: req.user.id }) // связываем корзину с пользователем
                basketId = created.id   
            } 
            else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const { productId, materialId, edgingId, trunkId, thirdrowId, quantity, quantity_trunk, saddleId, steelId} = req.body
            const basket = await BasketModel.append(basketId, productId, quantity, quantity_trunk, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId )
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async appendAnimal(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create({ userId: req.user.id }) // связываем корзину с пользователем
                basketId = created.id   
            } 
            else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const { animalId, materialId, quantity} = req.body
            console.log(animalId)
            const basket = await BasketModel.appendAnimal(basketId, animalId, materialId, quantity)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
       
    }

    async appendHome(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create({ userId: req.user.id }) // связываем корзину с пользователем
                basketId = created.id   
            } 
            else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const { homeId, materialId, quantity} = req.body
            const basket = await BasketModel.appendHome(basketId, homeId, materialId, quantity)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        } 
    }

    async appendBag(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create({ userId: req.user.id }) // связываем корзину с пользователем
                basketId = created.id   
            } 
            else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const { bagId, bagmaterialId, bagsizeId, quantity} = req.body
         
            const basket = await BasketModel.appendBag(basketId, bagId, bagmaterialId, bagsizeId, quantity)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        } 
    }

    async appendFavorite(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create({ userId: req.user.id }) // связываем корзину с пользователем
                basketId = created.id   
            } 
            else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            
            const { productId} = req.body
            const basket = await BasketModel.appendFavorite(basketId, productId)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        } 
    }

    async clear(req, res, next) {
        try {
            let basketId
            if (!req.signedCookies.basketId) {
                let created = await BasketModel.create()
                basketId = created.id
            } else {
                basketId = parseInt(req.signedCookies.basketId)
            }
            const basket = await BasketModel.clear(basketId)
            res.cookie('basketId', basket.id, {maxAge, signed})
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
 
}

export default new Basket()