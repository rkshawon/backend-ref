import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../models/users.model";
import ApiError from "./http.error";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "supersecret",
      passReqToCallback: true,
    },
    async function (req: any, jwtToken: any, done: any) {
      try {
        const user = await User.findById(jwtToken.user_id).populate("companies.info").lean();

        if (!user) {
          return done(undefined, false);
        }

        const loggedInCompany = user.companies.find(company=>{

          if(company.info._id.equals(jwtToken.company_id)){
            return company;
          }
        })




        const companies = user.companies;
        // Finding Requested Resources liscense_type
        const req_path: string = req._parsedUrl.pathname;
        let requestedLicenseAccess: string = "";

        if (user.role === "admin") {
          const accessible = adminRoutes.some((path) => req_path.includes(path));
          if (accessible) {
            return done(null, {
              ...user,
              company: {
                id:loggedInCompany?.info._id,
                name:loggedInCompany?.info.business_name,
                license_type:loggedInCompany?.info.license_type

              }
            });
          }
        }

        LicesnesTypes.map(({ baseUrl, type }) => {
          if (req_path.includes(baseUrl)) {
            requestedLicenseAccess = type;
          }
        });

        // Checking user permission on the liscense_type;
        const licenseAccess = companies.find((company) => {
          if (company.access) {
            return company.info.license_type === requestedLicenseAccess;
          }
        });

      

        // if (!licenseAccess) {
        //   throw new ApiError(403, "You don't have acccess on this resources");
        // }

        if (licenseAccess) {
          const companyPermission = licenseAccess.permissions;
        
        }

        return done(null, {
          ...user,
          company: {
            id:loggedInCompany?.info._id,
            name:loggedInCompany?.info.business_name,
            license_type:loggedInCompany?.info.license_type
          }
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

const adminRoutes = ["/superadmin", "/users"];

const LicesnesTypes = [
  {
    baseUrl: "/growers",
    type: "grower",
  },
  {
    baseUrl: "/dispensaries",
    type: "dispensary",
  },
  {
    baseUrl: "/processors",
    type: "processor",
  }
];
