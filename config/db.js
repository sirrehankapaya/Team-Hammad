const mongoose = require("mongoose")
require("dotenv").config()

let isConnected = false

async function ConnectDB() {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return
    }

    let uri = process.env.DBURI ? process.env.DBURI.trim().replace(/^["']+|["']+$/g, '').trim() : null
    if (!uri) {
        console.error("❌ DB Error: process.env.DBURI is missing! Please configure DBURI in your environment variables.")
        return
    }

    try {
        const db = await mongoose.connect(uri)
        isConnected = db.connections[0].readyState === 1
        console.log('✅ MongoDB Connected successfully!')
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message)
    }
}

module.exports = ConnectDB