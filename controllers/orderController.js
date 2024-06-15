import OrderModel from '../models/Order.js'
import BasketModel from '../models/Basket.js'

import AppError from '../errors/AppError.js'

class Order {
   

    async create(req, res, next) {
        try {
            const { name, phone, delivery, region, city, items } = req.body;
            
            
            if (!name) throw new Error('Не указано имя покупателя');
            if (!phone) throw new Error('Не указан телефон покупателя');
            if (!items || Object.keys(items).length === 0) throw new Error('Отсутствуют данные о товарах');
            
            if (!req.signedCookies.basketId) throw new Error('Ваша корзина пуста');
            
            // Очистить корзину перед созданием заказа
            await BasketModel.clear(parseInt(req.signedCookies.basketId));
            
            const order = await OrderModel.create({ name, phone, delivery, region, city, items });
            
            res.json(order);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async createAdmin(req, res, next) {
        try {
            const { name, phone, delivery, region, city, productId, materialId, edgingId, cellshapeId, bodyId, saddleId, steelId, organizerId, trunkId, thirdrowId, quantity, quantity_trunk } = req.body;
            const items = [{ productId, materialId, edgingId, cellshapeId, bodyId, saddleId, steelId, organizerId, trunkId, thirdrowId, quantity, quantity_trunk}]
            if (!name) throw new Error('Не указано имя покупателя');
            if (!phone) throw new Error('Не указан телефон покупателя');
    
            // Создаем заказ в таблице OrderModel
            const order = await OrderModel.create({ name, phone, delivery, region, city, items });
    
    
            res.json(order);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async updateStatus(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.updateStatus(req.params.id, req.body,)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async updateOrder(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.updateOrder(req.params.id, req.body,)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async updatePhone(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.updatePhone(req.params.id, req.body,)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async updateDelivery(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.updateDelivery(req.params.id, req.body,)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


   
    async getAll(req, res, next) {
        try {
            const orders = await OrderModel.getAll()
            res.json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.getOne(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOneOrderItem(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.getOneOrderItem(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    
    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.delete(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    
}

export default new Order()