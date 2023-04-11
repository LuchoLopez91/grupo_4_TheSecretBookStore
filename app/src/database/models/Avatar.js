module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Avatar";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        route: {
            type: dataTypes.STRING(100),
        },
        user: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "covers",
        timestamps: false,
    };
    
    const AVATAR = sequelize.define(ALIAS, COLS, CONFIG);

    AVATAR.associate = (models) => {
        AVATAR.belongsTo(models.User, {
            as: "user",
            foreignKey: "avatar",
        });
    };

    return AVATAR;
};