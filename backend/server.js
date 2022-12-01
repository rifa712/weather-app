const express = require('express')
const app = express()

// PORT
const PORT = process.env.PORT || 5000

// Routes
app.use('/api/weather', require('./routes/weatherRoutes'))

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
