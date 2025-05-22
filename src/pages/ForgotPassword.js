import React, { useState } from 'react';
import { authAPI } from '../api/auth'; // ajuste o caminho se necessário
import '../assets/style/login.css'; // reutilize estilos existentes
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    try {
      await authAPI.forgotPassword(email);
      setMensagem('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
    } catch (error) {
      setErro('Erro ao enviar o e-mail. Verifique o endereço e tente novamente.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Esqueceu sua senha?</h2>

        {mensagem && <p className="success-message">{mensagem}</p>}
        {erro && <p className="error-message">{erro}</p>}

        <div className="form-group">
          <label className="form-label">Digite seu e-mail</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <button className="submit-button-login" type="submit">
          Enviar link de redefinição
        </button>

        <div className="create-account-link">
          <Link to="/login">Voltar para o login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
