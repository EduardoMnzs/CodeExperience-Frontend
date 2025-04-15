import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../assets/style/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    instituicao: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erro no cadastro. Por favor, tente novamente.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Crie sua conta <br></br> para o <span>Code!</span></h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-columns">
          {/* Coluna Esquerda */}
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Nome Completo:</label>
              <input
                className="form-input"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">CPF:</label>
              <input
                className="form-input"
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Instituição:</label>
              <input
                className="form-input"
                type="text"
                name="instituicao"
                value={formData.instituicao}
                onChange={handleChange}
                required
                placeholder="Nome da instituição"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Data de Nascimento:</label>
              <input
                className="form-input"
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Coluna Direita */}
          <div className="form-column">
            <div className="form-group">
              <label className="form-label">Email:</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Telefone:</label>
              <input
                className="form-input"
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Senha:</label>
              <div className="password-input-container">
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Crie uma senha"
                />
                <span 
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Confirmar Senha:</label>
              <div className="password-input-container">
                <input
                  className="form-input"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  placeholder="Confirme sua senha"
                />
                <span 
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="button-register-container">
          <button className="submit-button" type="submit">Cadastrar</button>
        </div>

        <div className="login-link">
          <span>Já tem uma conta? </span>
          <Link to="/login">Faça login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;