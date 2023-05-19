const { Language } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getAll: async (req, res) => {
        try {
            let languages = await Language.findAll({
                attributes: ["id", "language"]
            });
            if (languages.length == 0) throw 'No hay idiomas registrados';
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: languages.length,
                    status: 200,
                },
                languages,
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

            let language = await Language.findByPk(id, {
                attributes: ["id", "language"],
            });

            if (!language) throw `No existe idioma con id ${id}`;

            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                },
                language,
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
            let newLanguage = await Language.create({ ...req.body });

            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req) + `/${newLanguage.id}`,
                    msg: "Género creado satisfactoriamente",
                },
                newLanguage,
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

        let existsLanguage = await Language.findByPk(id);

        try {
            if (!existsLanguage) throw `No se pudo editar idioma, no existe idioma con id ${id}`;

            let languageToEdit = await Language.update(
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

        let existsLanguage = await Language.findByPk(id);

        try {
            if (!existsLanguage) throw `No se pudo eliminar idioma, no existe idioma con id ${id}`;

            Language.destroy({ where: { id } });
            return res.status(201).json({
                meta: {
                    status: 201,
                    msg: `Idioma con id: ${id} eliminado satisfactoriamente`,
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