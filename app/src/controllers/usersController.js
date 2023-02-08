const fs = require("fs");
const path = require("path");
const { title } = require("process");

const usersPathDB = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const writeJSON = function (user) {
  fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};

module.exports = {
    user: (req, res) => {
        let user = users.find(user => users.id == req.res.params);
        res.send(user);
    },
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
    cart: (req, res) => {
        res.render("products/cart", {
          doctitle: "Mi carrito",
          link: "/css/cart.css",
        });
      },
}

