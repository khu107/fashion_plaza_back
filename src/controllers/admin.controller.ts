import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Response } from "express";
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

export default adminController;
