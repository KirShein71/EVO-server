import {BagPicture as BagPictureMapping} from './mapping.js'
import FileService from '../services/File.js'


class BagPicture {

async getAll() {
    const bagpicture = await BagPictureMapping.findAll({
        order: [
            ['id', 'ASC'],
        ],
    })
    return bagpicture
}


async create(data, img) {
    const image = FileService.save(img) || ''
    const {bagId, bagmaterialId, bagsizeId} = data
    const bagpicture = await BagPictureMapping.create({ bagId, bagmaterialId, image, bagsizeId})
    
    const created = await BagPictureMapping.findByPk(bagpicture.id) 
    return created
}


async delete(id) {
    const bagpicture = await BagPictureMapping.findByPk(id)
    if (!bagpicture) {
        throw new Error('Изображение не найдено в БД')
    }
    await bagpicture.destroy()

    const image = bagpicture.image
    FileService.delete(image)
    
    return bagpicture
}

}

export default new BagPicture;