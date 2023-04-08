module.exports = (sequelize, dataTypes) => {

    const alias = "Book";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        isbn13: {
            type: dataTypes.BIGINT(13).UNSIGNED,
            allowNull: false,
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        cover: {
            type: dataTypes.STRING(100),
        },
        genre: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        language: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        format: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        pageCount: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        authorID: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        calification: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
    };

    const config = {
        tableName: "books",
        timestamps: false,
    };
    
    const Book = sequelize.define(alias, cols, config);

    return Book;
};