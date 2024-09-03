import BasketProductModel from '../models/BasketProduct.js'
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

class BasketProduct {

   

    async getAll(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            const products = await BasketProductModel.getAll(req.signedCookies.basketId)
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
            const item = await BasketProductModel.create(
                req.signedCookies.basketId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) // проверяем существование корзины
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            const item = await BasketProductModel.update(
                req.signedCookies.basketId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }



    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            const basketproduct = await BasketProductModel.delete(
                req.signedCookies.basketId,
                req.params.id,
            )
            res.json(basketproduct)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async deleteTrunk(req, res, next) {
        try {
            const id = req.params.trunk_id;
            
            const basketproduct = await BasketProductModel.deleteTrunk(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteOrganizer(req, res, next) {
        try {
            const id = req.params.organizer_id;
            
            const basketproduct = await BasketProductModel.deleteOrganizer(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteOrganizerFifty(req, res, next) {
        try {
            const id = req.params.organizerfifty_id;
            
            const basketproduct = await BasketProductModel.deleteOrganizerFifty(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteSteel(req, res, next) {
        try {
            const id = req.params.steel_id;
            
            const basketproduct = await BasketProductModel.deleteSteel(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteSaddle(req, res, next) {
        try {
            const id = req.params.saddle_id;
            
            const basketproduct = await BasketProductModel.deleteSaddle(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteBagFourty(req, res, next) {
        try {
            const id = req.params.bagfourty_id;
            
            const basketproduct = await BasketProductModel.deleteBagFourty(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async deleteBagFifty(req, res, next) {
        try {
            const id = req.params.bagfifty_id;
            
            const basketproduct = await BasketProductModel.deleteBagFifty(req.signedCookies.basketId, id);
            res.json(basketproduct);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    

}

export default new BasketProduct()