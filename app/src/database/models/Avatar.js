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
        user_id: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "avatars",
        timestamps: true,
    };
    
    const AVATAR = sequelize.define(ALIAS, COLS, CONFIG);

    AVATAR.associate = (models) => {
        AVATAR.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        });
    };

    return AVATAR;
};