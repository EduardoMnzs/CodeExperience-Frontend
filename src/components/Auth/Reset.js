import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../assets/style/login.css';

const API_URL = process.env.REACT_APP_API_URL;

const Reset = () => {
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      setErro('Erro de configuração: A URL da API não foi definida. Verifique o arquivo .env.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, {
        novaSenha,
      });
      setMensagem(res.data.message);
      setErro('');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao redefinir senha');
      setMensagem('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Redefinir Senha</h2>

        {mensagem && <p className="success-message">{mensagem}</p>}
        {erro && <p className="error-message">{erro}</p>}

        <div className="form-group">
          <label className="form-label">Nova Senha</label>
          <div className="password-input-container">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
              placeholder="Digite sua nova senha"
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Confirmar Senha</label>
          <input
            className="form-input"
            type={showPassword ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            placeholder="Confirme a nova senha"
          />
        </div>

        <button className="submit-button-login" type="submit">
          Redefinir Senha
        </button>
      </form>
    </div>
  );
};

export default Reset;