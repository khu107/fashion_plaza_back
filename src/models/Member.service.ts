import { shapeIntoMongooseObjectId } from "../libs/config";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toObject();
    } catch (error) {
      console.error("Error, model:signup", error);
      throw new Error("iltimos tuldiring");
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        {
          memberEmail: input.memberEmail,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1, memberEmail: 1 }
      )
      .exec();

    if (!member) throw new Error("parol yoki email ni tekshiring!!!");
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Error("siz block usersiz!!");
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) throw new Error("parol yoki email ni tekshiring!!!");

    return await this.memberModel.findById(member._id).lean();
  }

  // Admin

  public async proccessSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        memberType: MemberType.ADMIN,
      })
      .exec();
    if (exist) throw new Error("Admin mavjud");

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    try {
      const result = await this.memberModel.create(input);
      return result.toObject();
    } catch (err) {
      console.log("Error: proccessSignup:", err);

      throw err;
    }
  }

  public async proccessLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberEmail: input.memberEmail },
        { memberEmail: 1, memberPassword: 1 }
      )
      .exec();
    if (!member) throw new Error("bunday Amin mavjud emas");
    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) throw new Error("passport yoki email notugri");

    return await this.memberModel.findById(member._id).lean();
  }

  public async getUsers(): Promise<any[]> {
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    if (!result) throw new Error("NO_DATA_FOUND");
    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    if (!result) throw new Error("UPDATE_FAILED");
    return result.toObject();
  }
}

export default MemberService;
