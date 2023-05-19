const { Genre } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getAll: async (req, res) => {
        try {
            let genres = await Genre.findAll({
                attributes: ["id", "genre"]
            });
            if (genres.length == 0) throw 'No hay generos registrados';
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: genres.length,
                    status: 200,
                },
                genres,
            });
        } catch (error) {
            console.error(error)
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                },
            });
        };
    },
    getOne: async (req, res) => {
        try {
            let { id } = req.params;

            if (isNaN(id)) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: `Parámetro inválido ${id}`,
                    },
                });
            };

            let genre = await Genre.findByPk(id, {
                attributes: ["id", "genre"],
            });

            if (!genre) throw `No existe genre con id ${id}`;

            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                },
                genre,
            });

        } catch (error) {
            console.error(error);
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                },
            });
        };
    },
    addOne: async (req, res) => { //agregar validaciones
        try {
            let newGenre = await Genre.create({ ...req.body });

            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req) + `/${newGenre.id}`,
                    msg: "Género creado satisfactoriamente",
                },
                newGenre,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                meta: {
                    status: 400,
                    msg: error,
                },
            });
        };
    },
    modifyOne: async (req, res) => { //agregar validaciones
        let { id } = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: `Parámetro inválido ${id}`,
                },
            });
        };

        let existsGenre = await Genre.findByPk(id);

        try {
            if (!existsGenre) throw `No se pudo editar género, no existe género con id ${id}`;

            let genreToEdit = await Genre.update(
                { ...req.body },
                { where: { id } },
            );
            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req),
                    msg: "Género modificado satisfactoriamente",
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(404).json({
                status: 400,
                msg: error,
            })
        };
    },
    removeOne: async (req, res) => {
        let { id } = req.params;

        if (isNaN(id)) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: `Parámetro inválido ${id}`,
                },
            });
        };

        let existsGenre = await Genre.findByPk(id);

        try {
            if (!existsGenre) throw `No se pudo eliminar género, no existe género con id ${id}`;

            Genre.destroy({ where: { id } });
            return res.status(201).json({
                meta: {
                    status: 201,
                    msg: `Género con id: ${id} eliminado satisfactoriamente`,
                }
            })
        } catch (error) {
            console.error(error);
            return res.status(404).json({
                status: 404,
                msg: error,
            })
        };
    },
}