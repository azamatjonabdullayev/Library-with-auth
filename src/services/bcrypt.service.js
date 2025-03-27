import bcrypt from "bcrypt";

export default class BcryptService {
  static async hashPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  static async comparePasswords(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}
