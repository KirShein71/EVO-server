import { Home as HomeMapping } from './mapping.js'
import FileService from '../services/File.js'


class Home {

async getAll() {
    const homes = await HomeMapping.findAll({
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

async create(data, img) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) ?? ''
    const {name, old_price, new_price} = data
    const home = await HomeMapping.create({name, image, old_price, new_price})
    const created = await HomeMapping.findByPk(home.id) 
    return created
}



async update(id, data, img) {
    const home = await HomeMapping.findByPk(id)
    if (!home) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && home.image) {
        FileService.delete(home.image)
    }
    const {
        name = home.name,
        old_price = home.old_price,
        new_price = home.new_price,
        image = file ? file : home.image
    } = data
    await home.update({name, image, old_price, new_price})
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
        throw new Error('Проект не найден в БД')
    }
    if (home.image) { 
        FileService.delete(home.image)
    }
    await home.destroy()
    return home
}

}

export default new Home;