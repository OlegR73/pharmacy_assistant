const express = require("express");
const { pool } = require("../db.js");

const router = express.Router();

router.get('/',async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM messages");
        res.json(result.rows);
         console.log(result.rows);
       } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Failed to fetch messages" });
       }
})
module.exports = router;