module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Format";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        format: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "formats",
        timestamps: false,
    };
    
    const FORMAT = sequelize.define(ALIAS, COLS, CONFIG);

    FORMAT.associate = (models) => {
        FORMAT.hasMany(models.Book, {
            as: "books",
            foreignKey: "format",
        });
    };

    return FORMAT;
};