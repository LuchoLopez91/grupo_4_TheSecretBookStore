const { users } = require("../database")
const {validationResult} = require("express-validator")



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
        res.render('./users/login',{
            doctitle: "LOGIN",
          link: "/css/login-signin.css",
        });
    },
    processLogin: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            res.send("Usuario logueado")
        } else {
            return res.render("./users/login", {
                doctitle: "LOGIN",
                link:"/css/login-signin.css",
                errors: errors.mapped()
            })
        }
    },
    cart: (req, res) => {
        res.render("products/cart", {
          doctitle: "Mi carrito",
          link: "/css/cart.css",
        });
      },
}

