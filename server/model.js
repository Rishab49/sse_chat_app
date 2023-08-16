import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sse_chat", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

const UserModel = sequelize.define(
  "User",
  {
    userID: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
  }
);

export { sequelize, UserModel };
