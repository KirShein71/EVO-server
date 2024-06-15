import { Steel as SteelMapping} from './mapping.js'
import FileService from '../services/File.js'


class Steel {

async getAll() {
    const steels = await SteelMapping.findAll()
    return steels
}

async getOne(id) {
    const steel = await SteelMapping.findByPk(id)
    if (!steel) { 
        throw new Error('Товар не найден в БД')
    }
    return steel
}



async update(id, data, img) {
    const steel = await SteelMapping.findByPk(id)
    if (!steel) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && steel.image) {
        FileService.delete(steel.image)
    }
    const {
        name = steel.name,
        old_price = steel.old_price,
        new_price = steel.new_price,
        image = file ? file : steel.image
    } = data
    await steel.update({name, image, old_price, new_price})
    await steel.reload()
    return steel
}

async updatePrice(id, data) {
    const steel = await SteelMapping.findByPk(id)
    if (!steel) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = steel.old_price,
        new_price = steel.new_price,
    } = data
    await steel.update({ old_price, new_price})
    await steel.reload()
    return steel
}

async delete(id) {
    const steel = await SteelMapping.findByPk(id)
    if (!steel) {
        throw new Error('Проект не найден в БД')
    }
    if (steel.image) { 
        FileService.delete(steel.image)
    }
    await steel.destroy()
    return steel
}

}

export default new Steel;