import { HomeImage as HomeImageMapping } from './mapping.js'
import FileService from '../services/File.js'


class HomeImage {

async getAll() {
    const homeimage = await HomeImageMapping.findAll()
    return homeimage
}


async create(data, img) {
    const image = FileService.save(img) || ''
    const {homeId, materialId} = data
    const homeimage = await HomeImageMapping.create({ homeId, materialId, image})
    
    const created = await HomeImageMapping.findByPk(homeimage.id) 
    return created
}


async delete(id) {
    const homeimage = await HomeImageMapping.findByPk(id)
    if (!homeimage) {
        throw new Error('Изображение не найдено в БД')
    }
    await homeimage.destroy()

    const image = homeimage.image
    FileService.delete(image)
    
    return homeimage
}

}

export default new HomeImage;