import {Favorite as FavoriteMapping} from './mapping.js'
import { Basket as BasketMapping } from './mapping.js'
import { BasketProduct as BasketProductMapping } from './mapping.js'




const pretty = (basket) => {
    const data = {}
    data.id = basket.id

    return data
}
    
    class Basket {
        async getOne(basketId) {
            let basket = await BasketMapping.findByPk(basketId)
            if (!basket) {
                basket = await BasketMapping.create()
            }
            return basket
        }
    
        async create() {
            const basket = await BasketMapping.create()
            return pretty(basket)
        }
    
        async append(basketId, productId, quantity, quantity_trunk, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId) {
            await BasketProductMapping.create({ basketId, materialId, edgingId, trunkId, thirdrowId, productId, quantity, quantity_trunk, saddleId, steelId })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

    
        async appendHome(basketId, homeId, materialId, quantity) {
            await BasketProductMapping.create({ basketId, homeId, materialId, quantity })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

        async appendBag(basketId, bagId, bagmaterialId, bagsizeId, quantity) {
            await BasketProductMapping.create({ basketId, bagId, bagmaterialId, bagsizeId, quantity })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

        async appendFavorite(basketId, productId) {
            await FavoriteMapping.create({ basketId, productId })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

        async clear(basketId) {
            let basket = await BasketMapping.findByPk(basketId)
            if (basket) {
                await BasketProductMapping.destroy({where: {basketId}})
                // обновим объект корзины, чтобы вернуть свежие данные
                await basket.reload()
            } else {
                basket = await Basket.create()
            }
            return pretty(basket)
        }

    }
    
    export default new Basket()