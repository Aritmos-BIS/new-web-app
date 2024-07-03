'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { apiFetch } from '@/libs/request';
import Loadview from '@/components/Loadview';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const router = useRouter();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);


  useEffect(() => {
    handleLoad();
  },[]);

  const handleLoad = async () => {
    setLoading(true);

    const _data = await apiFetch({ method: 'GET' }, `/api/${decodedToken.type}s`)
    setData({ ..._data })

    setLoading(false);
  };
 
  if (loading) {
    return <Loadview/>;
  }


  const renderTeacherView = () => (
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h2" color="primary" gutterBottom>
          Bienvenido, {data.name}!
        </Typography>
        <Typography variant="h4" color="textSecondary">
          Nos alegra tenerte de vuelta
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#5A189A', borderRadius: 2 }}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ bgcolor: '#C77DFF', color: 'white', p: 2, borderRadius: 2 }}>
                Aviso Importante
              </Typography>
              <img src="/images/logoempresa.png" alt="Logo" style={{ width: '75%', margin: '20px auto', display: 'block' }} />
              <Typography variant="body1" sx={{ bgcolor: '#5A189A', color: 'white', p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 'inset 1px 1px 5px 5px #c2c2c2' }}>
                Recuerda que deberás brindarle a tus alumnos el código de tu grupo para que estos puedan unirse, en caso de que desconozcas cuál es este código ingresa a tu perfil para conocerlo.
              </Typography>
              <Link href={`/auth/users/professors/dashboard/`}>
                <Button variant="contained" color="warning" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                  Ingresa a tu perfil
                </Button>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

  const renderStudentView = () => (
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h3" color="#E0AAFF" gutterBottom>
          Bienvenido, {data.name}!
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

  
  return (
    <Box sx={{ m: 4, height: '100%' }}>
      {data.userType === 'professor' && renderTeacherView()}
      {data.userType === 'student' && renderStudentView()}
    </Box>
  );
};

export default Page;
