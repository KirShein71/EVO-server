import express from 'express'
import BasketController from '../controllers/basketController.js'
import BasketProductController from '../controllers/basketProductController.js'

const router = new express.Router()

router.get('/getone', BasketController.getOne)
router.post('/append', BasketController.append)
router.post('/appendHome', BasketController.appendHome)
router.post('/appendBag', BasketController.appendBag)
router.post('/appendFavorite', BasketController.appendFavorite)
router.get('/getall', BasketProductController.getAll)

export default router