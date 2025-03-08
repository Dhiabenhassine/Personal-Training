const express = require("express");
const {insertUser} = require("../controller/userController")
const router = express.Router();

// Create a user
router.post("/", async (req, res) => {
    try{
        await insertUser(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
