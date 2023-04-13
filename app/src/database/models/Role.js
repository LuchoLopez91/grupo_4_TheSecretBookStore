module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Role";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        role: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "roles",
        timestamps: true,
    };
    
    const ROLE = sequelize.define(ALIAS, COLS, CONFIG);

    ROLE.associate = (models) => {
        ROLE.hasMany(models.User, {
            as: "books",
            foreignKey: "role",
        });
    };

    return ROLE;
};