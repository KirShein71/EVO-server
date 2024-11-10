import { Favorite as FavoriteMapping } from './mapping.js'
import { Basket as BasketMapping } from './mapping.js'
import { Product as ProductMapping} from './mapping.js'



class Favorite {
    async getAll(basketId) {
        const favorite = await FavoriteMapping.findAll({
            where: {
                basketId: basketId,
            },
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'new_price', 'old_price', 'image', 'pattern_image']},
            ]
        });
        return favorite;
    }

    async create(basketId) {
        const favorite = await BasketMapping.findByPk(basketId)
        if (!favorite) {
            throw new Error('Корзина не найдена в БД')
        }
        
        const item = await FavoriteMapping.create({basketId})
        
       
        return item
    }


    async delete(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const favorite = await FavoriteMapping.findOne( {where: {basketId, product_id: productId}})
        if (!favorite) {
            throw new Error('Товар не найден в БД')
        }
        await favorite.destroy()
        return favorite
    }

}

export default new Favorite()