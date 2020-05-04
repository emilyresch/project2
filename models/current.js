module.exports = function (sequelize, DataTypes) {
    var Current = sequelize.define("Current", {
        author: Sequelize.STRING,
        title: Sequelize.STRING,
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });


    
    Current.associate = function (models) {
        //CURRENT should belong to a USER
        Current.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Current;
}