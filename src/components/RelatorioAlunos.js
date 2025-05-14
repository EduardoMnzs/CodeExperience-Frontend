import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/style/RelatorioAlunos.css';

const RelatorioAlunos = () => {
    const [alunos, setAlunos] = useState([]);
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const carregarRelatorio = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/export`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAlunos(response.data.alunos);
                setTotalAlunos(response.data.totalAlunos);
            } catch (error) {
                console.error('Erro ao carregar relatório:', error);
                setErro('Erro ao carregar os dados do relatório.');
            } finally {
                setLoading(false);
            }
        };

        carregarRelatorio();
    }, [token]);

    const exportarCSV = () => {
        const headers = ['Nome', 'Email', 'Telefone', 'Escola', 'Presenças'];
        const linhas = alunos.map(a => [
            a.nome,
            a.email,
            a.telefone,
            a.escola,
            a.presencas
        ]);

        const csv = [
            headers.join(','),
            ...linhas.map(linha => linha.join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'relatorio_alunos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <p>Carregando dados...</p>;
    if (erro) return <p>{erro}</p>;

    return (
        <div className="relatorio-container">
            <h2 className="relatorio-title">Relatório de Alunos</h2>
            <p className="relatorio-info">Total de Alunos: {totalAlunos}</p>
            <button className="relatorio-button" onClick={exportarCSV}>Exportar CSV</button>
            <div className="relatorio-tabela-wrapper">
                <table className="relatorio-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Escola</th>
                            <th>Presenças</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map((aluno, index) => (
                            <tr key={index}>
                                <td data-label="Nome">{aluno.nome}</td>
                                <td data-label="Email">{aluno.email}</td>
                                <td data-label="Telefone">{aluno.telefone}</td>
                                <td data-label="Escola">{aluno.escola}</td>
                                <td data-label="Presenças">{aluno.presencas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RelatorioAlunos;
