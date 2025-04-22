import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import '../../assets/style/register.css';
import { formatCPF, formatPhone } from '../../utils/formatters';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    dataNascimento: '',
    instituicaoId: '',
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [escolas, setEscolas] = useState([]);
  const [loadingEscolas, setLoadingEscolas] = useState(true);
  const [confirmacaoError, setConfirmacaoError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarEscolas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/escolas`);
        setEscolas(response.data);
      } catch (error) {
        console.error('Erro ao carregar escolas:', error);
        setError('Não foi possível carregar a lista de escolas');
      } finally {
        setLoadingEscolas(false);
      }
    };

    carregarEscolas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setFormData(prev => ({
        ...prev,
        [name]: formatCPF(value)
      }));
    } else if (name === 'telefone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhone(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (name === 'senha' || name === 'confirmarSenha') {
      if (formData.senha && formData.confirmarSenha) {
        if (name === 'senha' && value !== formData.confirmarSenha) {
          setConfirmacaoError('As senhas não coincidem');
        } else if (name === 'confirmarSenha' && value !== formData.senha) {
          setConfirmacaoError('As senhas não coincidem');
        } else {
          setConfirmacaoError('');
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }
  
    try {
      const userData = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ''),
        telefone: formData.telefone.replace(/\D/g, ''),
        data_nascimento: formData.dataNascimento,
        instituicao_id: parseInt(formData.instituicaoId),
        senha: formData.senha
      };
  
      console.log('Enviando dados:', userData);
      await register(userData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no cadastro. Por favor, tente novamente.');
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
                maxLength={14}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                inputMode="numeric"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Instituição:</label>
              {loadingEscolas ? (
                <div className="loading-text">Carregando instituições...</div>
              ) : (
                <select
                  className="form-input"
                  name="instituicaoId"
                  value={formData.instituicaoId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione sua instituição</option>
                  {escolas.map(escola => (
                    <option key={escola.id} value={escola.id}>
                      {escola.nome}
                    </option>
                  ))}
                </select>
              )}
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
                max={new Date().toISOString().split('T')[0]} 
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
                maxLength={15}
                pattern="\(\d{2}\) \d{4,5}-\d{4}"
                inputMode="tel"
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
                  className={`form-input ${confirmacaoError ? 'input-error' : ''}`}
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
              {confirmacaoError && (
                <p className="error-text">{confirmacaoError}</p>
              )}
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