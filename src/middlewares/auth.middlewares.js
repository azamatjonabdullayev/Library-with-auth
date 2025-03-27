import JWTservice from "../services/jwt.service.js";

export const AuthGuard = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw { err_status: 401, message: "Unauthorized" };

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw { err_status: 401, message: "Unauthorized" };

    const verifyToken = JWTservice.Verify(token);

    req.user = verifyToken;

    next();
  } catch (error) {
    res
      .status(error.err_status || 500)
      .json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};

export const AuthGuardAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw { err_status: 401, message: "Unauthorized" };

    const verifyToken = JWTservice.Verify(token);

    if (!verifyToken) throw { err_status: 401, message: "Invalid token" };

    if (verifyToken.role !== "admin")
      throw { err_status: 403, message: "Forbidden" };

    req.user = verifyToken;

    next();
  } catch (error) {
    res
      .status(error.err_status || 500)
      .json({ error: error.message || "INTERNAL SERVER ERROR" });
  }
};
