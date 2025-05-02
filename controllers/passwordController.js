// routes/passwordResetRequest.js
const crypto = require('crypto');
const pool = require('../config/db');
const nodemailer = require('nodemailer');

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'E-mail não encontrado' });
    }

    const user = users[0];
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await pool.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [
      token,
      tokenExpires,
      user.id
    ]);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
      },
    });

    const resetLink = `https://agrosense-kappa.vercel.app/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'seuemail@gmail.com',
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; text-align: center;">
          <h2 style="color: #333;">Recuperação de Senha</h2>
          <p style="font-size: 16px; color: #555;">Para redefinir sua senha, clique no link abaixo:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #318A84; color: white; text-decoration: none; font-size: 16px; border-radius: 5px; margin: 10px 0;">
            Redefinir Senha
          </a>
          <p style="font-size: 14px; color: #777;">Esse link expira em 1 hora.</p>
          <div style="margin-top: 20px; font-size: 12px; color: #999;">
            <p>Se você não solicitou a recuperação de senha, ignore este e-mail.</p>
          </div>
        </div>
      `,
    });
    

    res.json({ message: 'E-mail de recuperação enviado com sucesso' });
  } catch (err) {
    console.error('Erro ao solicitar recuperação de senha:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};


// routes/resetPassword.js
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );
    console.log("Resultado da consulta:", users)
    if (users.length === 0) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
      [hashedPassword, users[0].id]
    );

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    console.error('Erro ao redefinir senha:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = { resetPassword ,requestPasswordReset};

