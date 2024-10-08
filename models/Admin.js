import { Admin as AdminMapping } from "./mapping.js";
import { User as UserMapping} from './mapping.js'

class Admin {

    async getAll() {
        const admins = await AdminMapping.findAll()
        return admins
    }


    async getByPhone(phone) {
        let admin = await AdminMapping.findOne({where: {phone}})
        if (!admin) {
            admin = await UserMapping.findOne({ where: { phone } });
        }
        if (!admin) {
            throw new Error('Пользователь не найден в БД')
        }
        return admin
    }

    async getOne(id) {
            const admin = await AdminMapping.findByPk(id);
            if (!admin) {
              throw new Error('Пользователь не найден в БД');
            }
            return admin;
          }

}

export default new Admin()