import { Request, Response } from "express";
import { LoginResponse } from "../../../types/types";
import { handleError } from "../utils/error.handle";
import { loginService } from "../services/auth.service";

const login = async ({ body }: Request, res: Response) => {
  const { user, password } = body;

  try {
    const userToken = await loginService({ user, password });
    const response: LoginResponse = {
      status: 200,
      token: userToken,
    };

    res.send(response);
  } catch (e: any) {
    handleError(res, "ERROR LOGIN", e);
  }
};

export { login }