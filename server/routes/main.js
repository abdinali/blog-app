import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    const locals = {
        title: "Blog",
        description: "Simple blog to share your thoughts with the world.",
    }
    res.render("index", { locals });
});

export default router;