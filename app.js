import express from "express";
import dotenv from "dotenv";
import connectDB from "./server/config/db.js";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import jwt from "jsonwebtoken";
import mainRoutes from "./server/routes/posts.js";
import adminRoutes from "./server/routes/admin.js";
import User from "./server/models/user.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

// DB
connectDB();

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true, 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24) 
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set('layout', './layouts/boilerplate');
app.set("view engine", "ejs");

app.use(async (req, res, next) => {
    res.locals.current_user = null;
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            if (user) {
                res.locals.current_user = user;
            } 
        } catch (error) {
            console.log(error);
        }
    }
    next();
});

// ROUTES
app.use("/posts", mainRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})