import express from 'express'
import OrderController from '../controllers/orderController.js'


const router = new express.Router()

router.get('/getall', OrderController.getAll)
router.post('/create', OrderController.create)
router.post('/createAdmin', OrderController.createAdmin)
router.put('/updateStatus/:id([0-9]+)',  OrderController.updateStatus)
router.put('/createNote/:id([0-9]+)',  OrderController.createNote)
router.put('/updateOrder/:id([0-9]+)',  OrderController.updateOrder)
router.put('/updatePhone/:id([0-9]+)',  OrderController.updatePhone)
router.put('/updateDelivery/:id([0-9]+)',  OrderController.updateDelivery)
router.get('/getOne/:id([0-9]+)', OrderController.getOne)
router.get('/getOneOrderItem/:id([0-9]+)', OrderController.getOneOrderItem)
router.delete('/deleteOrder/:id([0-9]+)', OrderController.deleteOrder)
router.delete('/deleteOrderItem/:id([0-9]+)', OrderController.deleteOrderItem)



export default router