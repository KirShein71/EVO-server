import { Bag as BagMapping } from './mapping.js'
import { BagImage as BagImageMapping} from './mapping.js'
import {BagPicture as BagPictureMapping} from './mapping.js'
import { BagSize as BagSizeMapping} from './mapping.js'
import { BagMaterial as BagMaterialMapping} from './mapping.js'
import FileService from '../services/File.js'



class Bag {

async getAll() {
    const bags = await BagMapping.findAll({
        include: [
            {model: BagImageMapping, attributes: ['id', 'image', 'bagmaterialId', 'bagsizeId']}, 
            {model: BagPictureMapping, attributes: ['id', 'image', 'bagmaterialId', 'bagsizeId']}
        ],
        order: [
            ['id', 'ASC'],
        ],
    })
    return bags
}

async getOne(originalName) {
    const bag = await BagMapping.findOne({
        where: {
            name: originalName
        },

        include: [
            {model: BagImageMapping, attributes: ['id', 'image', 'bagmaterialId', 'bagsizeId']}, 
            {model: BagPictureMapping, attributes: ['id', 'image', 'bagmaterialId', 'bagsizeId']}
        ]
    })
    if (!bag) { 
        throw new Error('Товар не найден в БД')
    }
    return bag
}

async create(data, img) {
    const image = FileService.save(img) || ''
    const {name, new_price} = data
    const bag = await BagMapping.create({name, new_price, image})
    const created = await BagMapping.findByPk(bag.id) 
    return created
}



async update(id, img, data) {
    const bag = await BagMapping.findByPk(id)
    if (!bag) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && product.image ) {
        FileService.delete(product.image)
    }
    const {
        name = bag.name,
        new_price = bag.new_price,
        image = file ? file : product.image,
    } = data
    await bag.update({name, new_price, image})
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

    const image = product.image
    FileService.delete(image)

    
    return bag
}

async getAllBagSize() {
    const bagsize = await BagSizeMapping.findAll({
        order: [
            ['size', 'ASC'],
        ],
    })
    return bagsize
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