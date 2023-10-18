import IUsers from "../../interface/users.interface";
import usersModel from "../../models/users.model";
import ApiError from "../../utils/http.error";
import IAuthenticatedUser from "../../interface/AuthenticatedUser.interfce";
import LoginToken from "../../utils/token-generate";

const loginService = async (
  userDetails: IUsers
): Promise<IAuthenticatedUser> => {
  const { email, password } = userDetails;

  const user = await usersModel
    .findOne({ email: email })
    .populate("companies.info");

  if (!user) {
    throw new ApiError(400, "User Not Found");
  }

  const isAuthenticated = await user.isValidPassword(password);
  if (!isAuthenticated) {
    throw new ApiError(401, "User given credential is wrong");
  }

  if (!user.status) {
    throw new ApiError(401, "Your profile has been disabled ");
  }

  /*
  Instead of sending all the companies details, 
  we will send : business_name,license_type
  */

  return LoginToken(user);
};

export default loginService;
