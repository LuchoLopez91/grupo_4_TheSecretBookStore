const { users } = require("../database-old")
const { validationResult } = require("express-validator")
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const bcrypt = require("bcryptjs");
const { User, Avatar } = require("../database/models");
const axios = require("axios");


/*const usersPathDB = path.join(__dirname, "../database-old/users.json");
const users = JSON.parse(fs.readFileSync(usersPathDB, "utf-8"));
const writeJSON = function (user) {
    fs.writeFileSync(usersPathDB, JSON.stringify(user), "utf-8");
};*/

module.exports = {
  profile: (req, res) => {
    let userInSessionId = req.session.user.id;

    User.findByPk(userInSessionId, { include: [{ association: "avatars" }] })
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
      const user = await User.findByPk(userInSessionId, { include: [{ association: "avatars" }] });
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

    // User.findByPk(userInSessionId, { include: [{ association: "avatars" }] })
    //   .then((user) => {
    //     fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id")
    //     .then(response => response.json())
    //     .then(data => {
    //       return res.render("users/userProfileEdit", {
    //         user,
    //         data,
    //         session: req.session,
    //         doctitle: "Editar mi perfil",
    //         link: "/css/profile.css",
    //       })
    //     })

    //   })
    //   .catch(error => console.log(error));
  },
  updateProfile: (req, res) => {
    let errors = validationResult(req);
    let userInSessionId = req.session.user.id;

    if (errors.isEmpty()) {

      let {
        firstName,
        lastName,
        email,
        phone,
        adress,
        postalCode,
        province,
        city,
      } =
        req.body;

      User.update({
        firstName,
        lastName,
        email,
        phone,
        adress,
        postalCode,
        province,
        city,
      }, {
        where: {
          id: userInSessionId,
        }
      })
        .then((result) => {
          if (result) {
            // Si no reemplaza imagen
            if (!req.file) {
              return res.redirect("/users/profile");
            } else {
              // 1- Obtener todas las imagenes del producto a actualizar
              Avatar.findOne({
                where: {
                  user_id: userInSessionId
                }
              })
                /*.then(() => {
                  // 2- obtener el nombre de las imagenes a eliminar
                  // 3- Eliminar los archivos
                  const MATCH = fs.existsSync("./public/images/avatars/", Avatar.route);
                  if (MATCH) {
                    try {
                      fs.unlinkSync(`./public/images/avatars/${Avatar.route}`)
                    } catch (error) {
                      throw new Error(error)
                    }
                  } else {
                    console.log("No se encontró el archivo");
                  }
                })*/
              // 4- Eliminamos las imagenes de la DB (destroy)
              Avatar.destroy({
                where: {
                  user_id: userInSessionId,
                }
              })
                .then(() => {
                  // 5- Crear los registros de las nuevas imagenes                  

                  /*if (req.file.length === 0) {
                  Avatar.create({
                    route: "default-image.png",
                    user_id: user.id,
                  }).then(() => {
                    return res.redirect("/");
                  });
                }else {
                  Avatar.create({
                      route: req.file.filename,
                      user_id: user.id})*/
                  if (req.file.length === 0) {
                    Avatar.create({
                      route: "default-image.png",
                      user_id: user.id
                    })
                      .then(() => {
                        return res.redirect("/users/profile");
                      })
                  } else {
                    Avatar.create({
                      route: req.file.filename,
                      user_id: userInSessionId
                    })
                      .then(() => {
                        return res.redirect("/users/profile");
                      })

                  }
                })
            }
          }
        })


    } else {
      User.findByPk(userInSessionId, { include: [{ association: "avatars" }] })
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        phone: req.body.phone,
        adress: req.body.adress,
        postal_code: req.body.postal_code,
        province: req.body.province,
        city: req.body.city,
        role: 0,
      };

      User.create(newUser)
        .then((user) => {
          if (!req.file || req.file.length === 0) {
            Avatar.create({
              route: "default-image.png",
              user_id: user.id,
            }).then(() => {
              return res.redirect("/users/login");
            });
          } else {
            Avatar.create({
              route: req.file.filename,
              user_id: user.id
            })
              .then(() => {
                return res.redirect("/users/login");
              });
          }
        })
        .catch((error) => console.log(error))
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
            role: user.role
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
    if(req.cookies.userBookstore){
        res.cookie("userBookstore", "", {maxAge: -1})
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

