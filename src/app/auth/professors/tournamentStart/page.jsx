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



  const [currentGif1, setCurrentGif1] = useState('/gifs/Ari_idle.gif');
  const [currentGif2, setCurrentGif2] = useState('/gifs/Plus_and_moin_idle.gif');

  const correctGif1 = '/gifs/Ari_att.gif';
  const incorrectGif1 = '/gifs/Ari_danio.gif';
  const idleGif1 = '/gifs/Ari_idle.gif';
  const correctGif2 = '/gifs/Plus_and_moin_danio.gif';
  const incorrectGif2 = '/gifs/Plus_and_moin_att.gif';
  const idleGif2 = '/gifs/Plus_and_moin_idle.gif';

  const getAnimalImage = (id) => {
    switch (id) {
      case 1:
        return 'url/to/arimal1.jpg'; //carpeta public/arimals 
      case 2:
        return 'url/to/arimal2.jpg'; 
      case 3:
        return 'url/to/arimal3.jpg'; 
      case 4:
        return 'url/to/arimal4.jpg'; 
      default:
        return 'url/to/default.jpg'; 
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
        });
        setCurrentGif1(correctGif1);
        lifeUpdateP1()
        //espera 3 seg
      } else {
        setCurrentGif1(idleGif1);
        //espera 3 seg
      }

      if (isCorrect2) {
        setPlayer1Lives(player1Lives => {
          player1Lives = player1Lives - attack;
          if (player1Lives <= 0) {
            setPhase('winner');
          }
        });
        setCurrentGif2(correctGif2);
        lifeUpdateP2()
        //espera 3 seg
      } else {
        //ONFO CAMBIO
        //espera 3 seg
      }

    setTimeout(() => {
    }, 5000);
  };

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
      }, 62000); // Check answer every 10 seconds

      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'battle') {
      if (player1Lives === 0 || player2Lives === 0) {
        setPhase('winner');
      }
    }
  }, [player1Lives, player2Lives, phase]);

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
