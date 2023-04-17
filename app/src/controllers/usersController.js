const { users } = require("../database-old")
const { validationResult } = require("express-validator")
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const bcrypt = require("bcryptjs");

const usersPathDB = path.join(__dirname, "../database-old/users.json");
/*const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));*/
const writeJSON = function (user) {
    fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};

module.exports = {
    profile: (req, res) => {
        //req.session.user.id;
        //let user = users.find(user => users.id == req.res.params);

        res.render('users/profile', {
            doctitle: req.session.user.name,
            session: req.session,
            link: "/css/profile.css",
        });
    },
    editProfile: (req, res) => {
        db.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            avatar: req.file ? req.file.filename : "default-image.png",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
        })

    },
    register: (req, res) => {
        res.render('./users/register', {
            session: req.session,
            doctitle: "Registrate",
            link: "/css/login-signin.css"

        });
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
                if (user.id > lastId) {
                    lastId = user.id;
                }
            });

            let newUser = {
                id: lastId + 1,
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                pass: bcrypt.hashSync(req.body.pass1, 12),
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
                session: req.session,
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
            session: req.session,
            doctitle: "LOGIN",
            link: "/css/login-signin.css",
        });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol
            }

            let tiempoDeVidaCookie = new Date(Date.now() + 1800000);

            if (req.body.remember) {
                res.cookie(
                    "userBookstore",
                    req.session.user,
                    {
                        expires: tiempoDeVidaCookie,
                        httpOnly: true
                    })
            }

            res.locals.user = req.session.user;

            res.redirect("/");
        } else {
            return res.render("users/login", {
                session: req.session,
                errors: errors.mapped(),
                session: req.session,
                doctitle: "LOGIN",
                link: "/css/login-signin.css",
            })
        }
    },
    cart: (req, res) => {
        res.render("products/cart", {
            session: req.session,
            doctitle: "Mi carrito",
            link: "/css/cart.css",
        });
    },
}

