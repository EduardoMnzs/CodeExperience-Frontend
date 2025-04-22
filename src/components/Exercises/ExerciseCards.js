// src/components/ExerciseCards.js
import React from 'react';
import docs from '../../assets/icons/docs.png';
import { format, parseISO, isAfter, addDays } from 'date-fns';

const ExerciseCards = () => {
  // Data de início do curso
  const courseStartDate = '2025-04-22';
  
  const exerciseData = [
    {
      level: 'Básico',
      items: [
        {
          id: 1, 
          title: 'Básico I', 
          description: 'Introdução à sintaxe Python e conceitos básicos.',
          unlockDay: 1
        },
        {
          id: 2, 
          title: 'Básico II', 
          description: 'Estruturas de controle e funções básicas.',
          unlockDay: 3
        },
        {
          id: 3, 
          title: 'Básico III', 
          description: 'Trabalhando com listas e dicionários.',
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
          description: 'Funções avançadas e manipulação de arquivos.',
          unlockDay: 7
        },
        {
          id: 5,
          title: 'Intermediário II',
          description: 'Programação orientada a objetos básica.',
          unlockDay: 10
        },
        { 
          id: 6, 
          title: 'Intermediário III', 
          description: 'Módulos e pacotes em Python.',
          unlockDay: 14
        }
      ]
    },
    {
      level: 'Avançado',
      items: [
        {
          id: 7, 
          title: 'Avançado I', 
          description: 'Programação orientada a objetos avançada.',
          unlockDay: 17
        },
        {
          id: 8, 
          title: 'Avançado II', 
          description: 'Manipulação de dados com Pandas.',
          unlockDay: 20
        },
        {
          id: 9, 
          title: 'Avançado III', 
          description: 'Introdução ao Machine Learning.',
          unlockDay: 25
        }
      ]
    }
  ];

  const isExerciseUnlocked = (unlockDay) => {
    const today = new Date();
    const unlockDate = addDays(parseISO(courseStartDate), unlockDay - 1);
    return isAfter(today, unlockDate);
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
                  {                    isUnlocked ? (
                    <div className="unlock-info unlocked">
                      Disponível
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