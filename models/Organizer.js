import { Organizer as OrganizerMapping} from './mapping.js'
import FileService from '../services/File.js'


class Organizer {

async getAll() {
    const organizers = await OrganizerMapping.findAll({
        order: [
            ['size', 'ASC'],
        ],
    })
    return organizers
}

async getOne(id) {
    const organizer = await OrganizerMapping.findByPk(id)
    if (!organizer) { 
        throw new Error('Товар не найден в БД')
    }
    return organizer
}

async create(data, img) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) || ''
    const {size, old_price, new_price} = data
    const organizer = await OrganizerMapping.create({size, image, old_price, new_price})
    const created = await OrganizerMapping.findByPk(organizer.id) 
    return created
}



async update(id, data, img) {
    const organizer = await OrganizerMapping.findByPk(id)
    if (!organizer) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && organizer.image) {
        FileService.delete(organizer.image)
    }
    const {
        size = organizer.size,
        old_price = organizer.old_price,
        new_price = organizer.new_price,
        image = file ? file : organizer.image
    } = data
    await organizer.update({size, image, old_price, new_price})
    await organizer.reload()
    return organizer
}

async updatePrice(id, data) {
    const organizer = await OrganizerMapping.findByPk(id)
    if (!organizer) {
        throw new Error('Товар не найден в БД')
    }
    const {
        old_price = organizer.old_price,
        new_price = organizer.new_price,
    } = data
    await organizer.update({ old_price, new_price})
    await organizer.reload()
    return organizer
}

async delete(id) {
    const organizer = await OrganizerMapping.findByPk(id)
    if (!organizer) {
        throw new Error('Проект не найден в БД')
    }
    if (organizer.image) { 
        FileService.delete(organizer.image)
    }
    await organizer.destroy()
    return organizer
}

}

export default new Organizer;