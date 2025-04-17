import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import docs from '../assets/icons/docs.png';
import '../assets/style/codeexperience.css';

const CodeExperience = () => {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Palavra-chave enviada: ${keyword}`);
        setKeyword('');
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

    return (
        <div className="code-experience-page">
            {/* Header mantido conforme seu código original */}
            <header className="header">
                <nav className="header__nav">
                    <Link to="/" className="header__logo-container">
                        <img src={logo} alt="Logo" className="header__logo" />
                    </Link>
                </nav>
            </header>

            {/* Conteúdo principal da página Code Experience */}
            <main className="code-experience-container">
                <h1 className="code-experience-title">Bem Vindo! Aluno</h1>

                <div className="progress-section">
                    <h2>Progresso - Code Experience</h2>
                    <h1 style={{color: `${progressColor}`}} >{progress}% Completo</h1>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%`, background: `${progressColor}` }}></div>
                    </div>
                </div>

                <div className="exercises-section">
                    <h3>Exercícios de Fixação</h3>

                    <div className="exercise-cards">
                        {/* Exercícios Básicos */}
                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='básico 1'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Básico I</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>

                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='básico 2'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Básico II</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>

                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='básico 3'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Básico III</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>

                        {/* Exercícios Intermediários */}
                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='Intermediário 1'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Intermediário I</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>

                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='Intermediário 1'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Intermediário II</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>

                        <div className="exercise-card">
                            <div className='exercise-card-img'>
                                <img className='img-docs' src={docs} alt='Intermediário 1'></img>
                            </div>
                            <div className='exercise-card-text'>
                                <h4>Intermediário III</h4>
                                <p>Tenha acesso a exercícios básicos de programação em Python para iniciar do jeito certo.</p>
                            </div>
                        </div>
                    </div>
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
                            disabled
                        />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CodeExperience;