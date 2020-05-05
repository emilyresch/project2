//COMPLETED BOOKS
module.exports = function (sequelize, DataTypes) {
    var Complete = sequelize.define("Completed", {
        author: Sequelize.STRING,
        title: Sequelize.STRING,
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        have_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });


    //A completed book should belong to a User
    Complete.associate = function (models) {
        Complete.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Complete;
}