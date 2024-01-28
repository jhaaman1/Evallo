import { ContentService } from "../Services/ContentService.js";
import { UserService } from "../Services/User.Service.js";
import { User } from "../models/UserModel.js";

export const UserRoutes = (app) => {
  app.post("/api/register", async (req, res) => {
    try {
      await UserService.createUser(req.body);
      res
        .status(200)
        .send({ code: 200, message: "User registered successfully!" });
    } catch (e) {
      console.error(e);
      res.status(e.code).send({ message: e.message });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password, persist } = req.body;
      if (!email) {
        throw { code: 400, message: "Email ID is required" };
      }

      if (!password) {
        throw { code: 400, message: "Password is required" };
      }
      const accessToken = await UserService.generateAccessToken(
        email,
        password,
        persist
      );
      if (!accessToken) {
        throw { code: 500, message: "Failed to generate access token" };
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        throw { code: 404, message: "User not found" };
      }
      if (user && accessToken) {
        res.status(200).send({
          token: accessToken
        });
      } else {
        res
          .status(404)
          .json({ error: "User not found or access token is invalid" });
      }
    } catch (e) {
      console.error(e);
      res.status(e.code).send({ message: e.message });
    }
  });
};
