import {  Order as OrderMapping } from './mapping.js'
import { OrderItem as OrderItemMapping } from './mapping.js'
import { Product as ProductMapping} from './mapping.js'
import { Material as MaterialMapping} from './mapping.js'
import { CellShape as CellShapeMapping } from './mapping.js'
import { Body as BodyMapping } from './mapping.js'
import { Edging as EdgingMapping } from './mapping.js'
import { Trunk as TrunkMapping} from './mapping.js'
import { Thirdrow as ThirdrowMapping } from './mapping.js'
import { Animal as AnimalMapping } from './mapping.js'
import { Home as HomeMapping} from './mapping.js'
import { Saddle as SaddleMapping } from './mapping.js'
import { Steel as SteelMapping } from './mapping.js'
import { Organizer as OrganizerMapping } from './mapping.js'


class Order {
    async getAll() {
        const orders = await OrderItemMapping.findAll({
                    include: [
                        {model: OrderMapping, attributes: ['name', 'phone', 'status', 'id', 'delivery', 'region', 'city']},
                        { model: ProductMapping, attributes: ['name'] }, 
                        {model: AnimalMapping, attributes: ['name']},
                        {model: HomeMapping, attributes: ['name']},
                        { model: MaterialMapping, attributes: ['name'] },
                        { model: CellShapeMapping, attributes: ['name']},
                        { model: EdgingMapping, attributes: ['name']},
                        {model: BodyMapping, attributes: ['name']},
                        {model: TrunkMapping, include: [{model: ProductMapping, attributes: ['name']}]},
                        {model: ThirdrowMapping},
                        {model: SaddleMapping, attributes: ['name']},
                        {model: SteelMapping, attributes: ['name']},
                        {model: OrganizerMapping, attributes: ['size']}
                    ],
                    order: [
                        ['id', 'ASC'],
                    ],
                },
        )
        return orders
    }

    async getOne(id) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const { status, phone, city, region, delivery} = order
        return { status, phone, city, region, delivery}
    }

    async getOneOrderItem(id) {
        const order = await OrderItemMapping.findByPk(id);
        if (!order) {
            throw new Error('Товар не найден в БД');
        }
    
        const { materialId, bodyId, edgingId, saddleId, organizerId, steelId, productId, trunkId, thirdrowId, quantity, quantity_trunk } = order;
        return { materialId, bodyId, edgingId, saddleId, steelId, organizerId, productId, trunkId, thirdrowId, quantity, quantity_trunk };
    }

   

    async create(data) {
        if (!data || !data.items) {
            throw new Error('Data or items are missing');
        }
        const items = data.items;
        const { name, phone, delivery, region, city, status = 'Новый' } = data;
        const order = await OrderMapping.create({
            name,
            phone,
            status,
            delivery,
            region,
            city
        });
    
        for (let item of items) {
            await OrderItemMapping.create({
                productId: item.productId, 
                animalId: item.animalId,
                homeId: item.homeId,
                orderId: order.id,
                materialId: item.materialId,
                bodyId: item.bodyId,
                cellshapeId: item.cellshapeId,
                edgingId: item.edgingId,
                trunkId: item.trunkId,
                thirdrowId: item.thirdrowId,
                saddleId: item.saddleId,
                steelId: item.steelId,
                organizerId: item.organizerId,
                quantity: item.quantity,
                quantity_trunk: item.quantity_trunk
            });
        }
        
    
        const created = await OrderMapping.findByPk(order.id);
        return created;
    }

    async createAdmin(data) {
        if (!data || !data.items) {
            throw new Error('Data or items are missing');
        }
        const items = data.items;
        const { name, phone, delivery, region, city, status = 'Новый' } = data;
        const order = await OrderMapping.create({
            name,
            phone,
            status,
            delivery,
            region,
            city
        });
    
        for (let item of items) {
            await OrderItemMapping.create({
                productId: item.productId, 
                animalId: item.animalId,
                homeId: item.homeId,
                orderId: order.id,
                materialId: item.materialId,
                bodyId: item.bodyId,
                cellshapeId: item.cellshapeId,
                edgingId: item.edgingId,
                trunkId: item.trunkId,
                thirdrowId: item.thirdrowId,
                saddleId: item.saddleId,
                steelId: item.steelId,
                organizerId: item.organizerId,
                quantity: item.quantity,
                quantity_trunk: item.quantity_trunk
            });
        }
        
    
        const created = await OrderMapping.findByPk(order.id);
        return created;
    }

    async updateStatus(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            status = order.status,
        } = data
        await order.update({status})
        await order.reload()
        return order
    }


    async updateOrder(id, data) {
        const order = await OrderItemMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
                materialId= order.materialId,
                bodyId= order.bodyId,
                edgingId= order.edgingId,
                saddleId= order.saddleId,
                steelId= order.steelId,
                organizerId= order.organizerId,
                trunkId = order.trunkId,
                thirdrowId = order.thirdrowId,
                quantity_trunk = order.quantity_trunk,
                quantity= order.quantity,
              
        } = data
        await order.update({materialId, bodyId, edgingId, saddleId, steelId, organizerId, trunkId, thirdrowId, quantity_trunk, quantity, })
        await order.reload()
        return order
    }

    async updatePhone(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            phone = order.phone,
        } = data
        await order.update({phone})
        await order.reload()
        return order
    }

    async updateDelivery(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            delivery = order.delivery,
            city = order.city,
            region = order.region
        } = data
        await order.update({delivery, city, region})
        await order.reload()
        return order
    }
    
    
    async delete(id) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        await order.destroy()
        return order
    }
}

export default new Order()