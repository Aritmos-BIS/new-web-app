"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Box, Button, Container, Grid, Typography, TextField, LinearProgress } from '@mui/material';

const SubtractionGame = () => {
  const [num1, setNum1] = useState(11);
  const [num2, setNum2] = useState(12);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [enemyAnswer, setEnemyAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [playerLives, setPlayerLives] = useState(3);
  const [enemyLives, setEnemyLives] = useState(5);
  const [gameover, setGameover] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [currentGif1, setCurrentGif1] = useState('/gifs/Ari_idle.gif');
  const [currentGif2, setCurrentGif2] = useState('/gifs/Plus_and_moin_idle.gif');

  const correctGif1 = '/gifs/Ari_att.gif';
  const incorrectGif1 = '/gifs/Ari_danio.gif';
  const idleGif1 = '/gifs/Ari_idle.gif';
  const correctGif2 = '/gifs/Plus_and_moin_danio.gif';
  const incorrectGif2 = '/gifs/Plus_and_moin_att.gif';
  const idleGif2 = '/gifs/Plus_and_moin_idle.gif';

  const generateRandomNumbers = () => {
    let newNum1 = Math.floor(Math.random() * 20);
    let newNum2 = Math.floor(Math.random() * 20);
    
    if (newNum1 < newNum2) {
      [newNum1, newNum2] = [newNum2, newNum1];
    }
    
    const newCorrectAnswer = newNum1 - newNum2;
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newCorrectAnswer);
    setPlayerAnswer('');
    setEnemyAnswer('');
    setResultMessage('');
  };

  useEffect(() => {
    generateRandomNumbers(); // Initialize with random numbers on mount
  }, []);

  const checkAnswer = () => {
    if (playerAnswer !== '') {
      if (parseInt(playerAnswer, 10) === correctAnswer) {
        setEnemyLives(prevEnemyLives => {
          const newEnemyLives = prevEnemyLives - 1;
          if (newEnemyLives <= 0) {
            setGameover(true);
            setResultMessage('¡Ganaste!');
          }
          return newEnemyLives;
        });
        setCurrentGif1(correctGif1);
        setCurrentGif2(correctGif2);
        setTimeout(() => {
          setCurrentGif1(idleGif1);
          setCurrentGif2(idleGif2);
        }, 5000);
        generateRandomNumbers(); // Generate new numbers for the next round
      } else {
        setPlayerLives(prevPlayerLives => {
          const newPlayerLives = prevPlayerLives - 1;
          if (newPlayerLives <= 0) {
            setGameover(true);
            setResultMessage('¡Perdiste!');
          }
          return newPlayerLives;
        });
        setCurrentGif1(incorrectGif1);
        setCurrentGif2(incorrectGif2);
        setTimeout(() => {
          setCurrentGif1(idleGif1);
          setCurrentGif2(idleGif2);
        }, 5000);
      }
    } else {
      alert('No puede estar vacío');
    }
  };

  const reloadGame = () => {
    generateRandomNumbers();
    setPlayerLives(3);
    setEnemyLives(5);
    setGameover(false);
    setResultMessage('');
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setPlayerAnswer(inputValue);
      setCurrentGif1(idleGif1);
      setCurrentGif2(idleGif2);
    } else {
      alert('Ingrese solo números válidos');
    }
  };

  const playerLifeBarWidth = (playerLives / 3) * 100;
  const enemyLifeBarWidth = (enemyLives / 5) * 100;

  return (
    <main>
      <Typography variant="h2" color="white" margin="10px" textAlign="center" gutterBottom>
        Juego de las restas
      </Typography>
      <Box display="flex" justifyContent="" alignItems="center" width="100%" paddingTop={5}>
        <Button variant="contained" color="primary" href="/auth/users/students/courses/sumas">
          Regresar
        </Button>
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            backgroundColor: '#FFFFFF',
            padding: '16px',
            borderRadius: '20px',
            borderColor: '#000000',
            borderWidth: '50px',
            backgroundImage: 'url(/images/fondobatalla.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Grid container spacing={2} mt={10} justifyContent="center" alignItems="center">
            <Grid item>
              <Box sx={{ position: 'relative', top: '20px' }}>
                <Image src={currentGif1} alt="GIF" width={250} height={250} objectFit="contain" />
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ position: 'relative', bottom: '20px' }}>
                <Image src={currentGif2} alt="GIF" width={250} height={250} objectFit="contain" />
              </Box>
            </Grid>
          </Grid>
          {gameover ? (
            <Box mt={2}>
              <Typography variant="h4" gutterBottom>
                {resultMessage}
              </Typography>
              <Button variant="contained" color="secondary" onClick={reloadGame}>
                Reintentar
              </Button>
            </Box>
          ) : (
            <Box mb={4} width="100%">
              <Box textAlign="left" mb={2}>
                <Typography variant="h6" color="black" gutterBottom>
                  Vida del jugador:
                </Typography>
                <LinearProgress variant="determinate" value={playerLifeBarWidth} />
              </Box>
              <Box textAlign="right" mb={2} color="black">
                <Typography variant="h6" gutterBottom>
                  Vida del enemigo:
                </Typography>
                <LinearProgress variant="determinate" color="secondary" value={enemyLifeBarWidth} />
              </Box>
            </Box>
          )}
          {playerLives > 0 && enemyLives > 0 && !gameover && (
            <Box>
              <Typography variant="h5" gutterBottom color="black">
                Vidas restantes: {playerLives}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {num1} - {num2} =
                <TextField
                  type="number"
                  value={playerAnswer}
                  onChange={handleChange}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      checkAnswer();
                    }
                  }}
                  placeholder="Escribe tu respuesta aquí"
                  sx={{ mx: 2 }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
                <Button variant="contained" color="primary" onClick={checkAnswer}>
                  Atacar
                </Button>
              </Typography>
            </Box>
          )}
        </Container>
        <Button variant="contained" color="primary" href="/auth/users/students/quizes/addition">
          Examen
        </Button>
      </Box>
    </main>
  );
};

export default SubtractionGame;
