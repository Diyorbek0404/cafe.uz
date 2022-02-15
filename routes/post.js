const router = require("express").Router();
const User = require("../models/User")
const Post = require("../models/Post")

// create post 
router.post("/", async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// update post
router.put("/:id", async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id)
        if (req.body.userId === posts.userId) {
            try {
                const post = await Post.findByIdAndUpdate(req.params.id,
                    {
                        $set: req.body
                    }
                )
                res.status(200).json(post)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            return res.status(403).json("yangilanmadi")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// POSTS COMMENT 

router.put('/:id/comment', async (req, res) => {
    const newComment = await new Post(req.body)
    try {
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $push: { comments: newComment } });
        res.status(200).json("The post has been commented");
    } catch (err) {
        res.status(500).json(err);
    }
})

// like post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.like.includes(req.body.userId)) {
            await post.updateOne({ $push: { like: req.body.userId } })
            res.status(200).json("siz like bosdingiz")
        } else {
            await post.updateOne({ $pull: { like: req.body.userId } })
            res.status(200).json("siz likeni qaytarib oldingiz bosdingiz")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete post
router.delete("/:id", async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error)
    }
})

// get posts
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router