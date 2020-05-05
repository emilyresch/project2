//USER DATABASE INFO
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    });
    User.associate = function (models) {
        // Associating Users with New and Old books
        User.hasMany(models.Wish, {
            onDelete: "cascade"
        });
        User.hasMany(models.Completed, {
            onDelete: "cascade"
        });
    };

    return User;
}