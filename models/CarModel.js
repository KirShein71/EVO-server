import { CarModel as CarModelMapping} from './mapping.js'; 



class CarModel {

async getAll() {
    const carmodel = await CarModelMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return carmodel
}

async getAllByBrandId(brandId) {
    const carmodels = await CarModelMapping.findAll({
        where: {
            brandId: brandId
        },
        order: [
            ['name', 'ASC'],
        ],
    })
    return carmodels
}

async getOne(id) {
    const carmodel = await CarModelMapping.findByPk(id)
    if (!carmodel) { 
        throw new Error('Товар не найден в БД')
    }
    return carmodel
}

async create(data) {
    const {name, brandId} = data
    const carmodel = await CarModelMapping.create({name, brandId})
    
    const created = await CarModelMapping.findByPk(carmodel.id) 
    return created
}


async update(id, data) {
    const carmodel = await CarModelMapping.findByPk(id)
    if (!carmodel) {
        throw new Error('Товар не найден в БД')
    }
    const {
        name = carmodel.name,
    } = data
    await carmodel.update({name})
    await carmodel.reload()
    return carmodel
}

async delete(id) {
    const carmodel = await CarModelMapping.findByPk(id)
    if (!carmodel) {
        throw new Error('Проект не найден в БД')
    }
    await carmodel.destroy()
    return carmodel
}

}

export default new CarModel;