import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

const App = () => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Container
        sx={{
          backgroundColor: '#E0AAFF',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '2xl', lg: '5xl' }, fontWeight: 'bold', marginBottom: '2rem' }}>
          *INSTRUCCIONES PARA EL EXAMEN*
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: 'lg', lg: '2xl' }, color: 'text.secondary', marginBottom: '2rem' }}>
          A continuación comenzarás el examen. No tendrás límite de tiempo, así que puedes tomarte tu tiempo para contestar cada pregunta. Recuerda que una vez que respondas una pregunta, no podrás volver a la anterior, por lo que debes estar seguro de que tu respuesta es correcta.
        </Typography>
      </Container>
      <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
        <Grid item xs={12} lg={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            href="/auth/users/students/courses/restas"
            sx={{ borderRadius: '10px', py: '14px', px: '28px', '&:hover': { backgroundColor: '#EC4899' } }}
          >
            Regresar al curso
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            href="/auth/users/students/quizes/substraction/exam"
            sx={{ borderRadius: '10px', py: '14px', px: '28px', '&:hover': { backgroundColor: '#EC4899' } }}
          >
            Examen
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
