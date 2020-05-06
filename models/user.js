//USER DATABASE INFO
var bcrypt = require("bcryptjs");

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

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };

      User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });

    return User;
}