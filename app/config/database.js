const mysql = require('mysql')

// Connect to Database
const conn = mysql.createConnection({
    host: '10.10.222.245',
    port: '3316',
    user: 'dbpdam',
    password: 'pdamGM2016!'
})

// Log Connection
conn.connect((err) => {
    if (err) throw err
    console.log('MySql with id : ' + conn.threadId)
})

module.exports = conn
