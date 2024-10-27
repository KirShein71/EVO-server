import { Order as OrderMapping } from './mapping.js'
import { OrderItem as OrderItemMapping } from './mapping.js'
import { Product as ProductMapping} from './mapping.js'
import { Material as MaterialMapping} from './mapping.js'
import { Edging as EdgingMapping } from './mapping.js'
import { Trunk as TrunkMapping} from './mapping.js'
import { Thirdrow as ThirdrowMapping } from './mapping.js'
import { Home as HomeMapping} from './mapping.js'
import { HomeImage as HomeImageMapping } from './mapping.js'
import { Saddle as SaddleMapping } from './mapping.js'
import { Steel as SteelMapping } from './mapping.js'
import { Bag as BagMapping} from './mapping.js'
import { BagMaterial as BagMaterialMapping } from './mapping.js'
import { BagSize as BagSizeMapping } from './mapping.js'
import { BagImage as BagImageMapping } from './mapping.js'




class Order {
    async getAll() {
        const orders = await OrderMapping.findAll({
            include: [
                {
                    model: OrderItemMapping,
                    include: [
                        { model: ProductMapping, attributes: ['name', 'new_price'] },
                        { model: HomeMapping, attributes: ['name', 'new_price'] },
                        { model: MaterialMapping, attributes: ['name'] },
                        { model: EdgingMapping, attributes: ['name'] },
                        { model: TrunkMapping, attributes: ['new_price'], include: [{ model: ProductMapping, attributes: ['name'] }] },
                        { model: ThirdrowMapping, attributes: ['new_price'] },
                        { model: SaddleMapping, attributes: ['name', 'new_price'] },
                        { model: SteelMapping, attributes: ['name', 'new_price'] },
                        { model: BagMapping, attributes: ['name'] },
                        { model: BagMaterialMapping, attributes: ['name'] },
                        { model: BagSizeMapping, attributes: ['size', 'price'] }
                    ]
                }
            ],
            order: [['id', 'ASC']]
        });
    
        // Суммируем цены для каждого заказа
        const ordersWithTotal = orders.map(order => {
            const orderTotal = order.order_items.reduce((itemTotal, orderItem) => {
                // Суммируем цены каждого атрибута
                return itemTotal +
                    (orderItem.product ? orderItem.product.new_price * orderItem.quantity : 0) +
                    (orderItem.home ? orderItem.home.new_price * orderItem.quantity : 0) +
                    (orderItem.bagsize ? orderItem.bagsize.price * orderItem.quantity : 0) +
                    (orderItem.steel ? orderItem.steel.new_price : 0) +
                    (orderItem.saddle ? orderItem.saddle.new_price : 0) +
                    (orderItem.thirdrow ? orderItem.thirdrow.new_price * orderItem.quantity : 0) +
                    (orderItem.trunk ? orderItem.trunk.new_price * (orderItem.quantity_trunk || 1) : 0);
            }, 0);
    
            return {
                ...order.toJSON(), // Преобразуем заказ в объект
                total: orderTotal // Добавляем сумму заказа
            };
        });
    
        console.log("Orders with Total:", ordersWithTotal);
        return ordersWithTotal; // Возвращаем заказы с их суммами
    }

    async getAllForUserAccount(userId) {
        const order = await OrderMapping.findAll({
            where: {
                userId: userId 
            }, 
            include: [
                {
                    model: OrderItemMapping, include: 
                    [
                        { model: ProductMapping, attributes: ['name', 'new_price', 'image'] },
                        {model: HomeMapping, attributes: ['name', 'new_price'], 
                            include: [
                                {model: HomeImageMapping, attributes: ['image', 'materialId']}
                            ]
                        },
                        {model: MaterialMapping, attributes: ['name', 'image']},
                        {model: EdgingMapping, attributes: ['name', 'image']},
                        { model: TrunkMapping, attributes: ['new_price'], include: [{ model: ProductMapping, attributes: ['name'] }] },
                        { model: ThirdrowMapping, attributes: ['new_price'] },
                        {model: SaddleMapping, attributes: ['name', 'new_price', 'image']},
                        {model: SteelMapping, attributes: ['name', 'new_price', 'image']},
                        {model: BagMapping, attributes: ['name'],
                            include: [
                                {model: BagImageMapping, attributes: ['image', 'bagmaterialId', 'bagsizeId']}
                            ]
                        },
                        {model: BagMaterialMapping, attributes: ['name']},
                        {model: BagSizeMapping, attributes: ['size', 'price']} 
                    ]
                }
            ]
        })

        return order
    }

    async getOne(id) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const { status, name, surname, phone, city, region, delivery, codepvz, totalamount, citycode, street, home, flat, note, tariffcode, location, deliverysum} = order
        return { status, name, surname, phone, city, region, delivery, codepvz, totalamount, citycode, street, home, flat, note, tariffcode, location, deliverysum}
    }

    async getOneOrderItem(id) {
        const order = await OrderItemMapping.findByPk(id);
        if (!order) {
            throw new Error('Товар не найден в БД');
        }
    
        const { materialId, edgingId, saddleId,  steelId, productId, trunkId, thirdrowId, quantity, quantity_trunk,  bagId, bagmaterialId, bagfourtyId, bagfiftyId, quantity_bagfourty, quantity_bagfifty } = order;
        return { materialId, edgingId, saddleId, steelId, productId, trunkId, thirdrowId, quantity, quantity_trunk,  bagId, bagmaterialId, bagfourtyId, bagfiftyId, quantity_bagfourty, quantity_bagfifty };
    }

   

    async create(data) {
        if (!data || !data.items) {
            throw new Error('Data or items are missing');
        }
        const items = data.items;
        const { name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, status = 'Новый', tariffcode, location, deliverysum, userId } = data;
        const order = await OrderMapping.create({
            name,
            surname,
            phone,
            status,
            delivery,
            region,
            city,
            codepvz,
            totalamount, 
            citycode, 
            street, 
            home, 
            flat,
            tariffcode,
            location,
            deliverysum,
            userId
        });
    
        for (let item of items) {
            await OrderItemMapping.create({
                productId: item.productId, 
                homeId: item.homeId,
                orderId: order.id,
                materialId: item.materialId,
                edgingId: item.edgingId,
                trunkId: item.trunkId,
                thirdrowId: item.thirdrowId,
                saddleId: item.saddleId,
                steelId: item.steelId,
                quantity: item.quantity,
                quantity_trunk: item.quantity_trunk,
                bagId: item.bagId,
                bagmaterialId: item.bagmaterialId,
                bagsizeId: item.bagsizeId
               
            });
        }
        
    
        const created = await OrderMapping.findByPk(order.id);
        return created;
    }

    async createOrderBag(data) {
        const {bagId, bagmaterialId, bagsizeId, quantity, orderId } = data
        const items = await OrderItemMapping.create({ bagId, bagmaterialId, bagsizeId, quantity, orderId })
        
        const created = await OrderItemMapping.findByPk(items.id) 
        return created
    }

    async createOrderAutoRug(data) {
        const {productId, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId, quantity, quantity_trunk, orderId } = data
        const items = await OrderItemMapping.create({ productId, materialId, edgingId, trunkId, thirdrowId, saddleId, steelId, quantity, quantity_trunk,  orderId })
        
        const created = await OrderItemMapping.findByPk(items.id) 
        return created
    }

    async createAdmin(data) {
        if (!data || !data.items) {
            throw new Error('Data or items are missing');
        }
        const items = data.items;
        const { name, surname, phone, delivery, region, city, codepvz, totalamount, citycode, street, home, flat, status = 'Новый', tariffcode, location, deliverysum } = data;
        const order = await OrderMapping.create({
            name,
            surname,
            phone,
            status,
            delivery,
            region,
            city,
            codepvz,
            totalamount, 
            citycode, 
            street, 
            home, 
            flat,
            tariffcode,
            location,
            deliverysum
        });
    
        for (let item of items) {
            await OrderItemMapping.create({
                productId: item.productId, 
                orderId: order.id,
                materialId: item.materialId,
                edgingId: item.edgingId,
                trunkId: item.trunkId,
                thirdrowId: item.thirdrowId,
                saddleId: item.saddleId,
                steelId: item.steelId,
                quantity: item.quantity,
                quantity_trunk: item.quantity_trunk,

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

    async createNote(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            note = order.note,
        } = data
        await order.update({note})
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
                edgingId= order.edgingId,
                saddleId= order.saddleId,
                steelId= order.steelId,
                trunkId = order.trunkId,
                thirdrowId = order.thirdrowId,
                quantity_trunk = order.quantity_trunk,
                quantity= order.quantity,
            
              
        } = data
        await order.update({materialId, edgingId, saddleId, steelId, trunkId, thirdrowId, quantity_trunk, quantity })
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

    async updateName(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            name = order.name,
            surname = order.surname,
        } = data
        await order.update({name, surname})
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
    
    
    async deleteOrder(id) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        await order.destroy()
        return order
    }

    async deleteOrderItem(id) {
        const order = await OrderItemMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        await order.destroy()
        return order
    }
}

export default new Order()