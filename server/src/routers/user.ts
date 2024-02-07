import { Router, Request } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();
router.get("/", login);

export { router };