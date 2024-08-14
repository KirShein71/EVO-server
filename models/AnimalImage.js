import { AnimalImage as AnimalImageMapping } from './mapping.js'
import FileService from '../services/File.js'


class AnimalImage {

async getAll() {
    const animalimage = await AnimalImageMapping.findAll()
    return animalimage
}


async create(data, img) {
    const image = FileService.save(img) || ''
    const {animalId, materialId} = data
    const animalimage = await AnimalImageMapping.create({ animalId, materialId, image})
    
    const created = await AnimalImageMapping.findByPk(animalimage.id) 
    return created
}


async delete(id) {
    const animalimage = await AnimalImageMapping.findByPk(id)
    if (!animalimage) {
        throw new Error('Изображение не найдено в БД')
    }
    await animalimage.destroy()

    const image = animalimage.image
    FileService.delete(image)
    
    return animalimage
}

}

export default new AnimalImage;