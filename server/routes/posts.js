import express from 'express';
import Post from '../models/post.js';
const router = express.Router();

router.get("/", async (req, res) => {
    const locals = {
        title: "Blog",
        description: "Simple blog to share your thoughts with the world.",
    }
    try {
        const posts = await Post.find({});
        res.render("index", { locals, posts });
    } catch (error) {
        console.log(error);
    }
});;

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        const locals = {
            title: post.title,
            description: post.body,
        }
        res.render('show', { locals, post });
    }
    catch (error) {
        console.log(error);
    }
});

export default router;