const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

/* Templeta Engine */
app.use(express.static(path.join(__dirname,"../public")));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
/* /Template Engine */


/* Router */
const indexRouter = require("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
/* /Router */

/* Routes */
app.use("/", indexRouter);
app.use("/", productsRouter);
app.use("/", usersRouter);
/* /Routes */





app.listen(PORT, () => {
    console.log(`The server is ON at the port http://localhost:${PORT}`)
});

