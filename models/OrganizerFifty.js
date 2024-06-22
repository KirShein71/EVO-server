import { OrganizerFifty as OrganizerFiftyMapping} from './mapping.js'

class OrganizerFifty {

async getAll() {
    const organizers = await OrganizerFiftyMapping.findAll({
        order: [
            ['size', 'ASC'],
        ],
    })
    return organizers
}

async getOne(id) {
    const organizer = await OrganizerFiftyMapping.findByPk(id)
    if (!organizer) { 
        throw new Error('Товар не найден в БД')
    }
    return organizer
}


}

export default new OrganizerFifty;