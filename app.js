import express from "express";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import mainRoutes from "./server/routes/main.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

// DB
import connectDB from "./server/config/db.js";
connectDB();

app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set('layout', './layouts/boilerplate');
app.set("view engine", "ejs");

// ROUTES
app.use("/", mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})