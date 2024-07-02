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
                Aventura Matemática: Restando con Diversión
              </Typography>
              <Box component="video" controls mx='auto' width="90%" height="auto" src="/videos/restasv.mp4" borderRadius={2} boxShadow={2} mb={2} />
              <Button href="https://www.youtube.com/watch?v=jYdqkIp90UY&ab_channel=MundoPrimaria" color="primary">Ir al video</Button>
              <Button href="https://www.youtube.com/@MundoprimariaMP" color="primary">Creado por Mundo Primaria</Button>
            </Box>
            <Box flex="1" p={2} bgcolor="#5A189A" color="white" borderRadius={2} boxShadow={3} overflow="auto" alignItems='center' justifyContent='center' height={{ xs: 'auto', md: '680px' }}>
              <Typography sx={{ fontSize: 'large', mt: '10px', mb: '30px' }}>
                ¡Bienvenidos al emocionante mundo de las restas! La resta es como realizar un truco de magia matemática para descubrir cuántas cosas aún tienes después de compartir con tus amigos. Imagina que tu tesoro está lleno de lápices o dulces, y decides ser generoso compartiendo algunos. La resta entra en escena para revelar cuántos aún conservas.
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
                Pongamos un ejemplo: tienes una caja con 7 caramelos, pero decides darle a tu amigo 3 caramelos. ¿Cuántos caramelos te quedan ahora? La resta es como la varita mágica que toma los 7 caramelos iniciales y, ¡puff!, resta los 3 que diste a tu amigo. ¡Restas 3 a 7 y obtienes 4! Ahora, de manera asombrosa, te quedan 4 caramelos.
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#C77DFF" p={2} borderRadius={2} boxShadow={2}>
                <Typography variant="h1" component="p" color="white">
                  4
                </Typography>
                <Box display="flex" justifyContent="center" ml={2}>
                  {[...Array(4)].map((_, i) => (
                    <IconButton key={i}>
                      <EmojiFoodBeverage fontSize="large" />
                    </IconButton>
                  ))}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 'large', mt: '10px', mb: '30px' }}>
                La resta es como la habilidad de quitar cosas de una manera matemática. Comienzas con la cantidad total y luego restas lo que decides compartir. ¡Es como un acto de magia matemática que revela cuántas cosas tienes después de ser generoso! ¿Listos para explorar este fascinante mundo de las restas y descubrir cómo hacer que los números jueguen al escondite? ¡Vamos a embarcarnos en esta emocionante aventura matemática juntos!
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-evenly" m={4} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button variant="contained" color="primary" startIcon={<ArrowBack />} href="/auth/users" sx={{ mb: { xs: 2, sm: 0 } }}>Regresar</Button> 
            <Button variant="contained" color="primary" href="/auth/users/students/games/substraction" startIcon={<SportsEsports />} sx={{ mb: { xs: 2, sm: 0 } }}>Juego de Restas</Button>
            <Button variant="contained" color="primary" href="/auth/users/students/quizes/substraction" startIcon={<School />}>Examen</Button>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
