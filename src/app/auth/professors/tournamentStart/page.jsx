'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { apiFetch } from '@/libs/request';
import { useStore } from '@/libs/store';
import { Container, Typography, ListItemText, Checkbox, Button, Card } from '@mui/material';
import Battle from '@/components/Battle.jsx'
import { styled } from '@mui/system';

const BattlePage = () => {
  const router = useRouter();

  const { group } = useStore(state => state);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  const [phase, setPhase] = useState('groupSelection');
  const [countdown, setCountdown] = useState(3);

  const [image1, setImage1] = useState('');
  const [arimal1, setArimal1] = useState(null);
  const [image2, setImage2] = useState('');
  const [arimal2, setArimal2] = useState(null);

  const [turn, setTurn] = useState(0)


  useEffect(() =>{
    console.log({arimal1}, {arimal2})
    setImage1(arimal1?.idleGif)
    setImage2(arimal2?.idleGif)
  }, [arimal1, arimal2])

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            setPhase('winner');
          }
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    if (phase === 'initial') {
      getArimals()
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

  const getArimalImage = (player, id) => {  
    console.log('get arimal image')
    switch (id) {
      case 1:
        if (player == 1) {
          setArimal1({
            attackGif: '/images/arimals/ariAttack.gif',
            damageGif: '/images/arimals/ariDmg.gif',
            arimalName: 'Ari',
            idleGif: '/images/arimals/ariIdle.png'
          });
        } else {
          setArimal2({
            attackGif: '/images/arimals/ariAttack.gif',
            damageGif: '/images/arimals/ariDmg.gif',
            arimalName: 'Ari',
            idleGif: '/images/arimals/ariIdle.png'
          });
        }
        break;
      case 2:
        if (player == 1) {
          setArimal1({
            attackGif: '/images/arimals/axoAttack.gif',
            damageGif: '/images/arimals/axoDmg.gif',
            arimalName: 'Axo',
            idleGif: '/images/arimals/axoIdle.png'
          });
        } else {
          setArimal2({
            attackGif: '/images/arimals/axoAttack.gif',
            damageGif: '/images/arimals/axoDmg.gif',
            arimalName: 'Axo',
            idleGif: '/images/arimals/axoIdle.png'
          });
        }
        break;
      case 3:
        if (player == 1) {
          setArimal1({
            attackGif: '/images/arimals/cactiAttack.gif',
            damageGif: '/images/arimals/cactiDmg.gif',
            arimalName: 'Cacti',
            idleGif: '/images/arimals/cactiIdle.png'
          });
        } else {
          setArimal2({
            attackGif: '/images/arimals/cactiAttack.gif',
            damageGif: '/images/arimals/cactiDmg.gif',
            arimalName: 'Cacti',
            idleGif: '/images/arimals/cactiIdle.png'
          });
        }
        break;
      case 4:
        if (player == 1) {
          setArimal1({
            attackGif: '/images/arimals/monarchAttack.gif',
            damageGif: '/images/arimals/monarchDmg.gif',
            arimalName: 'Monarch',
            idleGif: '/images/arimals/monarchIdle.png'
          });
        } else {
          setArimal2({
            attackGif: '/images/arimals/monarchAttack.gif',
            damageGif: '/images/arimals/monarchDmg.gif',
            arimalName: 'Monarch',
            idleGif: '/images/arimals/monarchIdle.png'
          });
        }
        break;
      default:
        return;
    }
  };

  const getArimals = async () => {
    const response = await apiFetch({ method: 'GET' }, '/api/battle/arimals');
    if (response?.arimalPlayer1?.arimal?.arimalId != undefined || response?.arimalPlayer2?.arima?.arimalId != undefined) {
      console.log("si entre")
      getArimalImage(1, response?.arimalPlayer1?.arimal?.arimalId) 
      getArimalImage(2, response?.arimalPlayer2?.arimal?.arimalId)
    }else{
      setTimeout(() => {
        getArimals()
      }, 1000)
    }
  }

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
    profileImage:  group.students[selectedStudents[0].index].urlImage || '/images/user-image.png',
  } : null;

  const player2 = selectedStudents[1] ? {
    firstName: group.students[selectedStudents[1]?.index].name,
    lastName: group.students[selectedStudents[1]?.index].lastname,
    profileImage: group.students[selectedStudents[1]?.index].urlImage || '/images/user-image.png',
  } : null;

  const FireworkBackground = styled('div')(({ fireworks }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    overflow: 'hidden',
    '& .firework': {
      position: 'absolute',
      width: '0.5vmin',
      height: '0.5vmin',
      content: '""',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
      backgroundSize: '0.5vmin 0.5vmin',
      backgroundRepeat: 'no-repeat',
      animation: 'firework 2s infinite',
      transformOrigin: 'center',
      ...(fireworks.map((firework, index) => ({
        [`& .firework:nth-of-type(${index + 1})`]: {
          top: firework.top,
          left: firework.left,
          animationDuration: firework.animationDuration,
          animationDelay: firework.animationDelay,
        },
      })))
    },
    '& .firework::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0.5vmin',
      height: '0.5vmin',
      background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
      backgroundSize: '0.5vmin 0.5vmin',
      backgroundRepeat: 'no-repeat',
      animation: 'firework 2s infinite',
      transform: 'translate(-50%, -50%) rotate(25deg) !important',
    },
    '& .firework::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0.5vmin',
      height: '0.5vmin',
      background: 'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 50% 00%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 00% 50%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 50% 99%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 99% 50%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 95% 90%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 10% 60%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 31% 80%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 80% 10%, ' +
                  'radial-gradient(circle, #ff0 0.2vmin, #0000 0) 90% 23%, ' +
                  'radial-gradient(circle, #ff0 0.3vmin, #0000 0) 45% 20%, ' +
                  'radial-gradient(circle, #ff0 0.5vmin, #0000 0) 13% 24%',
      backgroundSize: '0.5vmin 0.5vmin',
      backgroundRepeat: 'no-repeat',
      animation: 'firework 2s infinite',
      transform: 'translate(-50%, -50%) rotate(-37deg) !important',
    },
    '@keyframes firework': {
      '0%': {
        transform: 'translate(-50%, 60vh)',
        width: '0.5vmin',
        opacity: '1',
      },
      '50%': {
        width: '0.5vmin',
        opacity: '1',
      },
      '100%': {
        width: '45vmin',
        opacity: '0',
      },
    },
  }));
  
  const generateRandomFireworks = (count) => {
    return [...Array(count)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 1}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
  };


  if (phase === 'groupSelection') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <Typography variant="h4" color="white" gutterBottom>Estudiantes del Grupo</Typography>
        {group && group.students && group.students.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            {group.students.map((student, index) => (
              <Card key={student.id} style={{ backgroundColor: '#3C096C', margin: '10px', padding: '20px', width: '200px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <ListItemText primary={`${student.name} ${student.lastname}`} style={{ color: '#E0AAFF', textAlign: 'center', marginBottom: '10px' }} />
                <img src={student.urlImage || '/images/user-image.png'} alt={`${student.name} ${student.lastname}`} style={{ width: '100px', height: '100px', borderRadius: '5%', margin: '0 auto 10px auto', display: 'block' }} />
                <Checkbox
                  checked={selectedStudents.some(s => s.id === student.id)}
                  onChange={() => handleCheckboxChange(student, index)}
                  style={{ alignSelf: 'center', color: '#E0AAFF' }}
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
            color: '#3C096C',
            alignSelf: 'center',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            {player1 && (
              <Card style={{ backgroundColor: '#3C096C', display:'flex', flexDirection:'column', textAlign:'center', padding: '35px', width: 'auto' }}>
                <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
                <img src={player1.profileImage} alt={`${player1.firstName} ${player1.lastName}`} style={{ margin: '10px', width: '150px', height: '150px', borderRadius: '100%' }} />
                {arimal1?.idleGif !== undefined ? (
                  <>
                    <Typography variant="h6" color="white" textAlign='center'>{arimal1.arimalName}</Typography>
                    <img src={arimal1.idleGif} alt="arimals" style={{ width: '150px', height: '150px' }} />
                  </>
                ) : (
                  <>
                    <Typography variant="h6"></Typography>
                    <Typography color="white" variant="h6">waiting...</Typography>
                  </>
                )}
              </Card>
            )}
          </Grid>
          <Grid item>
             <Card style={{background: '#10002B', padding: '20px', width: 'auto', }}>
                <Typography variant="h1" color="white">Vs.</Typography>
              </Card>
          </Grid>
          <Grid item>
            {player2 && (
              <Card style={{ backgroundColor: '#3C096C', display:'flex', flexDirection:'column', textAlign:'center', padding: '35px', width: 'auto'}}>
                <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
                <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ margin: '10px', width: '150px', height: '150px', borderRadius: '100%'}} />
                {arimal2?.idleGif !== undefined ? (
                  <>
                    <Typography variant="h6" color="white" textAlign='center'>{arimal2.arimalName}</Typography>
                    <img src={arimal2.idleGif} alt="arimals" style={{ width: '150px', height: '150px' }} />
                  </>
                ) : (
                  <>
                    <Typography variant="h6"></Typography>
                    <Typography variant="h6">waiting...</Typography>
                  </>
                )}
              </Card>
            )}
          </Grid>
        </Grid> 
        <Button
          onClick={handleBattlePhase}
          disabled={!arimal1?.idleGif && !arimal2?.idleGif}
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
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <Typography variant="h2" style={{ fontSize: '5rem', animation: 'fadeIn 1s ease-in-out' }}>
        {countdown}
      </Typography>
      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </Container>
    );
  }

  if (phase === 'battle') {
    return (
      <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Battle player1={player1} player2={player2} arimal1={arimal1} arimal2={arimal2} />
      </Container>
    );
  }

  if (phase === 'winner') {
    const fireworks = generateRandomFireworks(10);
    const handleClickRestart = async () => {
      try {
        await apiFetch( { method: 'DELETE' }, '/api/battle');
        console.log('si borre')
        //router.push();
      } catch (error) {
        console.error('There was a problem with the delete operation:', error);
      }
    };
    return (
      <Container
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FireworkBackground fireworks={fireworks}>
        {fireworks.map((style, index) => (
          <div
            key={index}
            className="firework"
            style={{
              top: style.top,
              left: style.left,
              animationDuration: style.animationDuration,
              animationDelay: style.animationDelay,
            }}
          />
        ))}
      </FireworkBackground>
      <Typography variant="h4" style={{ color: 'white', marginBottom: '16px', zIndex: 1 }}>
        ¡Ganador de la batalla!
      </Typography>
      <Typography variant="h6" style={{ color: 'white', marginBottom: '16px', zIndex: 1 }}>
        {10 <= 0 ? `${player2.firstName} ${player2.lastName}` : `${player1.firstName} ${player1.lastName}`}
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: '220px',
          height: '260px',
          backgroundColor: '#C77DFF',
          borderRadius: '10px',
          overflow: 'hidden',
          animation: 'growUp 1s ease-in-out',
          zIndex: 1,
        }}
      >
        <img
          src={10 <= 0 ? (player2.profileImage || '/images/user-image.png') : (player1.profileImage || '/images/user-image.png')}
          style={{ width: '200px', height: '250px', borderRadius: '5%', display: 'block' }}
        />
      </div>
      <Button
        onClick={(handleClickRestart)}
        style={{
          marginTop: '20px',
          backgroundColor: '#7B2CBF',
          color: 'white',
          alignSelf: 'center',
          zIndex: 1,
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
