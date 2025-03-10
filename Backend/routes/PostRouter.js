const express = require("express")
const router = express.Router()
const {insertPost, selectAllPosts, selectPostById,updatePost,deletePost} = require("../controller/PostController")

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
router.post("/update", async (req, res) => {
    try {
        await updatePost(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post("/delete", async (req, res) => {
    try {
        await deletePost(req, res)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;
