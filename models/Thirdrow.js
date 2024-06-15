import {Thirdrow as ThirdrowMapping} from './mapping.js'; 
import FileService from '../services/File.js';



class Thirdrow {

async getAll() {
    const thirdrows = await ThirdrowMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return thirdrows
}


async getOne(id) {
    const thirdrow = await ThirdrowMapping.findByPk(id)
    if (!thirdrow) { 
        throw new Error('Товар не найден в БД')
    }
    return thirdrow
}

async getAllProductId(productId) {
    const thirdrow = await ThirdrowMapping.findAll({
        where: {
            productId: productId
        },
    })
    return thirdrow
}

async create(data, img) {
    const image = FileService.save(img) ?? ''
    const {old_price, new_price, productId} = data
    const thirdrow = await ThirdrowMapping.create({ old_price, new_price, image, productId})
    const created = await ThirdrowMapping.findByPk(thirdrow.id) 
    return created
}


async update(id, data, img) {
    const thirdrow = await ThirdrowMapping.findByPk(id)
    if (!thirdrow) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && thirdrow.image ) {
        FileService.delete(thirdrow.image)
    }
    const {
        old_price = thirdrow.old_price,
        new_price = thirdrow.new_price,
        image = file ? file : thirdrow.image,
    } = data
    await thirdrow.update({ old_price, new_price, image})
    await thirdrow.reload()
    return thirdrow
}

async delete(id) {
    const thirdrow = await ThirdrowMapping.findByPk(id)
    if (!thirdrow) {
        throw new Error('Проект не найден в БД')
    }
    await thirdrow.destroy()

    const image = thirdrow.image
    FileService.delete(image)

    return thirdrow
}

}

export default new Thirdrow;