import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js"

const user = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default user;