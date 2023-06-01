const { Book } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.findAll({
                include: [
                    {association: "genres"},
                ]
            });
            const booksResponse = books.map(({ id, title, description, cover,  genres }) => {
                return {
                    id,
                    title,
                    description,
                    cover,
                    genre: genres.genre,
                    detail: `${getUrl(req)}/${id}`,
                };
            });
            
            const getBookCountByGenre = (books) => {
                const genreCount = {};
                for (const book of books) {
                    const genreName = book.genres.genre;
                    if (genreCount.hasOwnProperty(genreName)) {
                        genreCount[genreName]++;
                    } else {
                        genreCount[genreName] = 1;
                    }
                }
                return genreCount;
            }
            const RESPONSE = {
                count: books.length,
                countByGenre: getBookCountByGenre(books),
                products: booksResponse
            };
            return res.status(200).json(RESPONSE)
        } catch (error) {
             console.error(error)
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                }
            })
        }
    },

    getBookById: async (req, res) => {
        let {id} = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: `Parámetro inválido ${id}`,
                },
            });
        };

        try {
            let book = await Book.findByPk(id, {
                include: [
                    {association: "editorials"},
                    {association: "formats"},
                    {association: "genres"},
                    {association: "languages"},
                ]
            });

            if (!book) throw `No existe el libro con id: ${id}`;

            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                },
                book: {
                    id: book.id,
                    title: book.title,
                    isbn3: book.isbn3,
                    genre: book.genres.genre,
                    language: book.languages.language,
                    format: book.formats.format,
                    pageCount: book.pageCount,
                    author: book.author,
                    calification: book.calification,
                    editorial: book.editorials.editorial,
                    publication_date: book.publication_date,
                    price: book.price,
                    description: book.description,
                    cover: book.cover,
                },
            });

        } catch (error) {
            console.error(error)
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                }
            })
        };
    }
    
};