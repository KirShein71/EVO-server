import { Material as MaterialMapping} from './mapping.js'; 
import { CellShape as CellShapeMapping } from './mapping.js'
import FileService from '../services/File.js'
import {Op}  from 'sequelize'



class Material {

async getAll() {
    const materials = await MaterialMapping.findAll({
        include: [
            { model: CellShapeMapping,
            attributes: ['name']}
        ],
        order: [
            ['id', 'ASC'],
        ],
    })
    return materials
}

async getAllMaterialForAnimal() {
    const materials = await MaterialMapping.findAll({
        where: {
            id: { [Op.gt]: 27 }
        },
        attributes: ['id', 'name', 'color']
    })
    return materials
}

async getOne(id) {
    const material = await MaterialMapping.findByPk(id)
    if (!material) { 
        throw new Error('Товар не найден в БД')
    }
    return material
}

async create(data, img) {
    const image = FileService.save(img) || ''
    const {cellshapeId, color, name} = data
    const material = await MaterialMapping.create({image, color, name, cellshapeId})
    const created = await MaterialMapping.findByPk(material.id) 
    return created
}


async delete(id) {
    const material = await MaterialMapping.findByPk(id)
    if (!material) {
        throw new Error('Проект не найден в БД')
    }
    
    if (material.image) { 
        FileService.delete(material.image)
    }
    await material.destroy()
    return material
}

}

export default new Material;