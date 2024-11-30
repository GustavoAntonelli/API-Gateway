import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  console.log('Autenticaçao chamada')
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token não fornecido.");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send("Token inválido.");
      req.user = user;
      next();
  });
}

export default authenticateToken