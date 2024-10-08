import express from 'express'
import CdekController from '../controllers/cdekController.js'

const router = new express.Router()

router.get('/getregions', CdekController.getRegions);
router.get('/getcities/:region', CdekController.getCities);
router.get('/getoffices/:city', CdekController.getOffices);
router.post('/getratespackagepvz/:city', CdekController.getRatesPackagePvz);
router.post('/getrateseconompackagepvz/:city', CdekController.getRatesEconomPackagePvz);
router.post('/getratesdelivery/:city', CdekController.getRatesDelivery);
router.post('/getrateseconomdelivery/:city', CdekController.getRatesEconomDelivery);
router.post('/createordercdek', CdekController.createOrderCdek)
router.post('/createordercdekdelivery', CdekController.createOrderCdekDelivery)
router.get('/getordercdek', CdekController.getOrderCdek)



export default router