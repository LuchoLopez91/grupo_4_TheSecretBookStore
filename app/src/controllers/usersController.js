const fs = require("fs");
const path = require("path");
const { title } = require("process");

const usersPathDB = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const writeJSON = function (user) {
  fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};

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
    processRegister: (req, res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
     
            let newUser = {
             id: lastId + 1,
             name: req.body.name,
             last_name: req.body.last_name,
             email: req.body.email,
             pass: req.body.pass1/*bcrypt.hashSync(req.body.pass1, 12)*/,
             avatar: req.file ? req.file.filename : "default-image.png",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
            };
     
            users.push(newUser);
     
            writeJSON(users);
     
            res.redirect("/");
        } else {
            res.render("users/register", {
                doctitle: "Registrate",
                link: "/css/login-signin.css",
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
      
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

