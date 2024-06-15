import { Edging as EdgingMapping} from './mapping.js'; 
import FileService from '../services/File.js'



class Edging {

async getAll() {
    const edgings = await EdgingMapping.findAll({
        order: [
            ['id', 'ASC'],
        ],
    })
    return edgings
}

async getOne(id) {
    const edging = await EdgingMapping.findByPk(id)
    if (!edging) { 
        throw new Error('Товар не найден в БД')
    }
    return edging
}

async create(data, img) {
    const image = FileService.save(img) ?? ''
    const { color, name}  = data
    const edging = await EdgingMapping.create({image, color, name})
    const created = await EdgingMapping.findByPk(edging.id) 
    return created
}


async delete(id) {
    const edging = await EdgingMapping.findByPk(id)
    if (!edging) {
        throw new Error('Проект не найден в БД')
    }
    if (edging.image) { 
        FileService.delete(edging.image)
    }
    await edging.destroy()
    return edging
}

}

export default new Edging;