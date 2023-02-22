const fs = require("fs");
const path = require("path");


const booksPathDB = path.join(__dirname, "../database/books.json");
const genresPathDB = path.join(__dirname, "../database/genres.json");
const languagesPathDB = path.join(__dirname, "../database/languages.json");
const books = JSON.parse(fs.readFileSync(booksPathDB, "utf-8"));
const genres = JSON.parse(fs.readFileSync(genresPathDB, "utf-8"));
const languages = JSON.parse(fs.readFileSync(languagesPathDB, "utf-8"));
const writeJSON = function (book) {
  fs.writeFileSync(booksPathDB, JSON.stringify(book), "utf-8");
};

module.exports = {
  product: (req, res) => {
    let book = books.find((book) => book.id == req.params.id);

    res.render("products/product", {
      book,
      link: "/css/product.css",
    });
  },

  list: (req, res) => {
    res.render("products/all-products",{
      doctitle: "Todos los productos",
      link: "/css/home.css",
      books,
      genres,
      languages,
    })
  },

  create: (req, res) => {
    res.render("products/product-create-form", {
      doctitle: "Crear producto",
      link: "/css/product-create-form.css",
      genres,
      languages,
    });
  },

  store: (req, res) => {
    let lastId = books[books.length - 1].id;

    let newBook = {
      id: lastId + 1,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      editorial: req.body.editorial,
      languages: req.body.languages,
      format: req.body.format,
      genre: req.body.genre,
      description: req.body.description,
      image: req.file.filename,
    };

    books.push(newBook);

    writeJSON(books);

    res.redirect("/");
  },

  edit: (req, res) => {
    let bookToEdit = books.find(book => book.id == req.params.id);
   
    res.render("products/product-edit-form.ejs", {
      bookToEdit,
      doctitle: bookToEdit.title,
      link: "/css/product-edit-form.css",
      genres,
      languages,
    });
  },

  update: (req, res) => {
    console.log(req.body)
    let bookID = Number(req.params.id);
  
    
   books.forEach( (book) => {
      if (book.id == bookID) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.price = req.body.price;
        book.editorial = req.body.editorial;
        book.languages = req.body.languages;
        book.format = req.body.format;
        book.genre = req.body.genre;
        book.description = req.body.description;
        book.image = req.file.filename;
      }
    });
    writeJSON(books);
    res.redirect(`/store/details/${bookID}`);
  },

  burn: (req, res) => {
    let bookID = Number(req.params.id);

    let newInventory = books.filter(book => book.id !== bookID);

    writeJSON(newInventory);
    res.redirect("/");
  },

  booksByGenres: (req, res) => {
    let genre = req.params.category;
    let inventory = books.filter(book => book.genre == genre);
    res.render('./products/books-by-genres', {
      inventory,
      genre,
      doctitle: genre,
      link: '/css/home.css',
    });
  },
};
