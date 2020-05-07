//WISHLIST
module.exports = function (sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        author: DataTypes.STRING,
        title: DataTypes.STRING,
        have_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });


    Book.associate = function (models) {
        //New book should belong to a USER
        Book.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Book;
}