const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db'); 

const JWT_SECRET = process.env.JWT_SECRET ; 

const registerUser = async (req, res) => {
  const { 
    email: rawEmail, 
    password: rawPassword, 
    firstName: rawFirstName, 
    lastName: rawLastName 
  } = req.body;

  const email = rawEmail.trim().toLowerCase();
  const password = rawPassword.trim();
  const firstName = rawFirstName.trim();
  const lastName = rawLastName.trim();

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
  }

  try {
    const [existingUser] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        error: "Este e-mail já está cadastrado. Utilize outro e-mail ou faça login."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `INSERT INTO users 
      (email, password_hash, first_name, last_name) 
      VALUES (?, ?, ?, ?)`,
      [email, passwordHash, firstName, lastName]
    );

    const token = jwt.sign(
      { 
        userId: result.insertId,
        email: email,
        firstName: firstName,
        lastName: lastName
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      token: token,
      user: {
        id: result.insertId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        error: "Este e-mail já está cadastrado"
      });
    }

    return res.status(500).json({ 
      error: "Erro interno no servidor. Tente novamente mais tarde."
    });
  }
};

module.exports = { registerUser };