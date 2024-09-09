import { BagImage as BagImageMapping } from './mapping.js'
import FileService from '../services/File.js'


class BagImage {

async getAll() {
    const bagimage = await BagImageMapping.findAll()
    return bagimage
}


async create(data, img) {
    const image = FileService.save(img) || ''
    const {bagId, bagmaterialId, bagsizeId} = data
    const bagimage = await BagImageMapping.create({ bagId, bagmaterialId, image, bagsizeId})
    
    const created = await BagImageMapping.findByPk(bagimage.id) 
    return created
}


async delete(id) {
    const bagimage = await BagImageMapping.findByPk(id)
    if (!bagimage) {
        throw new Error('Изображение не найдено в БД')
    }
    await bagimage.destroy()

    const image = bagimage.image
    FileService.delete(image)
    
    return bagimage
}

}

export default new BagImage;