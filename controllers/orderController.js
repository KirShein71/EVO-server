import OrderModel from '../models/Order.js'
import BasketModel from '../models/Basket.js'

import AppError from '../errors/AppError.js'

class Order {
   

    async create(req, res, next) {
        try {
            const { name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, tariffcode, location, deliverysum, userId, items } = req.body;
            
            
            if (!name) throw new Error('Не указано имя покупателя');
            if (!surname) throw new Error('Не указана фамалия покупателя');
            if (!phone) throw new Error('Не указан телефон покупателя');
            if (!items || Object.keys(items).length === 0) throw new Error('Отсутствуют данные о товарах');
            
            if (!req.signedCookies.basketId) throw new Error('Ваша корзина пуста');
            
            // Очистить корзину перед созданием заказа
            await BasketModel.clear(parseInt(req.signedCookies.basketId));
            
            const order = await OrderModel.create({ name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, tariffcode, location, deliverysum, userId, items });
            
            res.json(order);
        } catch(e) {
            next(AppError.badRequest(e.message));
        }
    }

    async createOrderBag(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const items = await OrderModel.createOrderBag(req.body)
            res.json(items)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async createOrderAutoRug(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const items = await OrderModel.createOrderAutoRug(req.body)
            res.json(items)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async createAdmin(req, res, next) {
        try {
            const { name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, tariffcode, location, deliverysum } = req.body;
            const { productId, materialId, edgingId, saddleId, steelId, trunkId, thirdrowId, quantity, quantity_trunk} = req.body
            const items = [{ productId, materialId, edgingId, saddleId, steelId, trunkId, thirdrowId, quantity, quantity_trunk}]
            if (!name) throw new Error('Не указано имя покупателя');
            if (!surname) throw new Error('Не указана фамалия покупателя');
            if (!phone) throw new Error('Не указан телефон покупателя');
    
            // Создаем заказ в таблице OrderModel
            const order = await OrderModel.create({ name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, tariffcode, location, deliverysum, items });
    
    
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

    async createNote(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.createNote(req.params.id, req.body,)
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

    async updateName(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.updateName(req.params.id, req.body,)
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

    async getAllForUserAccount(req, res, next) {
        try {
            if (!req.params.userId) {
                throw new Error('Не указан userId')
            }
            const orders = await OrderModel.getAllForUserAccount(req.params.userId)
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
    
    async deleteOrder(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.deleteOrder(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async deleteOrderItem(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.deleteOrderItem(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    
}

export default new Order()