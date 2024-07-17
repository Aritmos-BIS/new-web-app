'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { apiFetch } from '@/libs/request';
import { useStore } from '@/libs/store';
import { Container, Typography, ListItemText, Checkbox, Button, Card } from '@mui/material';
import useFetchBattle from '@/hooks/useFetchBattle';

let turn = 0;

const BattlePage = () => {
  const { battleData, error } = useFetchBattle();
  const { group } = useStore(state => state);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [phase, setPhase] = useState('groupSelection');
  const [countdown, setCountdown] = useState(3);

  const [player1Lives, setPlayer1Lives] = useState(battleData.player1.arimal.hp);
  const [player2Lives, setPlayer2Lives] = useState(battleData.player2.arimal.hp);

  let player1LifeBarWidth = (player1Lives / 100) * 100;
  let player2LifeBarWidth = (player2Lives / 100) * 100;

  const handleCheckboxChange = (student, index) => {
    const studentData = { id: student.id, name: student.name, urlImage: student.urlImage, index };
    if (selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else if (selectedStudents.length < 2) {
      setSelectedStudents([...selectedStudents, studentData]);
    }
  };

  const [textInformation, setTextInformation] = useState('waiting');
  const [textGame, setTextGame] = useState('Esperando respuestas');

  const [currentGif1, setCurrentGif1] = useState(getArimalImageP1(battleData.player1.arimal.id));
  const [currentGif2, setCurrentGif2] = useState(getArimalImageP2(battleData.player2.arimal.id));

  const attackGif1 = '';
  const attackedGif1 = '';
  const idleGif1 = '';
  const Arimal1 = '';
  const attackGif2 = '';
  const attackedGif2 = '';
  const idleGif2 = '';
  const Arimal2 = '';

  if(textGame == 'waiting'){
    setTextGame('Esperando a que los jugadores contesten la pregunta')
  }else if(textGame == 'p1Attack'){
    setTextGame(Arimal1 + ' ataco a ' + Arimal2)
  }else if(textGame == 'p2Attack'){
    setTextGame(Arimal2 + ' ataco a ' + Arimal1)
  }else if(textGame == 'p1Missed'){
    setTextGame(Arimal1 + ' fallo el ataque a ' + Arimal2)
  }else if(textGame == 'p2Missed'){
    setTextGame(Arimal2 + ' fallo el ataque a ' + Arimal1)
  }


  const getArimalImageP1 = (id) => {
    switch (id) {
      case 1:
        correctGif1 = '/images/arimals/ariAttack.gif';
        incorrectGif1 = '/images/arimals/ariDmg.gif';
        Arimal1 = 'Ari';
        return idleGif1 = '/images/arimals/ariIdle.png';
      case 2:
        correctGif1 = '/images/arimals/axoAttack.gif';
        incorrectGif1 = '/images/arimals/axoDmg.gif';
        Arimal1 = 'Axo';
        return idleGif1 = '/images/arimals/axoIdle.png';
      case 3:
        correctGif1 = '/images/arimals/cactiAttack.gif';
        incorrectGif1 = '/images/arimals/cactiDmg.gif';
        Arimal1 = 'Cacti';
        return idleGif1 = '/images/arimals/cactiIdle.png';
      case 4:
        correctGif1 = '/images/arimals/monarchAttack.gif';
        incorrectGif1 = '/images/arimals/monarchDmg.gif';
        Arimal1 = 'Monarch';
        return idleGif1 = '/images/arimals/monarchIdle.png';
      default:
    }
  };

  const getArimalImageP2 = (id) => {
    switch (id) {
      case 1:
        correctGif2 = '/images/arimals/ariAttack.gif';
        incorrectGif2 = '/images/arimals/ariDmg.gif';
        Arimal2 = 'Ari';
        return idleGif2 = '/images/arimals/ariIdle.png';
      case 2:
        correctGif2 = '/images/arimals/axoAttack.gif';
        incorrectGif2 = '/images/arimals/axoDmg.gif';
        Arimal2 = 'Axo';
        return idleGif2 = '/images/arimals/axoIdle.png';
      case 3:
        correctGif2 = '/images/arimals/cactiAttack.gif';
        incorrectGif2 = '/images/arimals/cactiDmg.gif';
        Arimal2 = 'Cacti';
        return idleGif2 = '/images/arimals/cactiIdle.png';
      case 4:
        correctGif2 = '/images/arimals/monarchAttack.gif';
        incorrectGif2 = '/images/arimals/monarchDmg.gif';
        Arimal2 = 'Monarch';
        return idleGif2 = '/images/arimals/monarchIdle.png';
      default:
    }
  };

  const payload = {
    turn: turn,
    player1: {
      playerId: selectedStudents[0]?.id,
      turn: 0,
    },
    player2: {
      playerId: selectedStudents[1]?.id,
      turn: 0,
    }
  };

  const handleSaveSelection = async () => {
    console.log("Payload to send:", payload);
    try {
      const response = await apiFetch('/api/battle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const textResponse = await response.text();
      console.log("Raw response:", textResponse);

      if (!response.ok) {
        throw new Error(`Failed to save selection: ${textResponse}`);
      }

      const result = JSON.parse(textResponse);
      console.log("Parsed response:", result);
      setPhase('initial');
    } catch (error) {
      console.error('Error saving selection:', error);
      setPhase('initial');
    }
  };

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

  const checkAnswer = () => {
    const isCorrect1 = (battleData.player1.correct);
    const isCorrect2 = (battleData.player2.correct);

    let attack = 0;

    let level1 = (battleData.player1.level);
    let level2 = (battleData.player2.level);

    if(level1 == 'hard'){
      attack = 30
    }else if(level1 == 'medium'){
      attack = 20
    }else if(level1 == 'easy'){
      attack = 10
    }

    if(level2 == 'hard'){
      attack = 30
    }else if(level2 == 'medium'){
      attack = 20
    }else if(level2 == 'easy'){
      attack = 10
    }

    if (isCorrect1) {
      setPlayer2Lives(player2Lives => {
        player2Lives = player2Lives - attack;
        if (player2Lives <= 0) {
          setPhase('winner');
        }
        return player2Lives;
      });
      setCurrentGif1(attackGif1);
      setCurrentGif2(attackedGif2);
      lifeUpdateP2();
      setTextInformation('p1Attack');
      setTimeout(() => {
      }, 3000);
    } else {
      setTextInformation('p1Missed');
      setTimeout(() => {
      }, 3000);
    }
    setCurrentGif1(idleGif1);
    
    
      if (isCorrect2) {
        setPlayer1Lives(player1Lives => {
          player1Lives = player1Lives - attack;
          if (player1Lives <= 0) {
            setPhase('winner');
          }
          return player1Lives;
        });
        setCurrentGif2(attackGif2);
        setCurrentGif1(attackedGif1);
        lifeUpdateP1();
        setTextInformation('p2Attack');
        setTimeout(() => {
        }, 3000);
      } else {
        setTextInformation('p2Missed');
        setTimeout(() => {
        }, 3000);
      }
      setCurrentGif2(idleGif2);
      

  const lifeUpdateP1 = async () => {
    try {
      const response = await apiFetch('/api/battle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          player2:{
            hp: player2Lives 
          }
        }
        })
        if (!response.ok) {
          throw new Error(`Failed to update battle: ${textResponse}`);
        }
  
        const result = JSON.parse(textResponse);
        console.log("Parsed response:", result);
      } catch (error) {
        console.error('Error updating battle:', error);
      }
    };

    const lifeUpdateP2 = async () => {
      try {
        const response = await apiFetch('/api/battle', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            player2:{
              hp: player2Lives 
            }
          }
          })
          if (!response.ok) {
            throw new Error(`Failed to update battle: ${textResponse}`);
          }
    
          const result = JSON.parse(textResponse);
          console.log("Parsed response:", result);
        } catch (error) {
          console.error('Error updating battle:', error);
        }
      };

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
      const response = await apiFetch('/api/battle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          turn: turn + 1 
          }
        })
        if (!response.ok) {
          throw new Error(`Failed to update battle: ${textResponse}`);
        }
  
        const result = JSON.parse(textResponse);
        console.log("Parsed response:", result);
      } catch (error) {
        console.error('Error updating battle:', error);
      }
    };

      const handleBattlePhase = () => {
        startBattle();
        setPhase('countdown');
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
                <LinearProgress variant="determinate" value={player1LifeBarWidth} />
              </Card>
            )}
          </Grid>
          <Grid item>
            {player2 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
                <img src={currentGif2} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '150px', height: '150px' }} />
                <LinearProgress variant="determinate" value={player2LifeBarWidth} />
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
