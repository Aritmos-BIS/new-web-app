'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { apiFetch } from '@/libs/request';
import { useStore } from '@/libs/store';
import { Container, Typography, ListItemText, Checkbox, Button, Card } from '@mui/material';

const BattlePage = () => {
  const { group } = useStore(state => state);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [phase, setPhase] = useState('groupSelection');
  const [countdown, setCountdown] = useState(3);

  const [textInformation, setTextInformation] = useState('waiting');
  const [textGame, setTextGame] = useState('Esperando respuestas');

  const [currentGif1, setCurrentGif1] = useState('');
  const [attackGif1, setAttackGif1] = useState('');
  const [damageGif1, setDamageGif1] = useState('');
  const [idleGif1, setIdleGif1] = useState('');
  const [arimal1, setArimal1] = useState('');
  const [arimal1Hp, setArimal1Hp] = useState(100) 

  const [currentGif2, setCurrentGif2] = useState('');
  const [attackGif2, setAttackGif2] = useState('');
  const [damageGif2, setDamageGif2] = useState('');
  const [idleGif2, setIdleGif2] = useState('');
  const [arimal2, setArimal2] = useState('');
  const [arimal2Hp, setArimal2Hp] = useState(100)

  const [turn, setTurn] = useState(0)

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setPhase('battle');
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const handleCheckboxChange = (student, index) => {
    const studentData = { id: student.id, name: student.name, urlImage: student.urlImage, index };
    if (selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else if (selectedStudents.length < 2) {
      setSelectedStudents([...selectedStudents, studentData]);
    }
  };

  

  const handleChangeTextInfo = () => {
    switch (textInformation) {
      case 'waiting':
        setTextGame('Esperando a que los jugadores contesten la pregunta');
        break;
      case 'p1Attack':
        setTextGame(arimal1 + ' ataco a ' + arimal2);
        break;
      case 'p2Attack':
        setTextGame(arimal2 + ' ataco a ' + arimal1);
        break;
      case 'p1Missed':
        setTextGame(arimal1 + ' fallo el ataque a ' + arimal2);
        break;
      case 'p2Missed':
        setTextGame(arimal2 + ' fallo el ataque a ' + arimal1);
        break;
      default:
        break;
    }
  }

  const getArimalImage = (player, id) => {
    let attackGif, damageGif, arimal, idleGif;
  
    switch (id) {
      case 1:
        attackGif = '/images/arimals/ariAttack.gif';
        damageGif = '/images/arimals/ariDmg.gif';
        arimal = 'Ari';
        idleGif = '/images/arimals/ariIdle.png';
        break;
      case 2:
        attackGif = '/images/arimals/axoAttack.gif';
        damageGif = '/images/arimals/axoDmg.gif';
        arimal = 'Axo';
        idleGif = '/images/arimals/axoIdle.png';
        break;
      case 3:
        attackGif = '/images/arimals/cactiAttack.gif';
        damageGif = '/images/arimals/cactiDmg.gif';
        arimal = 'Cacti';
        idleGif = '/images/arimals/cactiIdle.png';
        break;
      case 4:
        attackGif = '/images/arimals/monarchAttack.gif';
        damageGif = '/images/arimals/monarchDmg.gif';
        arimal = 'Monarch';
        idleGif = '/images/arimals/monarchIdle.png';
        break;
      default:
        return;
    }
  
    if (player === 1) {
      setAttackGif1(attackGif);
      setDamageGif1(damageGif)
      setIdleGif1(idleGif)
      setArimal1(arimal)
    } else if (player === 2) {
      setAttackGif2(attackGif);
      setDamageGif2(damageGif)
      setIdleGif2(idleGif)
      setArimal2(arimal)
    }
  };

  const handleSaveSelection = async () => {
    const payload = {
      _id: 1,
      turn: 0,
      player1: {
        playerId: selectedStudents[0]?.id,
        name: selectedStudents[1]?.name, 
        turn: 0,
      },
      player2: {
        playerId: selectedStudents[1]?.id,
        name: selectedStudents[1]?.name,
        turn: 0,
      }
    };
    
    console.log({payload})

    try {
      await apiFetch({payload, method:'POST'}, '/api/battle')
      setPhase('initial');
    } catch (error) {
      console.error('Error saving selection:', error);
      setPhase('initial');
    }
  };


  const checkAnswer = async (player) => {
    const answerData = apiFetch({ method: 'GET' }, '/api/battle/answer' )
    const isCorrect = (player == 1 ? answerData.answerPlayer1.correct : answerData.answerPlayer2.correct);
    const level = (player == 1 ? answerData.answerPlayer1.level : answerData.answerPlayer2.level);

    if(level == 'hard'){
      attack = 30
    }else if(level == 'medium'){
      attack = 20
    }else if(level == 'easy'){
      attack = 10
    }

    if (player == 1) {
      if(isCorrect){
        setArimal2Hp(arimal2Hp - attack)
        setCurrentGif1(attackGif1);
        setCurrentGif2(damageGif2);
        await apiFetch({ payload: { _id: selectedStudents[1]?.id, hp: arimal2Hp }, method: "GET" })
        setTextInformation('p1Attack');
        setTimeout(() => {
        }, 3000);
      } else {
        setTextInformation('p1Missed');
        setTimeout(() => {
        }, 3000);
      }
      setCurrentGif1(idleGif1);
    }else{
      if(isCorrect){
        setArimal1Hp(arimal1Hp - attack)
        setCurrentGif2(attackGif2);
        setCurrentGif1(damageGif1);
        await apiFetch({ payload: { _id: selectedStudents[0]?.id, hp: arimal1Hp }, method: "GET" })
        setTextInformation('p2Attack');
        setTimeout(() => {
        }, 3000);
      } else {
        setTextInformation('p2Missed');
        setTimeout(() => {
        }, 3000);
      }
      setCurrentGif2(idleGif2);
    }
  }
    
    

  useEffect(() => {
    if (phase === 'battle') {
      const interval = setInterval(() => {
        checkAnswer();
      }, 62000); 

      return () => clearInterval(interval);
    }
  }, [phase]);


  const startBattle = async () => {
    try {
        await apiFetch({payload: { turn: turn + 1 }, method: "PUT"}, '/api/battle/turn') 
        const response = await apiFetch({method: "GET"}, '/api/battle/arimals') 

        getArimalImage(1, response.arimalPlayer1.arimal1)
        getArimalImage(2, response.arimalPlayer2.arimal1)
   
      } catch (error) {
        console.error('Error updating battle:', error);
      }
    };

      const handleBattlePhase = async () => {
        startBattle()
        
        if (arimal1 != '' && arimal2 != '') {
          setPhase('countdown');
        }

      };


  let player1 = selectedStudents[0] ? {
    firstName: group.students[selectedStudents[0].index].name,
    lastName: group.students[selectedStudents[0].index].lastname,
    profileImage: group.students[selectedStudents[0].index].urlImage,
  } : null;

  let player2 = selectedStudents[1] ? {
    firstName: group.students[selectedStudents[1]?.index].name,
    lastName: group.students[selectedStudents[1]?.index].lastname,
    profileImage: group.students[selectedStudents[1]?.index].urlImage,
  } : null;


  if (phase === 'groupSelection') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" color="white" gutterBottom>Estudiantes del Grupo</Typography>
      {group && group.students && group.students.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {group.students.map((student, index) => (
            <Card key={student.id} style={{ backgroundColor: '#3C096C', margin: '10px', padding: '10px', width: '300px' }}>
              <ListItemText primary={`${student.name} ${student.lastname}`} style={{ color: '#E0AAFF' }} />
              <img src={student.urlImage} alt={`${student.name} ${student.lastname}`} style={{ width: '100px', height: '100px' }} />
              <Checkbox
                checked={selectedStudents.some(s => s.id === student.id)}
                onChange={() => handleCheckboxChange(student, index)}
                style={{ alignSelf: 'flex-end' }}
                disabled={selectedStudents.length === 2 && !selectedStudents.some(s => s.id === student.id)}
              />
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="body1" color="white">Cargando estudiantes...</Typography>
      )}
      <Button
        onClick={handleSaveSelection}
        disabled={selectedStudents.length !== 2}
        style={{
          marginTop: '20px',
          backgroundColor: '#E0AAFF',
          color: 'white',
          alignSelf: 'center'
        }}
      >
        Confirmar Selección
      </Button>
    </Container>
    );
  }

  if (phase === 'initial') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>¡Estudiantes Seleccionados!</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            {player1 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
                <img src={player1.profileImage} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '150px', height: '150px' }} />
              </Card>
            )}
          </Grid>
          <Grid item>
            {player2 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
                <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '150px', height: '150px' }} />
              </Card>
            )}
          </Grid>
        </Grid>
        <Button
          onClick={handleBattlePhase}
          style={{
            marginTop: '20px',
            backgroundColor: '#E0AAFF',
            color: 'white',
            alignSelf: 'center'
          }}
        >
          Empezar Batalla
        </Button>
      </Container>
    );
  }

  if (phase === 'countdown') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" color="white" gutterBottom>{countdown}</Typography>
      </Container>
    );
  }

  if (phase === 'battle') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>¡Batalla!</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            {player1 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
                <img src={currentGif1} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '150px', height: '150px' }} />
                <LinearProgress variant="determinate" value={arimal1Hp} />
              </Card>
            )}
          </Grid>
          <Grid item>
            {player2 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
                <img src={currentGif2} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '150px', height: '150px' }} />
                <LinearProgress variant="determinate" value={arimal2Hp} />
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (phase === 'winner') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>¡Ganador!</Typography>
        <Typography variant="h6" color="white" gutterBottom>
          {player1Lives > player2Lives ? `${player1.firstName} ${player1.lastName}` : `${player2.firstName} ${player2.lastName}`}
        </Typography>
        <Button
          onClick={() => setPhase('groupSelection')}
          style={{
            marginTop: '20px',
            backgroundColor: '#E0AAFF',
            color: 'white',
            alignSelf: 'center'
          }}
        >
          Jugar de Nuevo
        </Button>
      </Container>
    );
  }

  return <div>Loading...</div>;
};

export default BattlePage;
