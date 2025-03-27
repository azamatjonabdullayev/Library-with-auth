import pool from "../config/db.config.js";
import BcryptService from "./bcrypt.service.js";
import JWTservice from "./jwt.service.js";

export default class AuthService {
  static async login({ username, password }) {
    const { rows: users, rowCount } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (!rowCount)
      throw { err_status: 401, message: "Invalid username or password!" };

    const compare = await BcryptService.comparePasswords(
      password,
      users[0].password
    );

    if (!compare)
      throw { err_status: 401, message: "Invalid username or password!" };

    return {
      token: JWTservice.Sign({
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        role: users[0].role,
      }),
      user: {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        role: users[0].role,
      },
    };
  }

  static async register({ username, password, email, role = "user" }) {
    const { rowCount } = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (rowCount) {
      throw {
        err_status: 409,
        message: "Username or email are already in use!",
      };
    }

    const hashedPassword = await BcryptService.hashPassword(password);

    const { rows: newUser } = await pool.query(
      "INSERT INTO users(username, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, username, email, role",
      [username, email, hashedPassword, role]
    );

    return {
      token: JWTservice.Sign(newUser[0]),
      user: {
        ...newUser[0],
      },
    };
  }
}
