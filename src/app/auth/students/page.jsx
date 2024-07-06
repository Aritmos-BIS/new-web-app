'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useStore } from '@/libs/store'
import Loadview from '@/components/Loadview';
import AuthWrapper from '@/components/AuthWrapper';


const StudentPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useStore(state => state)
 
  if (loading) {
    return <Loadview/>;
  }

  return(
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h3" color="#E0AAFF" gutterBottom>
          Bienvenido, {user.name}!
        </Typography>
        <Typography variant="h5" color="white">
          Nos alegra tenerte de vuelta
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#5A189A', borderRadius: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ bgcolor: '#C77DFF', color: 'white', p: 2, borderRadius: 2 }}>
                Aventura Matemática: Sumando con Diversión
              </Typography>
              <img src="/gifs/separate/Plus-Idle.gif" alt="Gif" style={{ width: '33%', margin: '20px auto', display: 'block' }} />
              <Typography variant="body1" sx={{ bgcolor: '#5A189A', color: 'white', p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 'inset 1px 1px 5px 5px #c2c2c2' }}>
                ¡Bienvenido al Curso de Sumas, donde la diversión se encuentra con el aprendizaje! En este viaje educativo, explorarás la magia de sumar números de una manera emocionante y estimulante. Desde simples adiciones hasta desafíos más complejos, cada lección te acercará a convertirte en un maestro de las sumas. Sumérgete en coloridos escenarios y resuelve problemas matemáticos en un entorno interactivo que hará que cada paso en tu viaje sea memorable. ¡Eleva tus habilidades numéricas y descubre la alegría de sumar!
              </Typography>
              <Link href="/auth/users/students/courses/sumas">
                <Button variant="contained" color="error" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                  Curso sumas
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#5A189A', borderRadius: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ bgcolor: '#C77DFF', color: 'white', p: 2, borderRadius: 2 }}>
                Aventura Matemática: Restando con Diversión
              </Typography>
              <img src="/gifs/separate/Moin-Idle.gif" alt="Gif" style={{ width: '33%', margin: '20px auto', display: 'block' }} />
              <Typography variant="body1" sx={{ bgcolor: 'cyan.main', color: 'white', p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 'inset 1px 1px 5px 5px #c2c2c2' }}>
                Embárcate en una emocionante odisea matemática con nuestro Curso de Restas. Aquí, desafiarás tu mente mientras exploras el fascinante mundo de las restas. Desde problemas simples hasta acertijos más elaborados, cada lección te llevará a nuevas alturas en tus habilidades matemáticas. Sumérgete en un entorno educativo lleno de desafíos interactivos, donde cada respuesta correcta te acerca un paso más a convertirte en un experto en restas. ¡Prepárate para la aventura y descubre la satisfacción de restar números de manera eficiente y divertida!
              </Typography>
              <Link href="/auth/users/students/courses/restas">
                <Button variant="contained" color="primary" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                  Curso restas
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

  const Wrapper = () => (
    <Box sx={{ m: 4, height: '100%' }}>
      <AuthWrapper>
        <StudentPage />
      </AuthWrapper>
    </Box>
  )

export default Wrapper;