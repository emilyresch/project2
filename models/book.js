//WISHLIST
module.exports = function (sequelize, DataTypes) {
    var Wish = sequelize.define("Wish", {
        author: DataTypes.STRING,
        title: DataTypes.STRING,
        have_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });


    Wish.associate = function (models) {
        //New book should belong to a USER
        Wish.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Wish;
}