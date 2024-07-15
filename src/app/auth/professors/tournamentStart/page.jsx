'use client'

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

const BattlePage = () => {
  const [phase, setPhase] = useState('initial'); // Puede ser 'initial', 'countdown', 'battle'
  const [countdown, setCountdown] = useState(3);

  const player1 = {
    name: 'John',
    lastName: 'Doe',
    profileImage: 'url_to_image1',
    arimalImage: 'url_to_additional_image1',
    arimalName: 'Tiger',
  };

  const player2 = {
    firstName: 'Jane',
    lastName: 'Smith',
    profileImage: 'url_to_image2',
    additionalImage: 'url_to_additional_image2',
    animal: 'Lion',
  };

  const [player1Lives, setPlayer1Lives] = useState(3);
  const [player2Lives, setplayer2Lives] = useState(5);

  const player1LifeBarWidth = (player1Lives / 5) * 100;
  const player2LifeBarWidth = (player2Lives / 5) * 100;

  useEffect(() => {
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
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

  const startBattle = () => {
    setPhase('countdown');
  };

  if (phase === 'initial') {
    return (
      <Grid container minHeight="90vh" p="10px" spacing={2} alignItems="center" justifyContent="center">
        {/* Jugador 1 */}
        <Grid item xs={4} sm={3}>
          <Card sx={{ backgroundColor: '#5A189A', color: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Jugador 1
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Typography variant="subtitle1">{player1.firstName}</Typography>
                <Typography variant="subtitle1">{player1.lastName}</Typography>
                <img src={player1.profileImage} alt="Profile 1" style={{ width: 150, height: 150, margin: 10 }} />
                <img src={player1.additionalImage} alt="Additional 1" style={{ width: 150, height: 150, margin: 10 }} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* VS */}
        <Grid item xs={4} sm={2} style={{ textAlign: 'center' }}>
          <Typography variant="h4" color="white">
            VS
          </Typography>
        </Grid>

        {/* Jugador 2 */}
        <Grid item xs={4} sm={3}>
          <Card sx={{ backgroundColor: '#5A189A', color: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Jugador 2
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Typography variant="subtitle1">{player2.firstName}</Typography>
                <Typography variant="subtitle1">{player2.lastName}</Typography>
                <img src={player2.profileImage} alt="Profile 2" style={{ width: 150, height: 150, margin: 10 }} />
                <img src={player2.additionalImage} alt="Additional 2" style={{ width: 150, height: 150, margin: 10 }} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Botón de Comenzar Batalla */}
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" fullWidth onClick={startBattle}>
            Comenzar Batalla
          </Button>
        </Grid>
      </Grid>
    );
  } else if (phase === 'countdown') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="90vh">
        <Typography 
          variant="h1" 
          color="white"
          sx={{
            animation: 'countdownAnimation 1s infinite',
            '@keyframes countdownAnimation': {
              '0%': { transform: 'scale(1)', opacity: 1 },
              '50%': { transform: 'scale(1.2)', opacity: 0.5 },
              '100%': { transform: 'scale(1)', opacity: 1 }
            }
          }}
        >
          {countdown}
        </Typography>
      </Box>
    );
  } else if (phase === 'battle') {
    return (
      <Grid container minHeight="90vh" p="10px" spacing={2} alignItems="center" justifyContent="center">
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
          <Card sx={{ backgroundColor: '#5A189A', color: '#FFFFFF', position: 'relative', borderRadius: '30px' }}>
            <CardContent sx={{ flex: '1', flexDirection: 'column', display: 'flex' }}>
              <Box display="flex" justifyContent="space-between">
                <Box width="48%" >
                  <Typography variant="h6" color="black" gutterBottom>
                  <img src={player2.profileImage} alt="Profile 1" style={{ width: 30, height: 30, margin: 10 }} />
                  Vida del jugador:
                  </Typography>
                  <LinearProgress variant="determinate" value={player1LifeBarWidth} />
                  <Typography variant="h6" color="black" gutterBottom>
                    Nombre del Arimal1
                  </Typography>
                  <Grid display="flex" justifyContent="center" sx={{mx: 'auto'}} ><img src={player1.additionalImage} alt="Additional 1" style={{ width: 150, height: 150, margin: 10 }} /></Grid>
                </Box>
                <Box width="48%">
                  <Typography variant="h6" color="black" textAlign="end" gutterBottom>
                    {player2.firstName}<img src={player2.profileImage} alt="Profile 2" style={{ width: 30, height: 30, margin: 10 }} />

                  </Typography>
                  <LinearProgress variant="determinate" color="secondary" value={player2LifeBarWidth} />
                  <Typography variant="h6" color="black" textAlign="end" gutterBottom>
                    Nombre del Arimal2
                  </Typography>
                  <Grid display="flex" justifyContent="center" sx={{mx: 'auto'}} ><img src={player1.additionalImage} alt="Additional 1" style={{ width: 150, height: 150, margin: 10 }} /></Grid>
                  </Box>
              </Box>
            </CardContent>
          </Card>
          </Grid>
        </Grid>

        {/* Información */}
        <Grid item xs={12}>
          <Box bgcolor="white" color="black" p={2} my={2} textAlign="center">
            Información de la batalla se mostrará aquí.
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default BattlePage;
