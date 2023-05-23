module.exports = {
    getBooks: async (req, res) => {
        try {
            const books = await getProducts();
            const booksResponse = books.map(({id, title, description, cover, genre}) => {
                return {
                    id,
                    title,
                    description,
                    cover,
                    genre,
                    detail: `/api/products/${id}`
                };
            });

            const getBookCountByGenre = (books) => {
                const genreCount = {};
                for (const book of books) {
                    const genreName = book.genre.name;
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
            
        }
    },
    getBookById: async (req, res) => {
        const BOOK_ID = req.params.id;
        const book = await getBookById(BOOK_ID);
        return res.status(200).json(book);
    },
};