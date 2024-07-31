import express from 'express'
import FavoriteController from '../controllers/favoriteController.js'

const router = new express.Router()


router.get('/getall/:id([0-9]+)', FavoriteController.getAll)
router.delete('/delete/:productId([0-9]+)', FavoriteController.delete)



export default router