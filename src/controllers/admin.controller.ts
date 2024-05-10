import {
  AdminRequest,
  LoginInput,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { NextFunction, Request, Response } from "express";
import { MemberType } from "../libs/enums/member.enum";

const memberService = new MemberService();
const adminController: T = {};

adminController.proccessSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("proccessSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;
    const result = await memberService.proccessSignup(newMember);

    // session
    req.session.member = result;
    req.session.save(function () {
      res.send("ok");
    });
  } catch (err: any) {
    console.log("Error, proccessSignup", err);
    res.status(404).json({ message: err.message });
  }
};
adminController.proccessLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("proccessLogin");

    const input: LoginInput = req.body;
    const result = await memberService.proccessLogin(input);
    // session
    req.session.member = result;
    req.session.save(function () {
      res.send("login");
    });
  } catch (err: any) {
    console.log("Error, proccessLogin", err);
    res.status(404).json({ message: err });
  }
};

adminController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.send("logout");
    });
  } catch (err) {
    console.log("Error, logout", err);
    res.status(404).json({ message: err });
  }
};
adminController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    res.status(200).json({ users: result });
  } catch (err) {
    console.log("Error, getUsers", err);
    res.send(err);
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result: MemberUpdateInput = await memberService.updateChosenUser(
      req.body
    );
    res.status(200).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser", err);
    res.status(404).json(err);
  }
};

adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script>alert("${req.session.member.memberNick}")</script>`);
    else res.send(`<script>alert("${"NOT_AUTHENTICATED"}")</script>`);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.ADMIN) {
    req.member = req.session.member;
    next();
  } else {
    const message = "NOT_AUTHENTICATED";
    res.send(message);
  }
};
export default adminController;
