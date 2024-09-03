import { Bag as BagMapping } from './mapping.js'
import { BagImage as BagImageMapping} from './mapping.js'
import { BagFourty as BagFourtyMapping } from './mapping.js'
import { BagFifty as BagFiftyMapping } from './mapping.js'
import { BagMaterial as BagMaterialMapping} from './mapping.js'



class Bag {

async getAll() {
    const bags = await BagMapping.findAll({
        include : [
            {model: BagImageMapping, attributes: ['id', 'image', 'bagmaterialId']}
        ],
        order: [
            ['name', 'ASC'],
        ],
    })
    return bags
}

async getOne(originalName) {
    const bag = await BagMapping.findOne({
        where: {
            name: originalName
        },

        include: [{model: BagImageMapping, attributes: ['id', 'image', 'bagmaterialId']}]
    })
    if (!bag) { 
        throw new Error('Товар не найден в БД')
    }
    return bag
}

async create(data) {
    const {name, new_price} = data
    const bag = await BagMapping.create({name, new_price})
    const created = await BagMapping.findByPk(bag.id) 
    return created
}



async update(id, data) {
    const bag = await BagMapping.findByPk(id)
    if (!bag) {
        throw new Error('Товар не найден в БД')
    }
    const {
        name = bag.name,
        new_price = bag.new_price,
    } = data
    await bag.update({name, new_price})
    await bag.reload()
    return bag
}

async updatePrice(id, data) {
    const bag = await BagMapping.findByPk(id)
    if (!bag) {
        throw new Error('Товар не найден в БД')
    }
    const {
        new_price = bag.new_price,
    } = data
    await bag.update({ new_price})
    await bag.reload()
    return bag
}

async delete(id) {
    const bag = await BagMapping.findByPk(id)
    if (!bag) {
        throw new Error('Товар не найден в БД')
    }
  
    await bag.destroy()
    return bag
}

async getAllBagFourty() {
    const bagfourty = await BagFourtyMapping.findAll({
        order: [
            ['size', 'ASC'],
        ],
    })
    return bagfourty
}

async getAllBagFifty() {
    const bagfifty = await BagFiftyMapping.findAll({
        order: [
            ['size', 'ASC'],
        ],
    })
    return bagfifty
}


async getAllBagMaterial() {
    const materials = await BagMaterialMapping.findAll({
        
        order: [
            ['id', 'ASC'],
        ],
    })
    return materials
}

}

export default new Bag;