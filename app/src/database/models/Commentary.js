module.exports = (sequelize, dataTypes) => {

    const alias = "Commentary";

    const cols = {
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
        bookID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
        },
        userID: {
            type: dataTypes.INTEGER(10).UNSIGNED,
        },
    };

    const config = {
        tableName: "commentaries",
        timestamps: false,
    };
    
    const Commentary = sequelize.define(alias, cols, config);

    return Commentary;
};