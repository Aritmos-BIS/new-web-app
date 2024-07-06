'use client'

import { Box, Typography, Button, Paper, Container, Grid } from '@mui/material';
import Link from 'next/link';
import { useStore } from '@/libs/store'

function StudentPage() {

  const { user } = useStore(state => state)

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ backgroundColor: 'purple', color: 'white', textAlign: 'center', padding: 4, borderRadius: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={user.urlImage} alt="Logo" style={{ width: '80%' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 4, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h3" component="h1" gutterBottom>Perfil del usuario</Typography>
              <Typography variant="h5" component="h2" gutterBottom>Nombre: <Typography variant="h6" component="p">{user.name}</Typography></Typography>
              <Typography variant="h5" component="h2" gutterBottom>Apellidos: <Typography variant="h6" component="p">{user.lastname}</Typography></Typography>
              <Typography variant="h5" component="h2" gutterBottom>Grupo al que pertenece: <Typography variant="h6" component="p">{user.group.name}</Typography></Typography>
              <Link href={'/auth/students/profile/configurations'}>
              <Button 
                variant="contained" 
                sx={{ backgroundColor: 'purple', color: 'white', mt: 2, '&:hover': { backgroundColor: 'skyblue', color: 'black' } }}
                
              >
                Editar perfil
              </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default StudentPage;
