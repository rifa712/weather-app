const asyncHandler = require('express-async-handler')
const axios = require('axios')
require('dotenv').config()

const URI = 'http://api.openweathermap.org/data/2.5/weather?&units=metric'

// @desc    GET weather info
// @route   GET /api/weather
// @access  Public
const getWeather = asyncHandler(async (req, res) => {
  const params = {
    q: req.params.q,
    appid: process.env.APP_ID,
  }

  const data = await axios.get(URI, { params })

  res.status(200).json(data.data)
})

module.exports = {
  getWeather,
}
