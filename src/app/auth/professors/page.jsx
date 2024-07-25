'use client'

import React from 'react';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useStore } from '@/libs/store'
import AuthWrapper from '@/components/AuthWrapper';
import { apiFetch } from '@/libs/request';


const ProfessorPage = () => {

  const { user } = useStore(state => state)

  const handleDeleteBattle = async () => {
    await apiFetch({ method: 'DELETE' }, 'http://localhost:3000/api/battle/')
  }

  return(
    <Container maxWidth="100%" justifyContent="center" alignItems="center" marginInLine="auto">
  <Box textAlign="center" my={4}>
    <Typography variant="h2" color="primary" gutterBottom>
      Bienvenido, {user.name}!
    </Typography>
    <Typography variant="h4" color="white">
      Nos alegra tenerte de vuelta
    </Typography>
  </Box>
  <Grid justifyContent="center" alignItems="center">
    <Grid item xs={12} sm={8} md={6} sx={{ width: '80%', marginInline:"auto" }} >
      <Paper elevation={3} sx={{ p: 2, bgcolor: '#5A189A', borderRadius: 2, marginInline:"auto" }} justifyContent="center" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box flex={1} textAlign="center">
            <img src="/images/logoempresa.png" alt="Logo" style={{ width: '100%', margin: '0 auto' }} />
          </Box>
          <Grid flex={2} width="80%" textAlign="center">
            <Typography variant="h6" sx={{ bgcolor: '#C77DFF', color: 'white', p: 2, borderRadius: 2 }}>
              Aviso Importante
            </Typography>
            <Typography variant="body1" sx={{ bgcolor: '#5A189A', color: 'white', p: 2, borderRadius: 2, textAlign: 'center', boxShadow: 'inset 1px 1px 5px 5px #c2c2c2', marginTop: '20px' }}>
              Recuerda que deberás brindarle a tus alumnos el código de tu grupo para que estos puedan unirse, en caso de que desconozcas cuál es este código ingresa a tu perfil para conocerlo.
            </Typography>
            <Link href={`/auth/profile`}>
              <Button variant="contained" color="warning" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                Ingresa a tu perfil
              </Button>
            </Link>
            <Link href={`/auth/professors/tournamentStart`}>
              <Button variant="contained" color="warning" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }} onClick={handleDeleteBattle()}>
                Iniciar un torneo
              </Button>
            </Link>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  </Grid>
</Container>

  
  
  );
};

  const Wrapper = () => (
    <Box sx={{ m: 4, height: '100%' }}>
      <AuthWrapper pageType='professor'>
        <ProfessorPage />
      </AuthWrapper>
    </Box>
  )

export default Wrapper;
