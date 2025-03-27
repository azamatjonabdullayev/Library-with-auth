import jwt from "jsonwebtoken";

export default class JWTservice {
  static Sign(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "90m" });
  }

  static Verify(token) {
    return jwt.verify(token, process.env.JWT_KEY);
  }
}
