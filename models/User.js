import { User as UserMapping } from "./mapping.js";

class User {
    async createAccount(data) {
        const {phone, role, password} = data
        const check = await UserMapping.findOne({where: {phone}})
        if (check) {
            throw new Error('Пользователь уже существует')
        }
        const user = await UserMapping.create({phone, role, password})
        
        const created = await UserMapping.findByPk(user.id) 
        return created
    }

    async getByPhone(phone) {
        const user = await UserMapping.findOne({where: {phone}})
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }
}

export default new User;