const { User } = require("../../database/models");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    getAll: async (req, res) => {
        try {
            let users = await User.findAll({
                attributes : [ "id", "firstName", "lastName", "email", ]
            });
            if (users.length == 0) throw 'No hay ususarios registrados';
            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: users.length,
                    status: 200,
                },
                users,
            });
        } catch (error) {
            console.error(error)
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                }
            });
        };
    },
    getOne: async (req, res) => {
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
            let user = await User.findByPk(id);

            if (!user) throw `No existe usuario con id ${id}`;

            return res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                },
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: `http://localhost:3030/images/avatars/${user.avatar}`,
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
    },
}