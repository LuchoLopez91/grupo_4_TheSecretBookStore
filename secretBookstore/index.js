const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

app.use(express.static(path.join(__dirname,"./public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/product.html"))
});

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/signin.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"))
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/cart.html"))
});


app.listen(PORT, () => {
    console.log(`The server is ON at the port http://localhost:${PORT}`)
});

