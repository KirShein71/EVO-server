import { Animal as AnimalMapping } from './mapping.js'
import { AnimalImage as AnimalImageMapping} from './mapping.js'


class Animal {

async getAll() {
    const animals = await AnimalMapping.findAll({
        include : [
            {model: AnimalImageMapping, attributes: ['id', 'image', 'materialId']}
        ],
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

async create(data) {
    const {name, old_price, new_price} = data
    const animal = await AnimalMapping.create({name, old_price, new_price})
    const created = await AnimalMapping.findByPk(animal.id) 
    return created
}



async update(id, data) {
    const animal = await AnimalMapping.findByPk(id)
    if (!animal) {
        throw new Error('Товар не найден в БД')
    }
    const {
        name = animal.name,
        old_price = animal.old_price,
        new_price = animal.new_price,
    } = data
    await animal.update({name, old_price, new_price})
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
  
    await animal.destroy()
    return animal
}

}

export default new Animal;