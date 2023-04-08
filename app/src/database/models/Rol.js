module.exports = (sequelize, dataTypes) => {

    const alias = "Rol";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rol: {
            type: dataTypes.STRING(100),
        },
    };

    const config = {
        tableName: "roles",
        timestamps: false,
    };
    
    const Rol = sequelize.define(alias, cols, config);

    return Rol;
};