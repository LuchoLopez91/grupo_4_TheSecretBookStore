module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Language";

    const COLES = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        language: {
            type: dataTypes.STRING(100),
        },
    };

    const CONFIG = {
        tableName: "languages",
        timestamps: true,
    };
    
    const LANGUAGE = sequelize.define(ALIAS, COLES, CONFIG);

    LANGUAGE.associate = (models) => {
        LANGUAGE.hasMany(models.Book, {
            as: "languages",
            foreignKey: "language_id",
        });
    };

    return LANGUAGE;
};