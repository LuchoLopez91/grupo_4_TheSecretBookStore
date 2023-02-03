const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

/* Templeta Engine */
app.use(express.static(path.join(__dirname,"../public")));
app.set('view-engine', 'ejs');
app.set('views', 'src/views');
/* /Template Engine */


/* Router */
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "/views/home.ejs"))
});

app.get("/home", (req, res) => {
    res.render(path.join(__dirname, "/views/home.ejs"))
});

app.get("/product", (req, res) => {
    res.render(path.join(__dirname, "/views/products/product.ejs"))
});

app.get("/register", (req, res) => {
    res.render(path.join(__dirname, "/views/users/register.ejs"))
});

app.get("/login", (req, res) => {
    res.render(path.join(__dirname, "/views/users/login.ejs"))
});

app.get("/cart", (req, res) => {
    res.render(path.join(__dirname, "/views/users/cart.ejs"))
});
/* /Routes */





app.listen(PORT, () => {
    console.log(`The server is ON at the port http://localhost:${PORT}`)
});

