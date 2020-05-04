module.exports = function (sequelize, DataTypes) {
    var Wish = sequelize.define("Wishlist", {
        author: Sequelize.STRING,
        title: Sequelize.STRING,
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
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