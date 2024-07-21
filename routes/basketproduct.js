import express from 'express'

import BasketProductController from '../controllers/basketProductController.js'

const router = new express.Router()


router.get('/getall/:id([0-9]+)', BasketProductController.getAll)
router.delete('/delete/:id([0-9]+)', BasketProductController.delete)
router.delete('/deleteTrunk/:trunk_id', BasketProductController.deleteTrunk)
router.delete('/deleteOrganizer/:organizer_id', BasketProductController.deleteOrganizer)
router.delete('/deleteOrganizerFifty/:organizerfifty_id', BasketProductController.deleteOrganizerFifty)
router.delete('/deleteSteel/:steel_id', BasketProductController.deleteSteel)
router.delete('/deleteSaddle/:saddle_id', BasketProductController.deleteSaddle)


export default router