
module.exports = (req, res, next) =>  req.session.user.rol == 'ADMIN' ? next() : res.redirect("/");