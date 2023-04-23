module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Editorial";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        editorial: {
            type: dataTypes.STRING(255),
        },
    };

    const CONFIG = {
        tableName: "editorials",
        timestamps: true,
    };
    
    const EDITORIAL = sequelize.define(ALIAS, COLS, CONFIG);

    EDITORIAL.associate = (models) => {
        EDITORIAL.hasMany(models.Book, {
            as: "editorials",
            foreignKey: "editorial_id",
        });
    };

    return EDITORIAL;
};