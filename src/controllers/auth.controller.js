import AuthService from "../services/auth.service.js";

export default class AuthController {
  static async SignIn(req, res) {
    try {
      const user_token = await AuthService.login(req.body);
      res.status(200).json(user_token);
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json({ message: error.message || "INTERNAL SERVER ERROR" });
    }
  }

  static async SignUp(req, res) {
    try {
      const user_token = await AuthService.register(req.body);
      res.status(201).json(user_token);
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json({ message: error.message || "INTERNAL SERVER ERROR" });
    }
  }
}
