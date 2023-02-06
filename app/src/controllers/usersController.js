module.exports = {
    register: (req, res) => {
        res.render('./users/register', {
            doctitle: "Registrate",
            link: "/css/login-signin.css"

        });
    },
    login: (req, res) => {
        res.render('./users/login', {
            doctitle: "Iniciar sesión",
            link: "/css/login-signin.css"

        });
    },
}


/* app.get("/register", (req, res) => {
    res.render(path.join(__dirname, "/views/users/register.ejs"))
});

app.get("/login", (req, res) => {
    res.render(path.join(__dirname, "/views/users/login.ejs"))
});

app.get("/cart", (req, res) => {
    res.render(path.join(__dirname, "/views/users/cart.ejs"))
}); */