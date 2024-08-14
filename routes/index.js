import express from 'express'
import brand from './brand.js'
import product from './product.js'
import carmodel from './carmodel.js'
import cellshape from './cellshape.js'
import material from './material.js'
import edging from './edging.js'
import basket from './basket.js'
import basketproduct from './basketproduct.js'
import order from './order.js'
import trunk from './trunk.js'
import admin from './admin.js'
import animal from './animal.js'
import home from './home.js'
import saddle from './saddle.js'
import organizer from './organizer.js'
import organizerfifty from './organizerfifty.js'
import steel from './steel.js'
import thirdrow from './thirdrow.js'
import cdek from './cdek.js'
import favorite from './favorite.js'
import homeimage from './homeimage.js'


const router = new express.Router()

router.use('/brand', brand)
router.use('/product', product)
router.use('/carmodel', carmodel)
router.use('/cellshape', cellshape)
router.use('/material', material)
router.use('/edging', edging)
router.use('/trunk', trunk)
router.use('/basket', basket)
router.use('/basketproduct', basketproduct)
router.use('/order', order)
router.use('/admin', admin)
router.use('/animal', animal)
router.use('/home', home)
router.use('/saddle', saddle)
router.use('/organizer', organizer)
router.use('/organizerfifty', organizerfifty)
router.use('/steel', steel)
router.use('/thirdrow', thirdrow)
router.use('/cdek', cdek)
router.use('/favorite', favorite)
router.use('/homeimage', homeimage)

export default router