import express from 'express'
import ProductController from '../controllers/productController.js'

const router = new express.Router()

router.get('/getall/:id([0-9]+)', ProductController.getAllByBrandId)
router.get('/getall', ProductController.getAll)
router.get('/getSaleProduct', ProductController.getSaleProduct)
router.delete('/deleteSaleProduct/:sale', ProductController.deleteSaleProduct)
router.post('/create',  ProductController.create)
router.put('/createSale/:id([0-9]+)',  ProductController.createSale)
router.put('/update/:id([0-9]+)',  ProductController.update)
router.put('/updatePrice/:id([0-9]+)',  ProductController.updatePrice)
router.put('/updateName/:id([0-9]+)',  ProductController.updateName)
router.get('/getone/:originalName',  ProductController.getOne)
router.delete('/delete/:id([0-9]+)',  ProductController.delete)

export default router