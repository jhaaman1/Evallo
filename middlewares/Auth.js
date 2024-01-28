import jwt from "jsonwebtoken";
import { ContentService } from "../Services/ContentService.js";
import { UserService } from "../Services/User.Service.js";


export const Authorize = (roles) => {
    return async (req, res, next) => {
      try {
        const authToken = req.headers.authorization;
  
        if (!authToken) {
          return res
            .status(401)
            .send({ code: 401, message: "Invalid login attempt (1)" });
        }
  
        const tokenParts = authToken.split(" ");
        if (
          tokenParts.length !== 2 ||
          !(tokenParts[0] === "Bearer" && tokenParts[1])
        ) {
          return res
            .status(401)
            .send({ code: 401, message: "Invalid login attempt (2)" });
        }
  
        const user = jwt.verify(tokenParts[1], process.env.JWT_SECRET_KEY);
  
        if (!user) {
          return res
            .status(401)
            .send({ code: 401, message: "Invalid login attempt (3)" });
        }
  
        let existingUser;
        if (roles.includes("teacher")) {
          existingUser = await UserService.findUserById(user.id);
          if (!existingUser) {
            return res
              .status(401)
              .send({ code: 401, message: "Invalid login attempt for user (4)" });
          }
        }
  
        if (roles.includes("student")) {
          existingUser = await UserService.findAdminById(user.id);
          if (!existingUser) {
            return res.status(401).send({
              code: 401,
              message: "Invalid login attempt for admin (4)",
            });
          }
        }
  
  
        if (roles && roles.length > 0) {
          let userHasRequiredRole = false;
          roles.forEach((role) => {
            if (existingUser.role === role.toLowerCase())
              userHasRequiredRole = true;
          });
          if (!userHasRequiredRole)
            return res
              .status(401)
              .send({ code: 401, message: "Unauthorized access" });
        }
  
        req.user = existingUser;
      } catch (err) {
        console.log(err);
        return res
          .status(401)
          .send({ code: 401, message: "Invalid login attempt (5)" });
      }
      next();
    };
  };