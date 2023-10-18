import loginService from "./login-services";
import setPasswordService from "./set-password.services";

class AuthServices {

  public login = loginService;
  public setPassword=setPasswordService;

}

export default AuthServices;