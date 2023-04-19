module.exports = (sequelize, dataTypes) => {

    const ALIAS = "Commentary";

    const COLS = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        commentary: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        calification: {
            type: dataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
        },
        book: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        user: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
    };

    const CONFIG = {
        tableName: "commentaries",
        timestamps: true,
    };
    
    const COMMENTARY = sequelize.define(ALIAS, COLS, CONFIG);

    COMMENTARY.associate = (models) => {
        COMMENTARY.belongsTo(models.Book, {
            as: "books",
            foreignKey: "id",
        });
        COMMENTARY.belongsTo(models.User, {
            as: "users",
            foreignKey: "id",
        });
    };

    return COMMENTARY;
};