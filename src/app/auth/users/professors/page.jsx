import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function ProfessorPage() {

  return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ bgcolor: 'purple', color: 'white', textAlign: 'center', p: 4, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Image src="/images/logoempresa.png" alt="Logo" style={{ width: '80%', margin: 'auto' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ bgcolor: 'white', color: 'black', p: 2, borderRadius: 2 }}>
                  <Typography variant="h4" gutterBottom>Perfil del usuario</Typography>
                  <Typography variant="h6">Nombre: <b>NombreProfesor</b></Typography>
                  <Typography variant="h6">Apellidos: <b>Apellidos Profesor</b></Typography>
                  <Typography variant="h6">Escuela: <b>NombreEscuela</b></Typography>
                  <Typography variant="h6">Clave de Grupo: <b>ClaveGrupo</b></Typography>
                  <Typography variant="h6">Grupo al que pertenece: <b>NombreGrupo</b></Typography>
                  <Box mt={2}>
                    <Link href={'/auth/users/professors/configurations'}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      sx={{ mb: 2, width: '100%' }}
                    >
                      Edita tu perfil
                    </Button>
                    </Link>
                    <Link href={`/auth/users/professors/group`}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ width: '100%' }}
                       
                    >
                      Alumnos de tu grupo
                    </Button>
                    </Link>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
      </Container>
  );
}

export default ProfessorPage;
