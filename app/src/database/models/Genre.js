module.exports = (sequelize, dataTypes) => {

    const alias = "Genres";

    const cols = {
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

    const config = {
        tableName: "genres",
        timestamps: false,
    };
    
    const Genre = sequelize.define(alias, cols, config);

    return Genre;
};