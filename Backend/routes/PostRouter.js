const express = require("express")
const router = express.Router()
const {insertPost, selectAllPosts, selectPostById} = require("../controller/PostController")

router.post("/insert", async (req, res) => {
    try {
        await insertPost(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/selectall", async (req, res) => {
    try {
        await selectAllPosts(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post("/selectById", async (req, res) => {
    try {
        await selectPostById(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;
