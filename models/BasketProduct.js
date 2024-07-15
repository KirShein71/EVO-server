import { BasketProduct as BasketProductMapping } from './mapping.js'
import { Basket as BasketMapping } from './mapping.js'
import { Product as ProductMapping} from './mapping.js'
import { Material as MaterialMapping } from './mapping.js'
import { Edging as EdgingMapping} from './mapping.js'
import { Trunk as TrunkMapping } from './mapping.js'
import { Thirdrow as ThirdrowMapping } from './mapping.js'
import {Animal as AnimalMapping} from './mapping.js'
import { Home as HomeMapping} from './mapping.js'
import { Saddle as SaddleMapping } from './mapping.js'
import { Steel as SteelMapping} from './mapping.js'
import { Organizer as OrganizerMapping } from './mapping.js'
import { OrganizerFifty as OrganizerFiftyMapping } from './mapping.js'


class BasketProduct {
    async getAll(basketId) {
        const basketproduct = await BasketProductMapping.findAll({
            where: {
                basketId: basketId,
            },
            include: [
                {model: ProductMapping, attributes: ['name', 'new_price']},
                {model: MaterialMapping, attributes: ['name', 'image']},
                {model: EdgingMapping, attributes: ['name', 'image']},
                {model: TrunkMapping, attributes: ['new_price'],
                    include: [
                        {model: ProductMapping, attributes: ['name']}
                    ]
                },
                {model: ThirdrowMapping, attributes: ['new_price']},
                {model: AnimalMapping, attributes: ['name', 'image', 'new_price']},
                {model: HomeMapping, attributes: ['name', 'image', 'new_price']},
                {model: SaddleMapping, attributes: ['name', 'new_price']},
                {model: SteelMapping, attributes: ['name', 'new_price']},
                {model: OrganizerMapping, attributes: ['size', 'new_price']},
                {model: OrganizerFiftyMapping, attributes: ['size', 'new_price']}
                
            ]
        });
        return basketproduct;
    }



    async getOne(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        return item
    }

    async create(basketId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        
        const item = await BasketProductMapping.create({basketId})
        
       
        return item
    }

    async delete(basketId, id) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const basketproduct = await BasketProductMapping.findByPk(id, {where: {basketId}})
        if (!basketproduct) {
            throw new Error('Товар не найден в БД')
        }
        await basketproduct.destroy()
        return basketproduct
    }
}

export default new BasketProduct()