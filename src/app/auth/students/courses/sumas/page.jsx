import React from 'react';
import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { ArrowBack, SportsEsports, School, EmojiFoodBeverage, EmojiNature } from '@mui/icons-material';

export default function Home() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="flex-start" justifyContent="center" p={2} m={2} bgcolor="#5A189A" boxShadow={3} borderRadius={2}>
            <Box flex="1" p={2}>
              <Typography variant="h2" component="h1" gutterBottom textAlign='center' fontFamily="serif">
                Aventura Matemática: Sumando con Diversión
              </Typography>
              <Box component="video" controls mx='auto' width="90%" height="auto" src="/videos/sumasv.mp4" borderRadius={2} boxShadow={2} mb={2} />
              <Button href="https://www.youtube.com/watch?v=k46QCr1GofU&ab_channel=MundoPrimaria" color="primary">Ir al video</Button>
              <Button href="https://www.youtube.com/@MundoprimariaMP" color="primary">Creado por Mundo Primaria</Button>
            </Box>
            <Box flex="1" p={2} bgcolor="#5A189A" color="white" borderRadius={2} boxShadow={3} overflow="auto" alignItems='center' justifyContent='center' height={{ xs: 'auto', md: '680px' }}>
              <Typography sx={{ fontSize: 'large', mt: '10px', mb: '30px' }}>
              ¡Bienvenidos a la fascinante exploración del mundo de las sumas! La suma, en el emocionante universo de las matemáticas, es como un asombroso juego donde combinamos números para descubrir cuánto tenemos en total.
              </Typography>
              <Grid container spacing={1} justifyContent="center" alignItems="center" bgcolor="#C77DFF" p={2} borderRadius={2} boxShadow={2}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={1} justifyContent="center">
                    {[...Array(4)].map((_, i) => (
                      <Grid item key={i}>
                        <IconButton>
                          <EmojiFoodBeverage fontSize="medium" />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={2} display="flex" justifyContent="center">
                  <EmojiNature fontSize="medium" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={1} justifyContent="center">
                    {[...Array(3)].map((_, i) => (
                      <Grid item key={i}>
                        <IconButton>
                          <EmojiFoodBeverage fontSize="medium" />
                        </IconButton>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Typography sx={{ fontSize: 'large', mt: '10px', mb: '30px' }}>
              Piénsalo de esta manera: si tienes 3 caramelos y tu amigo te regala 4 caramelos más, ¿cuántos caramelos tendrás en total? La suma es la herramienta mágica que toma esos 3 y los combina con los 4 nuevos, ¡y voilà!, descubres que ahora tienes 7 caramelos. Es como si la suma fuera el capitán de un equipo, reuniendo a todos los números para mostrar cuánto es la cantidad total.
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#C77DFF" p={2} borderRadius={2} boxShadow={2}>
                <Typography variant="h1" component="p" color="white">
                  7
                </Typography>
                <Box display="flex" justifyContent="center" ml={2}>
                  {[...Array(7)].map((_, i) => (
                    <IconButton key={i}>
                      <EmojiFoodBeverage fontSize="large" />
                    </IconButton>
                  ))}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 'large', mt: '10px', mb: '30px' }}>
              Así que, si alguna vez te has preguntado cómo se juntan los números y revelan su misterioso secreto, estás a punto de descubrirlo. ¡Prepárate para sumergirte en el mundo encantado de las sumas y aprender cómo hacer que los números trabajen juntos para hacer las matemáticas más divertidas y emocionantes! ¡Comencemos esta emocionante aventura matemática!
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-evenly" m={4} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button variant="contained" color="primary" startIcon={<ArrowBack />} href="/auth/users" sx={{ mb: { xs: 2, sm: 0 } }}>Regresar</Button> 
            <Button variant="contained" color="primary" href="/auth/users/students/games/addition" startIcon={<SportsEsports />} sx={{ mb: { xs: 2, sm: 0 } }}>Juego de sumas</Button>
            <Button variant="contained" color="primary" href="/auth/users/students/quizes/addition" startIcon={<School />}>Examen</Button>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
