const { users } = require("../database-old")
const { validationResult } = require("express-validator")
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");
const axios = require("axios");


/*const usersPathDB = path.join(__dirname, "../database-old/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const writeJSON = function (user) {
    fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};*/

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
  editProfile: async (req, res) => {
    let userInSessionId = req.session.user.id;

    try {
      const user = await User.findByPk(userInSessionId);
      const { data } = await axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id");

      return res.render("users/userProfileEdit", {
        user,
        provinces: data.provincias,
        session: req.session,
        doctitle: "Editar mi perfil",
        link: "/css/profile.css",
      })
    } catch (error) {
      console.log(error)
    }

  },
  updateProfile: (req, res) => {
    let errors = validationResult(req);
    let userInSessionId = req.session.user.id;

    if (errors.isEmpty()) {
      User.findByPk(userInSessionId)
        .then(user => {
          if (req.file) {
            if (
              fs.existsSync(path.join(__dirname, "../../public/images/avatars", user.avatar)) &&
              user.avatar != "default-image.png"
            ) {
              fs.unlinkSync(path.join(__dirname, "../../public/images/avatars", user.avatar))
            };
          };
          User.update(
            {
              ...req.body,
              avatar: req.file?.filename ?? User.avatar,
            },
            {
              where: { id: userInSessionId },
            },
          )
            .then(() => {
              res.redirect(`/users/profile`)
            })
        })
        .catch(err => console.log(err))

    } else {
      User.findByPk(userInSessionId)
        .then((user) => {
          res.render("users/userProfileEdit", {
            user,
            errors: errors.mapped(),
            old: req.body,
            session: req.session,
            doctitle: "Editar mi perfil",
            link: "/css/profile.css",

          });
        })
        .catch(error => console.log(error))
    }
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
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 12),
        avatar: req.file?.filename ?? "default-image.png",
        role: 0,
      };

      User.create(newUser)
        .then((user) => {
          req.session.user = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
          };
          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      res.render("./users/register", {
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
        .then((user) => {
          req.session.user = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role,
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
  logout: (req, res) => {

    req.session.destroy();
    if (req.cookies.userBookstore) {
      res.cookie("userBookstore", "", { maxAge: -1 })
    }

    res.redirect("/");

  },

  cart: (req, res) => {
    res.render("products/cart", {
      session: req.session,
      doctitle: "Mi carrito",
      link: "/css/cart.css",
    });
  },
}

