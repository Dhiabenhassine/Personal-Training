const mongoose = require("mongoose");
const Post = require("../models/Post");

const insertPost = async (req, res) => {
    try {
      console.log(req.body);  // Add this line to debug
  
      const { user, title, content, Images } = req.body;
  
      // Check for missing fields
      if (!user || !title || !content || !Images) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Ensure that images is an array (if not an array, return error)
      if (!Array.isArray(Images)) {
        return res.status(400).json({ success: false, message: "Images must be an array" });
      }
  
      // Create a new Post
      const newPost = new Post({
        title,
        content,
        Images,  // Use "Images" here to match the schema
        user,
        likes: [],
        comments: []
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      // Return success response
      res.status(201).json({
        success: true,
        message: "Post inserted successfully",
        post: savedPost
      });
    } catch (error) {
      console.error("Error inserting post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while inserting post"
      });
    }
  };
  
const selectAllPosts = async(req,res)=>{
    try{
        const posts = await Post.find().populate("user").populate("likes").populate("comments");
        res.status(200).json({
            posts
        });
    }catch(err){
        console.error("Error selecting posts:", err);
        res.status(500).json({
            message: "Internal server error while selecting posts"
        });
    }
};
// controllers/postController.js
const selectPostById = async (req, res) => {
    try {
      const { _id} = req.body;
  
      if (!_id) {
        return res.status(400).json({ success: false, message: "Post ID is required" });
      }
  
      const post = await Post.findById(_id)
        .populate("user")
        .populate("likes")
        .populate("comments");
  
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      res.status(200).json({
        success: true,
        post,
      });
    } catch (err) {
      console.error("Error selecting post by id:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error while selecting post by id",
      });
    }
  };
    
const updatePost = async(req,res)=>{
  try{
const { _id, title, content, Images } = req.body;
if (!_id || !title || !content || !Images) {
  return res.status(400).json({ success: false, message: "All fields are required" });
}
const updatedPost = await Post.findByIdAndUpdate
(_id, { title, content, Images }, { new: true });
res.status(200).json({
  success: true,
  message: "Post updated successfully",
  post: updatedPost
});
  }catch(err){
    console.error("Error updating post:", err);
    res.status(500).json({
        message: "Internal server error while updating post"
    });
  }
}   
const deletePost = async(req,res)=>{
  try{
const { _id } = req.body;
if (!_id) {
  return res.status(400).json({ success: false, message: "Post ID is required" });
}
const deletedPost = await Post.findByIdAndDelete(_id);
res.status(200).json({
  success: true,
  message: "Post deleted successfully",
  post: deletedPost
});
  }catch(err){
    console.error("Error deleting post:", err);
    res.status(500).json({
        message: "Internal server error while deleting post"
    });
  }
}
module.exports = { insertPost, selectAllPosts ,selectPostById,updatePost,deletePost};
