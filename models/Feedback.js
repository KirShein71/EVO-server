import { Feedback as FeedbackMapping } from "./mapping.js";
import { CarModel as CarModelMapping } from "./mapping.js";
import { Brand as BrandMapping } from "./mapping.js";

class Feedback {
    async getAll() {
        const feedbacks = await FeedbackMapping.findAll({
            include: [
                {model: CarModelMapping, attributes: ['name']},
                {model: BrandMapping, attributes:['name']}
            ]
        })
        return feedbacks
    }

    async getOne(id) {
        const feedback = await FeedbackMapping.findByPk(id)
        if (!feedback) {
            throw new Error('Заказ не найден в БД')
        }
        const { name, phone, note_admin, carmodelId, brandId} = feedback
        return { name, phone, note_admin, carmodelId, brandId}
    }

    async createFeedback(data) {
        const {name, phone, note_admin, carModelId, brandId} = data
        const feedback = await FeedbackMapping.create({ name, phone, note_admin, carModelId, brandId})
        
        const created = await FeedbackMapping.findByPk(feedback.id) 
        return created
    }

    async createNoteAdmin(id, data) {
        const feedback = await FeedbackMapping.findByPk(id)
        if (!feedback) {
            throw new Error('Заказ не найден в БД')
        }
        const {
            note_admin = feedback.note_admin,
        } = data
        await feedback.update({note_admin})
        await feedback.reload()
        return feedback
    }

}

export default new Feedback;