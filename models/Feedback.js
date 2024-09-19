import { Feedback as FeedbackMapping } from "./mapping.js";

class Feedback {
    async getAll() {
        const feedbacks = await FeedbackMapping.findAll()
        return feedbacks
    }

    async getOne(id) {
        const feedback = await FeedbackMapping.findByPk(id)
        if (!feedback) {
            throw new Error('Заказ не найден в БД')
        }
        const { name, phone, note, note_admin} = feedback
        return { name, phone, note, note_admin}
    }

    async createFeedback(data) {
        const {name, phone, note, note_admin} = data
        const feedback = await FeedbackMapping.create({ name, phone, note, note_admin})
        
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