'use client'

import React from 'react';
import { Container, Typography, Box, Paper, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { useStore } from '@/libs/store'
import AuthWrapper from '@/components/AuthWrapper';


const ProfessorPage = () => {

  const { user } = useStore(state => state)

  return(
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h2" color="primary" gutterBottom>
          Bienvenido, {user.name}!
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
              <Link href={`/auth/profile`}>
                <Button variant="contained" color="warning" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                  Ingresa a tu perfil
                </Button>
              </Link>
              <Link href={`/auth/professors/tournamentCreation`}>
                <Button variant="contained" color="warning" sx={{ mt: 2, width: '60%', display: 'block', margin: '20px auto' }}>
                  Iniciar un torneo
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
      <AuthWrapper pageType='professor'>
        <ProfessorPage />
      </AuthWrapper>
    </Box>
  )

export default Wrapper;
