const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config()


const client = new Client({connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false
}})

client.connect()
console.log("Connecté")

module.exports = client;