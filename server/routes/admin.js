import express from "express";
import Post from "../models/post.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

router.get('/signin', async (req, res) => {
    try {
        res.render("admin/signin");
    }
    catch (error) {
        console.log(error);
    }
})

router.get('/signup', async (req, res) => {
    try {
        res.render("admin/signup");
    }
    catch (error) {
        console.log(error);
    }
})

router.get('/signout', async (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie('token');
		res.redirect('/admin/signin');
	}
	catch (error) {
		console.log(error);
	}
})

router.get('/dashboard', authMiddleware, async (req, res) => { 
    try {
		const locals = {
			title: 'Dashboard',
			description: 'Simple blog to share your thoughts with the world.',
		};
		const posts = await Post.find({author: req.userId});
        res.render('admin/dashboard', { posts, locals });
    }
    catch (error) {
        console.log(error);
    }
})

router.get('/dashboard/add-post', authMiddleware, async (req, res) => {
	try {
		const locals = {
			title: "Add Post",
			description: "Add a new post to the blog.",
		};
		res.render("admin/add-post", { locals });
	} catch (error) {
		console.log(error);
	}
})

router.get('/dashboard/:id/edit-post', authMiddleware, async (req, res) => {
	try {
		const locals = {
			title: 'Edit Post',
			description: 'Edit an existing post on the blog.',
		}
		const { id } = req.params;
		const post = await Post.findById(id);
		res.render('admin/edit-post', { post, locals });
	} catch (error) {	
		console.log(error);
	}
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

		req.session.user = user;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin/dashboard');
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const user = new User({
                email,
                username,
                password: hashedPassword,
            });
            res.status(201).json({ message: 'New User Created', user });
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'User already exists' });
            }
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/dashboard/add-post', authMiddleware, async (req, res) => {
	try {
		const { title, body } = req.body;
		const post = new Post({
			title,
			body,
            author: req.userId,
		});
		await post.save();
		res.redirect('/admin/dashboard');
	} catch (error) {
		console.log(error);
	}
})

router.put('/dashboard/:id/edit-post', authMiddleware, async (req, res) => {
	try {
		const {title, body} = req.body;
		const { id } = req.params;

		const post = await Post.findByIdAndUpdate(id, { title, body });
		await post.save();

		res.redirect('/admin/dashboard');
	} catch (error) {
		console.log(error);
	}
})

router.delete('/dashboard/:id/delete-post', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
    }
})

export default router;