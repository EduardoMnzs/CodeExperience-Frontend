// src/components/ExerciseCards.js
import React from 'react';
import docs from '../../assets/icons/docs.png';
import { format, parseISO, isAfter, addDays } from 'date-fns';
import basico1 from '../../components/pdfs/basico1.pdf';
import basico2 from '../../components/pdfs/basico2.pdf';
import basico3 from '../../components/pdfs/basico3.pdf';
import intermediario1 from '../../components/pdfs/intermediario1.pdf';
import intermediario2 from '../../components/pdfs/intermediario2.pdf';
import intermediario3 from '../../components/pdfs/intermediario3.pdf';
import avancado1 from '../../components/pdfs/avancado1.pdf';
import avancado2 from '../../components/pdfs/avancado2.pdf';
import avancado3 from '../../components/pdfs/avancado3.pdf';
import desafio from '../../components/pdfs/desafio.pdf';

const ExerciseCards = () => {
  // Data de início do curso
  const courseStartDate = '2025-08-25';
  
  // Mapeamento de PDFs para cada exercício
  const pdfPaths = {
    1: basico1,
    2: basico2,
    3: basico3,
    4: intermediario1,
    5: intermediario2,
    6: intermediario3,
    7: avancado1,
    8: avancado2,
    9: avancado3,
    10: desafio,
  };

  const exerciseData = [
  {
    level: 'Básico',
    items: [
      {
        id: 1,
        title: 'Básico I',
        description: 'Atividade introdutória para iniciar a prática em programação.',
        unlockDay: 2
      },
      {
        id: 2,
        title: 'Básico II',
        description: 'Exercício para reforçar os primeiros conceitos e comandos.',
        unlockDay: 4
      },
      {
        id: 3,
        title: 'Básico III',
        description: 'Prática com situações simples para ganhar confiança.',
        unlockDay: 5
      }
    ]
  },
  {
    level: 'Intermediário',
    items: [
      {
        id: 4,
        title: 'Intermediário I',
        description: 'Desafio com foco em organizar melhor as soluções.',
        unlockDay: 6
      },
      {
        id: 5,
        title: 'Intermediário II',
        description: 'Atividade que exige maior atenção aos detalhes.',
        unlockDay: 7
      },
      {
        id: 6,
        title: 'Intermediário III',
        description: 'Exercício que estimula o raciocínio em etapas.',
        unlockDay: 8
      }
    ]
  },
  {
    level: 'Avançado',
    items: [
      {
        id: 7,
        title: 'Avançado I',
        description: 'Tarefa com múltiplas possibilidades de resolução.',
        unlockDay: 9
      },
      {
        id: 8,
        title: 'Avançado II',
        description: 'Exercício mais complexo que simula um problema real.',
        unlockDay: 10
      },
      {
        id: 9,
        title: 'Avançado III',
        description: 'Desafio com foco em lógica e organização do pensamento.',
        unlockDay: 11
      }
    ]
  },
  {
    level: 'Desafio',
    items: [
      {
        id: 10,
        title: 'Desafio Final',
        description: 'Atividade final para aplicar tudo o que foi aprendido.',
        unlockDay: 12
      }
    ]
  }
];

  const isExerciseUnlocked = (unlockDay) => {
    const today = new Date();
    const unlockDate = addDays(parseISO(courseStartDate), unlockDay - 1);
    return isAfter(today, unlockDate);
  };

  const handleDownload = (exerciseId) => {
    if (!isExerciseUnlocked(exerciseData.flatMap(c => c.items).find(e => e.id === exerciseId).unlockDay)) {
      return;
    }
    
    const pdfPath = pdfPaths[exerciseId];
    if (pdfPath) {
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = `exercicio-${exerciseId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="exercise-cards">
      {exerciseData.map((category) => (
        <React.Fragment key={category.level}>
          {category.items.map((exercise) => {
            const isUnlocked = isExerciseUnlocked(exercise.unlockDay);
            
            return (
              <div 
                className={`exercise-card ${!isUnlocked ? 'locked' : ''}`}
                key={exercise.id}
                onClick={() => isUnlocked && handleDownload(exercise.id)}
                style={{ cursor: isUnlocked ? 'pointer' : 'default' }}
              >
                <div className='exercise-card-img'>
                  <img 
                    className='img-docs' 
                    src={docs} 
                    alt={exercise.title} 
                    style={!isUnlocked ? { opacity: 0.5 } : {}} 
                  />
                  {!isUnlocked && (
                    <div className="lock-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className='exercise-card-text'>
                  <h4>{exercise.title}</h4>
                  <p>{exercise.description}</p>
                  {isUnlocked ? (
                    <div className="unlock-info unlocked">
                      Disponível - Clique para baixar
                    </div>
                  ) : null}
                  {!isUnlocked && (
                    <div className="unlock-info">
                      Disponível em {format(
                        addDays(parseISO(courseStartDate), exercise.unlockDay - 1), 
                        'dd/MM/yyyy'
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExerciseCards;