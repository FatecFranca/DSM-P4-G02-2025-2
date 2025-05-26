const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return res.status(401).json({ error: "Token expirado." });
    }
    
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expirado." });
    }
    
    return res.status(401).json({ error: "Token inválido." });
  }
};

module.exports = authMiddleware;