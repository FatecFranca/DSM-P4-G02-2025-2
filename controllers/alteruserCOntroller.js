/* eslint-disable no-undef */
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const updateUser = async (req, res) => {
  const { email: newEmail, password: newPassword, oldPassword } = req.body;
  const userId = req.user.userId;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = users[0];
    const updates = [];
    const responseData = {};

    if (newEmail && newEmail.trim().toLowerCase() !== user.email) {
      const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [newEmail]);
      
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "E-mail já está em uso" });
      }
      
      await pool.query('UPDATE users SET email = ? WHERE id = ?', [newEmail.trim().toLowerCase(), userId]);
      updates.push('email');
      responseData.newEmail = newEmail;
    }

    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ error: "É necessário informar a senha atual para alterá-la" });
      }

      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
      
      if (!isOldPasswordValid) {
        return res.status(401).json({ error: "Senha atual incorreta" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);
      updates.push('senha');
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "Nenhum dado fornecido para atualização" });
    }

    res.json({ 
      message: "Dados atualizados com sucesso",
      updates: updates,
      ...responseData
    });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor. Tente novamente mais tarde." });
  }
};

module.exports = { updateUser };