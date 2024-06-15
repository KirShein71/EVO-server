import express from 'express'

import BasketProductController from '../controllers/basketProductController.js'

const router = new express.Router()


router.get('/getall/:id([0-9]+)', BasketProductController.getAll)
router.delete('/delete/:id([0-9]+)', BasketProductController.delete)

export default router