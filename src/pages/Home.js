import React from 'react';
import '../assets/style/home.css';
import frascoAzul from '../assets/images/frascoAzul.png';
import experiencia from '../assets/images/experiencia.png';
import python from '../assets/images/python.png';
import presente from '../assets/images/presentes.png';

const Home = () => {
  return (
    <div className="background-container">
      <div className="home-container">
        <div className="content-wrapper">
          {/* Seção esquerda com texto e imagens */}
          <div className="left-section">
            <h1 className="main-title">Seu Primeiro Passo <br></br> no Mundo da Programação!</h1>
            <p className="subtitle">Uma jornada divertida e descomplicada para <br></br> aprender Python e despertar seu potencial tech.</p>

            <div className="image-row">
              <div className="image-container">
                <img
                  src={experiencia}
                  alt="imagem de experiência"
                  className="feature-image"
                />
                <p className="image-description">Experiência</p>
              </div>
              <div className="image-container">
                <img
                  src={python}
                  alt="imagem de python"
                  className="feature-image"
                />
                <p className="image-description">Python</p>
              </div>
              <div className="image-container">
                <img
                  src={presente}
                  alt="imagem de presente"
                  className="feature-image"
                />
                <p className="image-description">Recompensas</p>
              </div>
            </div>

            <div className='button-container'>
              <button className="action-button">
                Vamos Começar!
              </button>
            </div>
          </div>

          {/* Seção direita com a imagem principal */}
          <div className="right-section">
            <img
              src={frascoAzul}
              alt="Imagem principal"
              className="main-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;