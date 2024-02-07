import UserModel from "../models/user.model";
import { encrypt } from "./bcypt.handle";
const fs = require("fs");

export const initConfig = async () => {
  const existAdmin = await UserModel.findOne({ user: "admin" });
  if (existAdmin) return;

  const passHash = await encrypt("admin");
  const admin = await UserModel.create({
    name: "admin",
    user: "admin",
    password: passHash,
    status: "ACTIVO",
    rol: "ADMIN",
  });
  return;
};