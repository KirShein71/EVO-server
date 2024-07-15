import {Trunk as TrunkMapping} from './mapping.js'; 
import FileService from '../services/File.js'



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

async create(data, img) {
    const image = FileService.save(img) || ''
    const {name, old_price, new_price, productId} = data
    const trunk = await TrunkMapping.create({ name, old_price, new_price, image, productId})
    const created = await TrunkMapping.findByPk(trunk.id) 
    return created
}


async update(id, data, img) {
    const trunk = await TrunkMapping.findByPk(id)
    if (!trunk) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && product.image ) {
        FileService.delete(product.image)
    }
    const {
        name = trunk.name,
        old_price = trunk.old_price,
        new_price = trunk.new_price,
        image = file ? file : trunk.image,
    } = data
    await trunk.update({ name, old_price, new_price, image})
    await trunk.reload()
    return trunk
}

async delete(id) {
    const trunk = await TrunkMapping.findByPk(id)
    if (!trunk) {
        throw new Error('Проект не найден в БД')
    }
    await trunk.destroy()

    const image = trunk.image
    FileService.delete(image)

    return trunk
}

}

export default new Trunk;