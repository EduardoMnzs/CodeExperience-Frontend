import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import '../assets/style/codeexperience.css';
import ExerciseCards from '../components/Exercises/ExerciseCards';

const CodeExperience = () => {
    const [keyword, setKeyword] = useState('');
    const { user, logout } = useAuth();

    const firstName = user?.nome?.split(' ')[0] || 'Aluno';

    const handleLogout = () => {
        logout();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!keyword || !localizacao.latitude || !localizacao.longitude) {
          alert('Preencha a palavra-chave e permita a localização!');
          return;
        }
      
        try {
          const apiUrl = process.env.REACT_APP_API_BASE_URL;
          const token = localStorage.getItem('token');
      
          const response = await fetch(`${apiUrl}/presenca`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              palavraChave: keyword,
              latitude: localizacao.latitude,
              longitude: localizacao.longitude
            })
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert('Presença registrada com sucesso!');
          } else {
            alert(`Erro: ${data.error || 'Não foi possível registrar presença'}`);
          }
      
          setKeyword('');
        } catch (error) {
          console.error(error);
          alert('Erro ao registrar presença.');
        }
      };

    const calculateWorkingDays = (startDate, endDate) => {
        let count = 0;
        const start = new Date(startDate);
        const end = new Date(endDate);

        while (start <= end) {
            const day = start.getDay();
            if (day !== 0 && day !== 6) {
                count++;
            }
            start.setDate(start.getDate() + 1);
        }
        return count;
    };

    const calculateProgress = () => {
        const startDate = '2025-05-05';
        const endDate = '2025-05-17';
        const today = new Date();

        if (today < new Date(startDate)) return 0;

        if (today > new Date(endDate)) return 100;

        const totalDays = calculateWorkingDays(startDate, endDate);
        const elapsedDays = calculateWorkingDays(startDate, today.toISOString().split('T')[0]);

        return Math.min(100, Math.round((elapsedDays / totalDays) * 100));
    };

    const progress = calculateProgress();

    let progressColor = '#3498db';
    if (progress === 100) {
        progressColor = 'rgb(65 208 127)';
    }

    const [localizacao, setLocalizacao] = useState({ latitude: null, longitude: null });
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocalizacao({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setErro(error.message);
                }
            );
        } else {
            setErro('Geolocalização não é suportada neste navegador.');
        }
    }, []);

    return (
        <div className="code-experience-page">
            <h2>Sua Localização:</h2>
            {localizacao.latitude && localizacao.longitude ? (
                <p>Latitude: {localizacao.latitude}, Longitude: {localizacao.longitude}</p>
            ) : erro ? (
                <p>Erro: {erro}</p>
            ) : (
                <p>Carregando localização...</p>
            )}
            <header className="header">
                <nav className="header__nav">
                    <Link to="/" className="header__logo-container">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </Link>
                    <div className="header__nav-links">
                        <Link onClick={handleLogout} to="/login" className="header__nav-link">Sair</Link>
                    </div>
                </nav>
            </header>

            <main className="code-experience-container">
                <h1 className="code-experience-title">
                    Bem Vindo, {firstName}!
                </h1>

                <div className="progress-section">
                    <h2>Progresso - Code Experience</h2>
                    <h1 style={{ color: `${progressColor}` }} >{progress}% Completo</h1>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%`, background: `${progressColor}` }}></div>
                    </div>
                </div>

                <div className="exercises-section">
                    <h3>Exercícios de Fixação</h3>
                    <ExerciseCards />
                </div>

                <div className="divider"></div>

                <div className="keyword-section">
                    <h3>Palavra-chave do dia</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Indisponível"
                            
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CodeExperience;