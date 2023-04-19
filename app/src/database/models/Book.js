module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Book";

    const COLS = {
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
        author: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        calification: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        editorial: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
    };

    const CONFIG = {
        tableName: "books",
        timestamps: true,
    };
    
    const BOOK = sequelize.define(ALIAS, COLS, CONFIG);

    BOOK.associate = (models) => {
        BOOK.belongsTo(models.Author, {
            as: "authors",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Format, {
            as: "formats",
            foreignKey: "id",
        });
        /*BOOK.belongsTo(models.Genre, {
            as: "genres",
            foreignKey: "id",
        });*/
        BOOK.belongsTo(models.Language, {
            as: "languages",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Cover, {
            as: "covers",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Editorial, {
            as: "editorials",
            foreignKey: "id",
        });

        BOOK.hasMany(models.Commentary, {
            as: "commentaries",
            foreignKey: "id",
        })
    };

    return BOOK;
};