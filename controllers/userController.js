import UserModel from '../models/User.js'
import AppError from '../errors/AppError.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const makeJwt = (id, phone, role) => {
    return jwt.sign(
        {id, phone, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async check(req, res, next) {
        const token = makeJwt(req.auth.id, req.auth.phone, req.auth.role)
        return res.json({token})
    }

  

    async createAccount(req, res, next) {
        const {phone, role  = 'USER', password} = req.body
        try {
            if (!phone || !password) {
                throw new Error('Пустой номер телефона')
            }
            if ( ! ['USER'].includes(role)) {
                throw new Error('Недопустимое значение роли')
            }
            const hash = await bcrypt.hash(password, 10)
            const user = await UserModel.createAccount({phone, password: hash, role})
            const token = makeJwt(user.id, user.phone, user.role)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {phone, password} = req.body
            const user = await UserModel.getByPhone(phone)
            let compare = bcrypt.compareSync(password, user.password)
            if (!compare) {
                throw new Error('Указан неверный пароль')
            }
            const token = makeJwt(user.id, user.phone, user.role)
            return res.json({token})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    
}

export default new UserController;