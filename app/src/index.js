const express = require("express");
const app = express();
const path = require("path");
//const { products } = require("../../../../../clases/artistica-dali-c19/src/database");
const PORT = 3030;

app.use(express.static(path.join(__dirname, "../public")));

/* Templeta Engine */
app.set("view engine", "ejs");
app.set("views", "src/views");
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

/* Port */
app.listen(PORT, () => {
  console.log(`The server is ON at the port http://localhost:${PORT}`);
});
/* /Port */
