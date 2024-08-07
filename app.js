import express from "express";
import dotenv from "dotenv";
import connectDB from "./server/config/db.js";
import expressEjsLayouts from "express-ejs-layouts";
import mainRoutes from "./server/routes/posts.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

// DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set('layout', './layouts/boilerplate');
app.set("view engine", "ejs");

// ROUTES
app.use("/posts", mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})