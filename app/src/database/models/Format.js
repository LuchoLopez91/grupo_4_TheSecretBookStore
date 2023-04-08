module.exports = (sequelize, dataTypes) => {

    const alias = "Format";

    const cols = {
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

    const config = {
        tableName: "formats",
        timestamps: false,
    };
    
    const Format = sequelize.define(alias, cols, config);

    return Format;
};