module.exports = (sequelize, dataTypes) => {

    const alias = "Author";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        firstName: {
            type: dataTypes.STRING(100),
        },
        lastName: {
            type: dataTypes.STRING(100),
        },
    };

    const config = {
        tableName: "authors",
        timestamps: false,
    };
    
    const Author = sequelize.define(alias, cols, config);

    return Author;
};