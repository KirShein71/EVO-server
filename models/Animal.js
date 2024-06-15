import { Animal as AnimalMapping } from './mapping.js'
import FileService from '../services/File.js'


class Animal {

async getAll() {
    const animals = await AnimalMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return animals
}

async getOne(id) {
    const animal = await AnimalMapping.findByPk(id)
    if (!animal) { 
        throw new Error('Товар не найден в БД')
    }
    return animal
}

async create(data, img) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) || ''
    const {name, old_price, new_price} = data
    const animal = await AnimalMapping.create({name, image, old_price, new_price})
    const created = await AnimalMapping.findByPk(animal.id) 
    return created
}



async update(id, data, img) {
    const animal = await AnimalMapping.findByPk(id)
    if (!animal) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && animal.image) {
        FileService.delete(animal.image)
    }
    const {
        name = animal.name,
        old_price = animal.old_price,
        new_price = animal.new_price,
        image = file ? file : animal.image
    } = data
    await animal.update({name, image, old_price, new_price})
    await animal.reload()
    return animal
}

async updatePrice(id, data) {
    const animal = await AnimalMapping.findByPk(id)
    if (!animal) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = animal.old_price,
        new_price = animal.new_price,
    } = data
    await animal.update({ old_price, new_price})
    await animal.reload()
    return animal
}

async delete(id) {
    const animal = await AnimalMapping.findByPk(id)
    if (!animal) {
        throw new Error('Проект не найден в БД')
    }
    if (animal.image) { 
        FileService.delete(animal.image)
    }
    await animal.destroy()
    return animal
}

}

export default new Animal;