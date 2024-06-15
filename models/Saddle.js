import { Saddle as SaddleMapping } from './mapping.js'
import FileService from '../services/File.js'


class Saddle {

async getAll() {
    const saddles = await SaddleMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return saddles
}

async getOne(id) {
    const saddle = await SaddleMapping.findByPk(id)
    if (!saddle) { 
        throw new Error('Товар не найден в БД')
    }
    return saddle
}

async create(data, img) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) ?? ''
    const {name, old_price, new_price} = data
    const saddle = await SaddleMapping.create({name, image, old_price, new_price})
    const created = await SaddleMapping.findByPk(saddle.id) 
    return created
}



async update(id, data, img) {
    const saddle = await SaddleMapping.findByPk(id)
    if (!saddle) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && saddle.image) {
        FileService.delete(saddle.image)
    }
    const {
        name = saddle.name,
        old_price = saddle.old_price,
        new_price = saddle.new_price,
        image = file ? file : saddle.image
    } = data
    await saddle.update({name, image, old_price, new_price})
    await saddle.reload()
    return saddle
}

async updatePrice(id, data) {
    const saddle = await SaddleMapping.findByPk(id)
    if (!saddle) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = saddle.old_price,
        new_price = saddle.new_price,
    } = data
    await saddle.update({ old_price, new_price})
    await saddle.reload()
    return saddle
}

async delete(id) {
    const saddle = await SaddleMapping.findByPk(id)
    if (!saddle) {
        throw new Error('Проект не найден в БД')
    }
    if (saddle.image) { 
        FileService.delete(saddle.image)
    }
    await saddle.destroy()
    return saddle
}

}

export default new Saddle;