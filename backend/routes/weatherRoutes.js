const express = require('express')
const { getWeather } = require('../controller/weatherController')
const router = express.Router()

router.route('/:q').get(getWeather)

module.exports = router
