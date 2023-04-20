const { users } = require("../database-old")
const { validationResult } = require("express-validator")
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");


const usersPathDB = path.join(__dirname, "../database-old/users.json");
/*const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));*/
const writeJSON = function (user) {
    fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};

module.exports = {
    profile: (req, res) => {
        let userInSessionId = req.session.user.id;

        User.findByPk(userInSessionId)
        .then((user) => {
            res.render("users/profile", {
                user,
                session: req.session,
                doctitle: "Mi Perfil",
                link: "/css/profile.css",
            })
        })
        .catch(error => console.log(error))
    },
    editProfile: (req, res) => {
        db.User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            avatar: req.file ? req.file.filename : avatar,
            phone: req.body.phone,
            address: req.body.address,
            postal_code: req.body.postal_code,
            province: req.body.province,
            city: req.body.city,
        },
        {
            where: { id: req.params.id}
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
            
            let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            /*avatar: req.file ? req.file.filename : "default-image.png",*/
            phone: req.body.phone,
            address: req.body.address,
            postal_code: req.body.postal_code,
            province: req.body.province,
            city: req.body.city,
            role: "USER",
         }; 
         
         User.create(newUser)
            .then(() => {
               return res.redirect("/users/login");
            })
            .catch(error => console.log(error))
        } else {
            res.render("users/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session,
                doctitle: "Registrate",
                link: "/css/login-signin.css",

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
            
            User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((user)  => {
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
        })
        .catch(error => console.log(error))
     } else {
            return res.render("users/login", {
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

