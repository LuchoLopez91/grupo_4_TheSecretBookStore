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
        /*avatar: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
        },*/
        role_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(30),
        },
        adress: {
            type: dataTypes.STRING(100),
        },
        postalCode: {
            type: dataTypes.STRING(20),
        },
        city: {
            type: dataTypes.STRING(100),
        },
        province: {
            type: dataTypes.STRING(100),
        },
        };

    const CONFIG = {
        tableName: "users",
        timestamps: true,
    };
    
    const USER = sequelize.define(ALIAS, COLS, CONFIG);

    USER.associate = (models) => {
        USER.belongsTo(models.Role, {
            as: "roles",
            foreignKey: "role_id",
        });
        USER.hasOne(models.Avatar, {
            as: "avatars",
            foreignKey: "user_id",
        });

        USER.hasMany(models.Commentary, {
            as: "commentaries",
            foreignKey: "id",
        })
    };

    return USER;
};