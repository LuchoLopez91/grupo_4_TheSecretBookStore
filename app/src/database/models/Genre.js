module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Genre";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
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
            as: "genres",
            foreignKey: "genre_id",
        });
    };

    return GENRE;
};