//COMPLETED BOOKS
module.exports = function (sequelize, DataTypes) {
    var Completed = sequelize.define("Completed", {
        author: DataTypes.STRING,
        title: DataTypes.STRING,
        have_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });


    //A completed book should belong to a User
    Completed.associate = function (models) {
        Completed.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Completed;
}