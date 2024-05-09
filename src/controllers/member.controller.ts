import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
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
export default memberController;
