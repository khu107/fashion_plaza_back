import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { ExtendedRequest, LoginInput, MemberInput } from "../libs/types/member";
import { AUTH_TIMER } from "../libs/config";
import AuthService from "../models/Auth.service";

const memberService = new MemberService();
const authService = new AuthService();
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result = await memberService.signup(input);
    res.status(201).json(result);
  } catch (error: any) {
    console.log("Error: signup", error);
    res.status(404).json({
      message: error.message,
    });
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result = await memberService.login(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(200).json({
      accessToken: token,
      member: result,
    });
  } catch (error: any) {
    console.log("Error: login", error);
    res.status(404).json({
      message: error.message,
    });
  }
};

memberController.logout = (req: Request, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(200).json({ logout: true });
  } catch (error: any) {
    console.log("Error, logout", error);
    res.status(404).json({
      message: error.message,
    });
  }
};

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    if (!req.member) throw new Error("NOT_AUTHENTICATED");

    next();
  } catch (error: any) {
    console.log("Error, verifyAuth", error);
    res.status(404).json({
      message: error.message,
    });
  }
};

memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);
    next();
  } catch (err) {
    console.log("Error, retrieveAuth", err);
    next();
  }
};
export default memberController;
