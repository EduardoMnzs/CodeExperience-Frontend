import React from 'react';
import '../../assets/style/home/AboutSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';

const AboutSection = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        <h2 className="about-title">Sobre o Evento</h2>
        <p className="about-description">
          O Bootcamp é um evento criado por apaixonados por tecnologia que acreditam no poder 
          transformador da programação. Nosso objetivo é desmistificar o mundo da codificação e 
          inspirar estudantes do ensino médio a explorarem carreiras em tecnologia. Vamos juntos 
          construir o futuro digital!
        </p>

        <div className="about-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>
            <div className="stat-number">1000+</div>
            <div className="stat-label">Estudantes Impactados</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUserGraduate} />
            </div>
            <div className="stat-number">3+</div>
            <div className="stat-label">Edições Realizadas</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-number">30+</div>
            <div className="stat-label">Mentores Voluntários</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;