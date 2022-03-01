module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User
}