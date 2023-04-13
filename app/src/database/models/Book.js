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
            as: "author",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Format, {
            as: "format",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Language, {
            as: "language",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Cover, {
            as: "cover",
            foreignKey: "id",
        });
        BOOK.belongsTo(models.Editorial, {
            as: "editorial",
            foreignKey: "id",
        });

        BOOK.hasMany(models.Commentary, {
            as: "commentaries",
            foreignKey: "id",
        })
    };

    return BOOK;
};