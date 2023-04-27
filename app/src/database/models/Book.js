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
        /*cover: {
            type: dataTypes.STRING(100),
        },*/
        genre_id: {
            type: dataTypes.INTEGER(11).UNSIGNED,

        },
        language_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        format_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        pageCount: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        author: {
            type: dataTypes.STRING(100),
        },
        calification: {
            type: dataTypes.INTEGER(10).UNSIGNED,

        },
        editorial_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
        publication_date: {
            type: dataTypes.DATEONLY,
        },
        price: {
            type: dataTypes.MEDIUMINT(9).UNSIGNED,
            allowNull: false
        },
        description: dataTypes.STRING(),
        cover: dataTypes.STRING(),
    };

    const CONFIG = {
        tableName: "books",
        timestamps: true,
    };
    
    const BOOK = sequelize.define(ALIAS, COLS, CONFIG);

    BOOK.associate = (models) => {
        /* BOOK.belongsTo(models.Author, {
            as: "authors",
            foreignKey: "author_id",
        }); */
        BOOK.belongsTo(models.Format, {
            as: "formats",
            foreignKey: "format_id",
        });
        BOOK.belongsTo(models.Genre, {
            as: "genres",
            foreignKey: "genre_id",
        });
        BOOK.belongsTo(models.Language, {
            as: "languages",
            foreignKey: "language_id",
        });
        // BOOK.hasOne(models.Cover, {
        //     as: "covers",
        //     foreignKey: "book_id",
        // });
        BOOK.belongsTo(models.Editorial, {
            as: "editorials",
            foreignKey: "editorial_id",
        });

        BOOK.hasMany(models.Commentary, {
            as: "commentaries",
            foreignKey: "book_id",
        })
    };

    return BOOK;
};