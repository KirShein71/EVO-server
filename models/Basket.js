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
    
        async append(basketId, productId, quantity, quantity_trunk, materialId, cellshapeId, edgingId, bodyId, trunkId, thirdrowId, saddleId, steelId, organizerId) {
            await BasketProductMapping.create({ basketId, materialId, cellshapeId, edgingId, bodyId, trunkId, thirdrowId, productId, quantity, quantity_trunk, saddleId, steelId, organizerId })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

    
        async appendAnimal(basketId, animalId, materialId, edgingId, quantity) {
            await BasketProductMapping.create({ basketId, animalId, materialId, edgingId, quantity })
            const basket = await BasketMapping.findByPk(basketId)
            return pretty(basket)
        }

        async appendHome(basketId, homeId, materialId, edgingId, quantity) {
            await BasketProductMapping.create({ basketId, homeId, materialId, edgingId, quantity })
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