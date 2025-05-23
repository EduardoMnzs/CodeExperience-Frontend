import React from 'react';
import '../assets/style/home.css';
import frascoAzul from '../assets/images/frascoAzul.png';
// import aluno from '../assets/images/aluno.png';
// import medalha1 from '../assets/images/medalha1.png';
// import medalha2 from '../assets/images/medalha2.png';
// import medalha3 from '../assets/images/medalha3.png';
// import estrelas from '../assets/images/estrela.png';
// import certificado from '../assets/images/certificado.png';
import AboutSection from '../components/home/AboutSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCheck,
  faCalendarAlt,
  faMapMarkerAlt,
  faClock,
  faUsers,
  faLaptopCode,
  faTrophy,
  faGraduationCap,
  faStar,
  faShareAlt
} from '@fortawesome/free-solid-svg-icons';
// import ImageCarousel from '../components/home/ImageCarousel';


const Home = () => {

  // const eventImages = [
  //   certificado,
  //   certificado,
  //   certificado,
  //   certificado,
  // ];

  return (
    <div className="background-container">
      <div className="home-container">
        {/* Hero Section */}
        <div className="content-wrapper">
          <div className="left-section">
            <h1 className="main-title">
              <span className="highlight">Code Experience</span><br />
              Seu primeiro contato com o mundo da programação!
            </h1>
            <p className="subtitle">
              Um evento <span className="bold">100% gratuito</span> e <span className="bold">super divertido</span> para estudantes do ensino médio descobrirem o incrível mundo da tecnologia
            </p>

            <div className="benefits-container">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faLaptopCode} />
                </div>
                <div className="benefit-text">
                  <h3>Workshops de Python</h3>
                  <p>Aprenda o básico de programação de forma descomplicada</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className="benefit-text">
                  <h3>Networking incrível</h3>
                  <p>Conecte-se com outros jovens apaixonados por tech</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="benefit-text">
                  <h3>Competição divertida</h3>
                  <p>Desafios com prêmios e muita diversão</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <button className="action-button">
                Quero me inscrever! <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
              <div className="small-text">
                <FontAwesomeIcon icon={faStar} />
                <span> Evento limitado a 500 vagas - Garanta já a sua!</span>
              </div>
            </div>
          </div>

          <div className="right-section">
            <div className="image-wrapper">
              <img
                src={frascoAzul}
                alt="Ilustração do evento Hackathon Teen"
                className="main-image"
              />
              <div className="floating-badge">
                <FontAwesomeIcon icon={faGraduationCap} />
                <span>Para estudantes do ensino médio</span>
              </div>
            </div>
          </div>
        </div>

        <AboutSection />

        {/* Event Info Section */}
        <div className="testimonials-section">
          <h2>Detalhes do <span className="highlight">Evento</span></h2>

          <div className="event-details-grid">
            <div className="testimonial-card">
              <div className="event-detail-header">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} className="event-detail-icon" />
                </div>
                <h3 className="event-detail-title">Quando?</h3>
              </div>
              <p className="event-detail-content">
                05 de Maio de 2025
              </p>
              <p className="event-detail-subcontent">
                Das 18h às 19h30 - Horário de Brasília
              </p>
            </div>

            <div className="testimonial-card">
              <div className="event-detail-header">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="event-detail-icon" />
                </div>
                <h3 className="event-detail-title">Onde?</h3>
              </div>
              <p className="event-detail-content">
                UNIMAR - Universidade de Marília
              </p>
              <p className="event-detail-subcontent">
                Av. Higino Muzi Filho, 1001 - Bloco 4
              </p>
            </div>

            <div className="testimonial-card">
              <div className="event-detail-header">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faClock} className="event-detail-icon" />
                </div>
                <h3 className="event-detail-title">O que levar?</h3>
              </div>
              <ul className="event-detail-list">
                <li>Muita energia e criatividade;</li>
                <li>Amigos (opcional, mas mais divertido!).</li>
              </ul>
            </div>
          </div>
          {/* <h2>Galeria de <span className="highlight">Fotos</span></h2>
          <p className="subtitle">
            Esses são alguns dos momentos mais legais do nosso evento passado!<br />
            Venha fazer parte dessa experiência incrível e registre seus melhores momentos com a gente!
          </p> */}
        </div>

        {/* <ImageCarousel images={eventImages} /> */}

        {/* Prizes Section */}
        {/* <div className="testimonials-section">
          <h2>Premiação para os <span className="highlight">destaques</span></h2>
          <p className="subtitle">
            Os alunos que se destacarem serão premiados e todos ganham brindes!
          </p>

          <div className="prizes-grid">
            <div className="prize-card">
              <img src={medalha1} alt="Troféu" className="prize-icon rotated" />
              <h3>1º Lugar</h3>
              <ul className="prize-list">
                <li>Kit Arduino completo</li>
                <li>Curso de Python avançado</li>
                <li>Mentoria com profissionais</li>
              </ul>
            </div>

            <div className="prize-card">
              <img src={medalha2} alt="Troféu" className="prize-icon rotated" />
              <h3>2º Lugar</h3>
              <ul className="prize-list">
                <li>Fone Bluetooth premium</li>
                <li>Assinatura de plataforma</li>
                <li>Livros de programação</li>
              </ul>
            </div>

            <div className="prize-card">
              <img src={medalha3} alt="Troféu" className="prize-icon rotated" />
              <h3>3º Lugar</h3>
              <ul className="prize-list">
                <li>Mouse gamer</li>
                <li>Camiseta exclusiva</li>
                <li>Acesso a comunidade</li>
              </ul>
            </div>

            <div className="prize-card">
              <img src={estrelas} alt="Troféu" className="prize-icon" />
              <h3>Todos ganham</h3>
              <ul className="prize-list">
                <li>Certificado digital</li>
                <li>Acesso a materiais</li>
                <li>Brindes surpresa</li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Testimonials from Previous Events */}
        {/* <div className="testimonials-section">
          <h2>O que acham do <span className="highlight">nosso evento</span></h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="student-info">
                <img src={aluno} alt="Estudante João" className="student-avatar" />
                <div>
                  <h3 className="student-name">João Lucas, 16 anos</h3>
                  <span className="student-detail">Participante 2023</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Nunca imaginei que programar pudesse ser tão divertido! O evento me mostrou que quero trabalhar com tecnologia no futuro."
              </p>
              <div className="testimonial-rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>

            <div className="testimonial-card">
              <div className="student-info">
                <img src={aluno} alt="Estudante Maria" className="student-avatar" />
                <div>
                  <h3 className="student-name">Maria Eduarda, 17 anos</h3>
                  <span className="student-detail">Participante 2024</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Ganhamos o hackathon e isso mudou tudo! Agora faço parte de um programa de jovens talentos em uma empresa de tecnologia."
              </p>
              <div className="testimonial-rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>

            <div className="testimonial-card">
              <div className="student-info">
                <img src={aluno} alt="Estudante Carlos" className="student-avatar" />
                <div>
                  <h3 className="student-name">Carlos, 15 anos</h3>
                  <span className="student-detail">Participante online</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Mesmo participando de casa foi incrível! Aprendi muito e fiz amigos que também gostam de programação."
              </p>
              <div className="testimonial-rating">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
            </div>
          </div>
        </div> */}

        {/* Final CTA Section */}
        <div className="testimonials-section">
          <h2>Vai ficar de fora dessa?</h2>
          <p className="subtitle">
            Vagas limitadas! Inscreva-se agora gratuitamente
          </p>

          <div className="final-cta-container">
            <button className="action-button large">
              Quero participar! <FontAwesomeIcon icon={faArrowRight} />
            </button>

            <button className="share-button">
              <FontAwesomeIcon icon={faShareAlt} />
              Compartilhar
            </button>
            <p className="small-text">
              Chame seus amigos para participar juntos!
            </p>

            <p className="guarantee-text">
              <FontAwesomeIcon icon={faCheck} />
              Evento 100% gratuito - Não cobramos nada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;