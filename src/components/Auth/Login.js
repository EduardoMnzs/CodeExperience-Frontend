import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../assets/style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, senha });
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    if (user) {
      navigate(user.role === 'Admin' ? '/dashboard' : '/codeexperience');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Faça Login <br></br>
          na sua conta</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Senha</label>
          <div className="password-input-container">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className='container-links'>
            <div className="forgot-password">
              <Link to="/forgot-password">Esqueceu a senha?</Link>
            </div>
            <div className="create-account">
              <span>Não tem conta? </span><br></br>
              <Link to="/register">Criar conta</Link>
            </div>
          </div>
        </div>

        <button className="submit-button-login" type="submit">Entrar</button>

        <div className="saiba-mais">
          <span>Não conhece o Code Experience?</span>
          <Link to="/about"> Saiba mais</Link>
        </div>

      </form>
    </div>
  );
};

export default Login;