'use client';

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { apiFetch } from '@/libs/request';
import { useStore } from '@/libs/store';
import { Container, Typography, ListItemText, Checkbox, Button, Card } from '@mui/material';
import Battle from '@/components/Battle.jsx'

const BattlePage = () => {
  const { group } = useStore(state => state);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [phase, setPhase] = useState('groupSelection');
  const [countdown, setCountdown] = useState(3);

  const [arimalsData, setArimalsData] = useState(null);

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
      const response = await apiFetch({ method: 'GET' }, '/api/battle/arimals');
      setArimalsData(response); 
      setPhase('initial');
    } catch (error) {
      console.error('Error saving selection:', error);
    }
  };

  const startBattle = async () => {
    try {
        await apiFetch({payload: { turn: turn + 1 }, method: "PUT"}, '/api/battle/turn') 
   
      } catch (error) {
        console.error('Error updating battle:', error);
      }
    };

      const handleBattlePhase = async () => {
        startBattle()

        setPhase('countdown');
      };


  const player1 = selectedStudents[0] ? {
    firstName: group.students[selectedStudents[0].index].name,
    lastName: group.students[selectedStudents[0].index].lastname,
    profileImage: group.students[selectedStudents[0].index].urlImage,
  } : null;

  const player2 = selectedStudents[1] ? {
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
                <Typography variant='h1'>{arimalsData.arimalPlayer1?.arimal?.arimalId}</Typography>
              </Card>
            )}
          </Grid>
          <Grid item>
            {player2 && (
              <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
                <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
                <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '150px', height: '150px' }} />
                <Typography variant='h1'>{arimalsData?.arimalPlayer2?.arimal?.arimalId}</Typography>
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
        <Battle player1={player1} player2={player2} />
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
