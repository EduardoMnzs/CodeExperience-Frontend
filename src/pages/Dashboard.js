import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';
import '../assets/style/dashboard.css';
import { presencaAPI } from '../api/presenca';
import { FaSignOutAlt } from 'react-icons/fa';
import Popup from '../components/Notification/Popup';
import RelatorioAlunos from '../components/RelatorioAlunos';

const Dashboard = () => {
    const [keyword, setKeyword] = useState('');
    const { user, logout } = useAuth();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [showPopup, setShowPopup] = useState(false);
    const [keywordPlaceholder, setKeywordPlaceholder] = useState('Carregando...');

    const firstName = user?.nome?.split(' ')[0] || 'Aluno';

    const handleLogout = () => {
        logout();
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
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
    const [, setErro] = useState(null);

    const [inputHabilitado, setInputHabilitado] = useState(false);
    const [buttonHabilitado, setButtonHabilitado] = useState(false);

    useEffect(() => {
        const verificarHorario = () => {
            const agora = new Date();
            const hora = agora.getHours();
            const minuto = agora.getMinutes();

            // Ajuste o horário conforme necessário aqui
            const dentroDoHorario = ((hora >= 13 && hora < 20) || (hora === 18 && minuto === 30));

            setInputHabilitado(dentroDoHorario);
            setButtonHabilitado(dentroDoHorario);
        };

        verificarHorario();
        const intervalo = setInterval(verificarHorario, 60 * 1000);

        return () => clearInterval(intervalo);
    }, []);

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

    useEffect(() => {
        const fetchKeyword = async () => {
            try {
                const response = await presencaAPI.secretKey();
                setKeywordPlaceholder(response.data.palavra || 'Palavra não disponível');
            } catch (error) {
                setKeywordPlaceholder('Erro ao carregar');
                console.error('Erro ao buscar palavra-chave:', error);
            }
        };

        fetchKeyword();
    }, []);

    return (
        <div className="code-experience-page">
            <header className="header">
                <nav className="header__nav_code-experience">
                    <Link to="/" className="header__logo-container">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </Link>
                    <div className="header__nav-links">
                        <button
                            onClick={() => setShowPopup(true)}
                            className="header__nav-link logout-button"
                        >
                            <FaSignOutAlt style={{ marginRight: '8px' }} /> Sair
                        </button>
                    </div>
                </nav>
            </header>

            {showPopup && (
                <Popup
                    message="Tem certeza que deseja sair?"
                    onConfirm={() => {
                        setShowPopup(false);
                        handleLogout();
                    }}
                    onCancel={() => setShowPopup(false)}
                />
            )}

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

                <div className="divider"></div>

                <RelatorioAlunos />

                <div className="keyword-section">
                    <h3>Palavra-chave do dia</h3>
                    <form>
                        <input
                            type="text"
                            value={keyword}
                            placeholder={keywordPlaceholder}
                            disabled
                        />
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;