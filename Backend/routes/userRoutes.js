const express = require("express");
const {Register,LogIn} = require("../controller/userController")
const router = express.Router();

// Create a user
router.post("/Register", async (req, res) => {
    try{
        await Register(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        await LogIn(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
