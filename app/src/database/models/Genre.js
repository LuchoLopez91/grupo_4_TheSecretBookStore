module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Genres";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        genre: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "genres",
        timestamps: true,
    };
    
    const GENRE = sequelize.define(ALIAS, COLS, CONFIG);

    GENRE.associate = (models) => {
        GENRE.hasMany(models.Book, {
            as: "books",
            foreignKey: "genre",
        });
    };

    return GENRE;
};