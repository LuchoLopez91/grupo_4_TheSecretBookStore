module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Cover";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        route: {
            type: dataTypes.STRING(100),
        },
        book_id: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "covers",
        timestamps: true,
    };
    
    const COVER = sequelize.define(ALIAS, COLS, CONFIG);

    COVER.associate = (models) => {
        COVER.belongsTo(models.Book, {
            as: "covers",
            foreignKey: "book_id",
        });
    };

    return COVER;
};