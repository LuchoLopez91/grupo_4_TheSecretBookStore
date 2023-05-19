const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");

/* Method Override */
const methodOverride = require('method-override');
/* /Method Override */

/* Middlewares */
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "theSecretBookStore",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(cookieCheck);
/* Middleware */

/* Templeta Engine */
app.use(express.static(path.join(__dirname,"../public")));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
/* /Template Engine */


/* Router */
const indexRouter = require("./routes/main");
const catalogRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const [
    editorialsApiRouter,
    genresApiRouter,
    languagesApiRouter,
    usersApiRouter,
] = require("./routes/api/index");
/* /Router */

/* Routes middlewares */
app.use("/", indexRouter);
app.use("/store", catalogRouter);
app.use("/users", usersRouter);
app.use("/api/editorials", editorialsApiRouter);
app.use("/api/genres", genresApiRouter);
app.use("/api/languages", languagesApiRouter);
app.use("/api/users", usersApiRouter);
/* Routes middlewares */





app.listen(PORT, () => {
    console.log(`The server is ON at the port http://localhost:${PORT}`)
});

