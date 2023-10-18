
import jwt from "jsonwebtoken";
import IUser from "../../interface/users.interface";
import userModel from "../../models/users.model";
import bcrypt from "bcrypt";
import LoginToken from "../../utils/token-generate";
import ApiError from "../../utils/http.error";



const setPasswordService = async (token: string,password:string): Promise<any> => {

    const secret: any = process.env.JWT_SECRET;
    interface JwtPayload {
      id: string
    }

    const { id } = jwt.verify(token, secret) as JwtPayload

    const existingUser:IUser| null = await userModel.findById(id);

    if(existingUser?.status==="active"){
      throw new ApiError(400,"User already active. If you're having trouble accessing your account, please contact our support team for assistance")
    }


    const hash = await bcrypt.hash(password, 10);
    let user= await userModel.findByIdAndUpdate(id,{
      password: hash,
      status:"active"
    },{
      new:true
    }).populate("companies.info");


    if(!user){
      throw new ApiError(401, "User not found. Please check your input or register if you're new.")
    }
    return LoginToken(user);


  }

  export default setPasswordService;