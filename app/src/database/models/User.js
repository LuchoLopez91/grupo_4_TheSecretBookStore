module.exports = (sequelize, dataTypes) => {

    const ALIAS = "User";

    const COLS = {
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
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },
        role: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };

    const CONFIG = {
        tableName: "users",
        timestamps: false,
    };
    
    const USER = sequelize.define(ALIAS, COLS, CONFIG);

    USER.associate = (models) => {
        USER.belongsTo(models.Role, {
            as: "role",
            foreignKey: "id",
        });
        USER.belongsTo(models.Avatar, {
            as: "avatar",
            foreignKey: "id",
        });

        USER.hasMany(models.Commentary, {
            as: "commentaries",
            foreignKey: "id",
        })
    };

    return USER;
};