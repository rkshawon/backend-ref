import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import IUser from "../../../interface/users.interface";
import userModel from "../../../models/users.model";
import ApiError from "../../../utils/http.error";
import bcrypt from "bcrypt";
import LoginToken from "../../../utils/token-generate";

class AdminUserServices {
  private User = userModel;

  public addUser = async (user: any): Promise<IUser | any> => {

    const isUserExist: any = await this.User.findOne({
      email: user.email,
    });

    if (isUserExist) {
      throw new ApiError(400, "This email is already exits");
    }

    const newUser = await this.User.create(user);
    return newUser;
  };



  public getUser = async (userID: ObjectId): Promise<IUser | any> => {

    const user = await this.User.findById(userID);
    if (user && user.status) {
      return user;
    } else {
      throw new ApiError(400,"Usere not found")
    }
  };


  public getAllUsers = async (
    limit: number,
    skip: number
  ): Promise<IUser | any> => {
    const user = await this.User.find({ is_deleted: false })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    return user;
  };

  public updateUser = async (
    userDetails: IUser,
    id: ObjectId
  ): Promise<IUser | any> => {
    const singleCompany = await this.User.findById(id);
    if (singleCompany !== null) {
      const company = await this.User.findByIdAndUpdate(
        id,
        { ...userDetails },
        { new: true }
      );
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };

  public deleteUser = async (id: ObjectId): Promise<IUser | any> => {
    const singleUser = await this.User.findById(id);
    if (singleUser !== null) {
      const singleUser = await this.User.findByIdAndUpdate(
        id,
        {
          is_deleted: true,
        },
        { new: true }
      );
      return singleUser;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };
  
  
  public setPassword = async (token: string,password:string): Promise<any> => {

    const secret: any = process.env.JWT_SECRET;
    interface JwtPayload {
      id: string
    }

    const { id } = jwt.verify(token, secret) as JwtPayload

    const hash = await bcrypt.hash(password, 10);


    let user:IUser= await this.User.findByIdAndUpdate(id,{
      password: hash
    },{
      new:true
    }).lean();


    return LoginToken(user)

  }

}

export default AdminUserServices;