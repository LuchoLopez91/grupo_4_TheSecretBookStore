const { Book } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            const booksResponse = books.map(({id, title, description, cover, genres}) => {
                return {
                    id,
                    title,
                    description,
                    cover,
                    genres,
                    detail: `/api/products/${id}`
                };
            });
            
            const getBookCountByGenre = (genres) => {
                const genreCount = {};
                for (const genre of genres) {
                    const genreName = genre;
                    if (genreCount.hasOwnProperty(genreName)) {
                        genreCount[genreName] ++;
                    } else {
                        genreCount[genreName] = 1;
                    }
                }
                return genreCount;
            }
            const RESPONSE = {
                count: books.length,
                countBygenre: getBookCountByGenre(books),
                products: booksResponse
            }
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
            let book = await Book.findByPk(id);

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
                    /* genre: book.genres_id,
                    language: book.languages,
                    format: book.formats, */
                    pageCount: book.pageCount,
                    author: book.author,
                    calification: book.calification,
                    /* editorial: book.editorials, */
                    publication_date: book.publication_date,
                    price: book.price,
                    description: book.description,
                    cover: `http://localhost:3030/images/books/${book.cover}`,
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