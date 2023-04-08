module.exports = (sequelize, dataTypes) => {

    const alias = "Language";

    const cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        rol: {
            type: dataTypes.STRING(100),
        },
    };

    const config = {
        tableName: "languages",
        timestamps: false,
    };
    
    const Language = sequelize.define(alias, cols, config);

    return Language;
};