const express = require('express')

const controller = require('../controllers/aduan')

const router = express.Router()

router.get('/jenis', controller.getDataJenis)
router.get('/wilayah', controller.getDataWilayah)
router.get('/riwayat/:nomor_hp', controller.getDataRiwayat)
router.post('/create', controller.storeDataAduan)

module.exports = router