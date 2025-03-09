const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    Images: [{ type: String }], 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model("Post", PostSchema);
