import {Trunk as TrunkMapping} from './mapping.js'; 



class Trunk {

async getAll() {
    const trunks = await TrunkMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return trunks
}


async getOne(id) {
    const trunk = await TrunkMapping.findByPk(id)
    if (!trunk) { 
        throw new Error('Товар не найден в БД')
    }
    return trunk
}

async getAllProductId(productId) {
    const trunk = await TrunkMapping.findAll({
        where: {
            productId: productId
        },
    })
    return trunk
}

async create(data) {
    const {old_price, new_price, productId} = data
    const trunk = await TrunkMapping.create({ old_price, new_price, productId})
    const created = await TrunkMapping.findByPk(trunk.id) 
    return created
}


async update(id, data) {
    const trunk = await TrunkMapping.findByPk(id)
    if (!trunk) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = trunk.old_price,
        new_price = trunk.new_price,
    } = data
    await trunk.update({ old_price, new_price})
    await trunk.reload()
    return trunk
}

async delete(id) {
    const trunk = await TrunkMapping.findByPk(id)
    if (!trunk) {
        throw new Error('Проект не найден в БД')
    }
    await trunk.destroy()
    return trunk
}

}

export default new Trunk;