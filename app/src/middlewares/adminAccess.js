const userDB = require('../database-old/users.json');

module.exports = (req, res, next) => userDB.inculdes(req.query.admin) ? next() : res.redirect('/home');