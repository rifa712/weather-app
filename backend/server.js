const express = require('express')
const app = express()

const path = require('path')
require('dotenv').config()

// PORT
const PORT = process.env.PORT || 5000

// Routes
app.use('/api/weather', require('./routes/weatherRoutes'))

// Serve FE
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Weather API' })
  })
}

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
