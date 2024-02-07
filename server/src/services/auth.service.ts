import { User } from "../../../types/types";
import UserModel from "../models/user.model";
import { verified } from "../utils/bcypt.handle";
import { generateToken } from "../utils/jwt.handle";

const loginService = async ({ user, password }: Partial<User>) => {
    if (user == "" || password == "" || user == null || password == null)
      throw Error("USER OR PASSWORD INCORRECT");
  
    let checkIs = await UserModel.findOne({
      user: user.trim().toUpperCase(),
      status: "ACTIVO",
    });
  
    if (!checkIs || checkIs == null) throw Error("USER OR PASSWORD INCORRECT");
  
    const passwordHash = checkIs.password;
    const isCorrect = await verified(password ?? "", passwordHash);
  
    if (!isCorrect) throw Error("USER OR PASSWORD INCORRECT");
  
    const token = generateToken(`${checkIs._id}`);
    return token;
  };

  export { loginService }