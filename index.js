const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

// App Directory
const registrasi = require('./app/routes/registrasi')
const aduan = require('./app/routes/aduan')

// Setting Port
const port = process.env.PORT || 3000
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// All Routes Here
// Route Home
app.get('/', (req, res) => {
    res.json({
        status: 200,
        error: null,
        data: 'API Aplikasi Pelayanan PT Air Minum Giri Menang Terpadu v1.0.0'
    })
})

app.use('/registrasi', registrasi)
app.use('/aduan', aduan)


// Server Listening
app.listen(port, () => console.log(`Server listening on port ${port}`))