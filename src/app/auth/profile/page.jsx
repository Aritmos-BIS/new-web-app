'use client'

import { useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useStore } from '@/libs/store';

const ProfilePage = () => {
  const { doFetchUser, user } = useStore(state => state);
  const { doFetchGroup } = useStore(state => state);

  useEffect(() => {
    const fetchData = async () => {
      await doFetchUser();
      await doFetchGroup();
    };

    fetchData();
  }, [doFetchUser, doFetchGroup]);

  if (!user) {
    return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ bgcolor: 'purple', color: 'white', textAlign: 'center', p: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src={user.urlImage ? user.urlImage : "/images/logoempresa.png"} 
                alt="Profile Image" 
                style={{ width: '80%', margin: 'auto' }} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ bgcolor: 'white', color: 'black', p: 4, borderRadius: 2 }}>
              <Typography variant="h3" component="h1" gutterBottom>Perfil del usuario</Typography>
              <Typography variant="h5" component="h2" gutterBottom>Nombre: <Typography variant="h6" component="p">{user?.name}</Typography></Typography>
              <Typography variant="h5" component="h2" gutterBottom>Apellidos: <Typography variant="h6" component="p">{user?.lastname}</Typography></Typography>
              {user.userType == 'student' &&
              (<>
                <Typography variant="h5" component="h2" gutterBottom>Victorias: <Typography variant="h6" component="p">{user?.numberWins}</Typography></Typography>

              </>)}
              <Typography variant="h5" component="h2" gutterBottom>
                {user.userType === 'professor' ? "Nombre de su grupo:" : "Grupo al que pertenece:"} 
                <Typography variant="h6" component="p">{user?.group?.name}</Typography>
              </Typography>
              {user.userType === 'professor' && (
                <>
                  <Typography variant="h6">Clave de Grupo: <b>{user.id}</b></Typography>
                  <Link href={`/auth/professors/group`}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{m:2 , width: '70%' }}
                    >
                      Alumnos de tu grupo
                    </Button>
                  </Link>
                </>
              )}
              <Link href={'/auth/profile/configurations'}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: '70%' }}
                >
                  Edita tu perfil
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
