const express = require('express')

const controller = require('../controllers/registrasi')

const router = express.Router()

router.post('/create', controller.storeDataRegistrasi)
router.patch('/edit', controller.validasi)
router.patch('/profil', controller.profil)

module.exports = router