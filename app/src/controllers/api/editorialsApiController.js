const { Editorial } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getAll: async (req, res) => {
        try {
            let editorials = await Editorial.findAll({
                attributes: ["id", "editorial"]
            });
            if (editorials.length == 0) throw 'No hay editorials registradas';
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: editorials.length,
                    status: 200,
                },
                editorials,
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

            let editorial = await Editorial.findByPk(id, {
                attributes: ["id", "editorial"],
            });

            if (!editorial) throw `No existe editorial con id ${id}`;

            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                },
                editorial,
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
            let newEditorial = await Editorial.create({ ...req.body });

            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req) + `/${newEditorial.id}`,
                    msg: "Editorial creada satisfactoriamente",
                },
                newEditorial,
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

        let existsEditorial = Editorial.findByPk(id);

        try {
            if (!existsEditorial) throw `No se pudo edita editorial, no existe editorial con id ${id}`;

            let editorialToEdit = await Editorial.update(
                { ...req.body },
                { where: { id } },
            );
            return res.status(201).json({
                meta: {
                    endPoint: getUrl(req) + `/${editorialToEdit.id}`,
                    msg: "Editorial modificada satisfactoriamente",
                },
                editorialToEdit,
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

        let existsEditorial = await Editorial.findByPk(id);

        try {
            if (!existsEditorial) throw `No se pudo eliminar editorial, no existe editorial con id ${id}`;

            Editorial.destroy({ where: { id } });
            return res.status(201).json({
                meta: {
                    status: 201,
                    msg: `Editorial con id: ${id} eliminada satisfactoriamente`,
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