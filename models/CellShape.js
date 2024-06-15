import { CellShape as CellShapeMapping} from './mapping.js'; 



class CellShape {

async getAll() {
    const cellshape = await CellShapeMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return cellshape
}


async getOne(id) {
    const cellshape = await CellShapeMapping.findByPk(id)
    if (!cellshape) { 
        throw new Error('Товар не найден в БД')
    }
    return cellshape
}

}

export default new CellShape;