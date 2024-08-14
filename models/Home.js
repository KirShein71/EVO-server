import { Home as HomeMapping } from './mapping.js'
import { HomeImage as HomeImageMapping } from './mapping.js'



class Home {

async getAll() {
    const homes = await HomeMapping.findAll({
        include : [
            {model: HomeImageMapping, attributes: ['id', 'image', 'materialId']}
        ],
        order: [
            ['name', 'ASC'],
        ],
    })
    return homes
}

async getOne(id) {
    const home = await HomeMapping.findByPk(id)
    if (!home) { 
        throw new Error('Товар не найден в БД')
    }
    return home
}

async create(data) {
    const {name, old_price, new_price} = data
    const home = await HomeMapping.create({name, old_price, new_price})
    const created = await HomeMapping.findByPk(home.id) 
    return created
}



async update(id, data) {
    const home = await HomeMapping.findByPk(id)
    if (!home) {
        throw new Error('Товар не найден в БД')
    }
    const {
        name = home.name,
        old_price = home.old_price,
        new_price = home.new_price,
    } = data
    await home.update({name, old_price, new_price})
    await home.reload()
    return home
}

async updatePrice(id, data) {
    const home = await HomeMapping.findByPk(id)
    if (!home) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = home.old_price,
        new_price = home.new_price,
    } = data
    await home.update({ old_price, new_price})
    await home.reload()
    return home
}

async delete(id) {
    const home = await HomeMapping.findByPk(id)
    if (!home) {
        throw new Error('Товар не найден в БД')
    }
    await home.destroy()
    return home
}

}

export default new Home;