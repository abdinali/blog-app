import express from 'express';
import Post from '../models/post.js';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const locals = {
            title: "Blog",
            description: "Simple blog to share your thoughts with the world.",
        }

        let perPageLimit = 10;
        let page = req.query.page || 1;

        const posts = await Post.aggregate([ 
            { $sort: { createdAt: -1 } },
            { $skip: (perPageLimit * page) - perPageLimit },
            { $limit: perPageLimit }
        ]);

        const noOfPosts = await Post.countDocuments();
        const totalPages = Math.ceil(noOfPosts / perPageLimit)

        const prevPage = parseInt(page) + 1;
        const nextPage = parseInt(page) - 1;

        const hasPrevPage = prevPage <= totalPages;
        const hasNextPage = nextPage >= 1;

        res.render("index", {
            locals, 
            posts, 
            currentPage: page,
            nextPage: hasNextPage ? nextPage : null,    
            prevPage: hasPrevPage ? prevPage : null,     
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author');
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

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search Results",
            description: "Search results for your query.",
        }

        // Remove special characters from search term
        let searchTerm = req.body.searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        
        // Find posts that match the search term
        const posts = await Post.find({
            $or: [
                { title: new RegExp(searchTerm, "i") },
                { body: new RegExp(searchTerm, "i") },
            ]
        });

        res.render("search", { locals, posts, searchTerm });
    } catch (error) {
        console.log(error);
    }
})

export default router;