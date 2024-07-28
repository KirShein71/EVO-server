import { Brand as BrandMapping} from './mapping.js'; 
import FileService from '../services/File.js'


class Brand {

async getAll() {
    const brands = await BrandMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return brands
}

async getOne(name) {
    const brand = await BrandMapping.findOne({
        where: {
            name: name,
        }
    })
    if (!brand) { 
        throw new Error('Товар не найден в БД')
    }
    return brand
}

async create(data, img) {
    // поскольку image не допускает null, задаем пустую строку
    const image = FileService.save(img) || ''
    const {name} = data
    const brand = await BrandMapping.create({name, image})
    
    const created = await BrandMapping.findByPk(brand.id) 
    return created
}


async update(id, data, img) {
    const brand = await BrandMapping.findByPk(id)
    if (!brand) {
        throw new Error('Товар не найден в БД')
    }
    const file = FileService.save(img)
    if (file && brand.image) {
        FileService.delete(brand.image)
    }
    const {
        name = brand.name,
        image = file ? file : brand.image
    } = data
    await brand.update({name, image})
    await brand.reload()
    return brand
}

async delete(id) {
    const brand = await BrandMapping.findByPk(id)
    if (!brand) {
        throw new Error('Проект не найден в БД')
    }
    if (brand.image) { 
        FileService.delete(brand.image)
    }
    await brand.destroy()
    return brand
}

}

export default new Brand;