import { Schema, model } from "mongoose";
import { User } from "../../../types/types";

const UserSchema = new Schema<User>(
  {
    name: {
      required: true,
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    rol: {
      type: String,
      enum: ["ADMIN", "USUARIO"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "ELIMINADO"],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => {
        let date = new Date();
        let newDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1
        );
        return newDate;
      },
    },
  }
);

const UserModel = model("user", UserSchema);
export default UserModel;
