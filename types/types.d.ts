import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export type User = {
    id: string;
    user: string;
    password: string;
    name: string;
    lastName: string;
    rol: Rol;
    status: Status;
    token: string
  };
  
  export enum Rol {
    ADMIN = "ADMIN",
    USER = "USUARIO",
  }
  
  export enum Status {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    ELIMINADO = "ELIMINADO",
  }

  export type ErrorResponse = {
    status: number;
    error: string;
    errorDetail: string;
  };

  export interface RequestExt extends Request {
    idUser?: JwtPayload | { idUser: string };
  }

  export type LoginResponse = {
    status: number;
    token: string;
  };

  export type Message = {
    message: string;
    param1: string[];
    param2: string[];
    param3: string[];
    param4: string[];
    numbers: string[];
  }

  export type Whats = {
    total: number;
  }