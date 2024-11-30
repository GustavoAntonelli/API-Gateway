import jwt from "jsonwebtoken";

const jwtService = {
  generateJWT: (uid, email) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = { uid, email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
  }
}

export default jwtService