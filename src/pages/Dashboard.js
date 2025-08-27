import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { presencaAPI } from '../api/presenca';
import logo from '../assets/images/logo.png';
import '../assets/style/dashboard.css';
import { FaSignOutAlt } from 'react-icons/fa';
import Popup from '../components/Notification/Popup';
import RelatorioAlunos from '../components/RelatorioAlunos';

const Dashboard = () => {
    // Estados do componente
    const { user, logout } = useAuth();
    const [keyword, setKeyword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [isFormEnabled, setIsFormEnabled] = useState(false);

    // Obtém o primeiro nome do usuário para saudação
    const firstName = user?.nome?.split(' ')[0] || 'Aluno';

    // Função para fazer logout
    const handleLogout = () => {
        logout();
    };

    // Função para lidar com a submissão da palavra-chave
    const handleSubmitPresenca = async (e) => {
        e.preventDefault();
        if (!keyword) {
            setNotification({ message: 'Por favor, digite a palavra-chave.', type: 'error' });
            return;
        }

        try {
            // Supondo que a API espera um objeto com a palavra
            await presencaAPI.marcarPresenca({ palavra: keyword });
            setNotification({ message: 'Presença registrada com sucesso!', type: 'success' });
            setKeyword(''); // Limpa o campo após o sucesso
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Palavra-chave incorreta ou erro no servidor.';
            setNotification({ message: errorMessage, type: 'error' });
        }
    };

    // Hook para verificar o horário e habilitar o formulário de presença
    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const isWithinTime = hour >= 15 && hour < 20;
            setIsFormEnabled(isWithinTime);
        };

        checkTime(); // Verifica imediatamente ao carregar
        const interval = setInterval(checkTime, 60 * 1000); // Verifica a cada minuto

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    // Hook para limpar a notificação após alguns segundos
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 5000); // A notificação some após 5 segundos
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Funções e cálculos para a barra de progresso
    const calculateWorkingDays = (startDate, endDate) => {
        let count = 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        while (start <= end) {
            const day = start.getDay();
            if (day !== 0 && day !== 6) { // Ignora Domingo (0) e Sábado (6)
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
    const progressColor = progress === 100 ? 'rgb(65 208 127)' : '#3498db';

    return (
        <div className="code-experience-page">
            <header className="header">
                <nav className="header__nav_code-experience">
                    <Link to="/" className="header__logo-container">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </Link>
                    <div className="header__nav-links">
                        <button
                            onClick={() => setShowLogoutPopup(true)}
                            className="header__nav-link logout-button"
                        >
                            <FaSignOutAlt style={{ marginRight: '8px' }} /> Sair
                        </button>
                    </div>
                </nav>
            </header>

            {showLogoutPopup && (
                <Popup
                    message="Tem certeza que deseja sair?"
                    onConfirm={() => {
                        setShowLogoutPopup(false);
                        handleLogout();
                    }}
                    onCancel={() => setShowLogoutPopup(false)}
                />
            )}

            <main className="code-experience-container">
                <h1 className="code-experience-title">
                    Bem-vindo, {firstName}!
                </h1>

                {/* Seção da Barra de Progresso */}
                <div className="progress-section">
                    <h2>Progresso - Bootcamp</h2>
                    <h1 style={{ color: progressColor }}>{progress}% Completo</h1>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%`, background: progressColor }}></div>
                    </div>
                </div>

                <div className="divider"></div>

                {/* Seção de Registro de Presença */}
                <div className="keyword-section">
                    <h3>Registrar Presença</h3>
                    <form onSubmit={handleSubmitPresenca}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder={isFormEnabled ? "Digite a palavra-chave do dia" : "Fora do horário de registro"}
                            disabled={!isFormEnabled}
                        />
                        <button type="submit" disabled={!isFormEnabled}>
                            Confirmar Presença
                        </button>
                    </form>
                    {notification.message && (
                        <div className={`notification ${notification.type}`}>
                            {notification.message}
                        </div>
                    )}
                </div>

                <div className="divider"></div>

                {/* Componente de Relatório de Alunos */}
                <RelatorioAlunos />
            </main>
        </div>
    );
};

export default Dashboard;