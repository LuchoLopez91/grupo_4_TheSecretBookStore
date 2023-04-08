module.exports = (sequelize, dataTypes) => {

    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        lastName: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: dataTypes.STRING(100),
        },
        rol: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };

    const config = {
        tableName: "users",
        timestamps: false,
    };
    
    const User = sequelize.define(alias, cols, config);

    return User;
};