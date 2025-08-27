import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../assets/style/about.css";

const About = () => {
    return (
        <div className="ce-about-page">
            <main className="ce-about-main">
                <div className="ce-about-content">
                    <h1 className="ce-about-title">Bem-vindo ao Bootcamp!</h1>
                    <p className="ce-about-text">
                        O Bootcamp é uma plataforma inovadora que visa proporcionar uma
                        experiência de aprendizado única e envolvente para estudantes de
                        programação. Nossa missão é ajudar você a desenvolver suas habilidades
                        de codificação e se preparar para o futuro.
                    </p>
                    <p className="ce-about-text">
                        Com uma variedade de exercícios práticos, desafios e recursos
                        interativos, o Bootcamp oferece um ambiente ideal para você
                        aprimorar suas habilidades e se tornar um desenvolvedor mais
                        confiante e preparado para o mercado.
                    </p>

                    <section className="ce-about-values">
                        <h2 className="ce-values-title">Nossos Valores</h2>
                        <ul className="ce-values-list">
                            <li className="ce-values-item">
                                <strong>Aprendizado prático:</strong> Foco em hands-on e projetos reais;
                            </li>
                            <li className="ce-values-item">
                                <strong>Comunidade colaborativa:</strong> Aprenda com e ensine outros desenvolvedores;
                            </li>
                            <li className="ce-values-item">
                                <strong>Acesso democrático:</strong> Conteúdo de qualidade para todos;
                            </li>
                            <li className="ce-values-item">
                                <strong>Atualização constante:</strong> Mantendo-se relevante com as últimas tecnologias.
                            </li>
                        </ul>
                    </section>

                    <section className="ce-about-credits">
                        <h2 className="ce-credits-title">Desenvolvimento</h2>
                        <div className="ce-credits-content">
                            <p className="ce-credits-text">
                                Este site foi desenvolvido como projeto do <strong>LPTECH</strong> para <strong>Unimar</strong> por <strong>Eduardo Menezes</strong>,
                                desenvolvedor full-stack da <strong>GaekWare</strong>.
                            </p>
                            <div className="ce-credits-links">
                                <a href="https://www.linkedin.com/in/edumnzs/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ce-social-link ce-social-link--linkedin"
                                    aria-label="LinkedIn">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://github.com/EduardoMnzs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ce-social-link ce-social-link--github"
                                    aria-label="GitHub">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer className="ce-about-footer">
                <p className="ce-footer-text">
                    © {new Date().getFullYear()} Bootcamp. Todos os direitos reservados.
                    <br />
                    Desenvolvido por Eduardo Menezes.
                </p>
            </footer>
        </div>
    );
};

export default About;