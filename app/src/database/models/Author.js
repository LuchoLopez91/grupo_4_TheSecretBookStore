module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Author";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(100),
        },
        lastName: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "authors",
        timestamps: true,
    };
    
    const AUTHOR = sequelize.define(ALIAS, COLS, CONFIG);

    AUTHOR.associate = (models) => {
        AUTHOR.hasMany(models.Book, {
            as: "books",
            foreignKey: "author",
        });
    };

    return AUTHOR;
};