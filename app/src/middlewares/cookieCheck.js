module.exports = (req, res, next) => {
    if(req.cookies.userBookstore && !req.session.user) {
        req.session.user = req.cookies.userBookstore;
        res.locals.user = req.session.user;
    }
    next();
}