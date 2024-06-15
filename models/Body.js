import { Body as BodyMapping} from './mapping.js'; 



class Body {

async getAll() {
    const body = await BodyMapping.findAll({
        order: [
            ['name', 'ASC'],
        ],
    })
    return body
}


async getOne(id) {
    const body = await BodyMapping.findByPk(id)
    if (!body) { 
        throw new Error('Товар не найден в БД')
    }
    return body
}

}

export default new Body;