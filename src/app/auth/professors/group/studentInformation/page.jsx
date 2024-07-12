
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import Link from 'next/link';

function ConfigurationPage() {

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="form" sx={{ bgcolor: 'purple.600', boxShadow: 3, p: 4, borderRadius: 2, width: { lg: '25%', md: '50%', xs: '90%' }, color: 'white' }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>Edicion de perfil</Typography>
          <TextField
            fullWidth
            label="Nombre de usuario"
            variant="outlined"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Clave del Grupo"
            variant="outlined"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Escuela"
            variant="outlined"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ height: '100%' }}
              >
                Borrar
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Link href={`../`} passHref>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ height: '100%' }}
                >
                  Cancelar
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ height: '100%' }}
              >
                Actualizar perfil
              </Button>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
}

export default ConfigurationPage;
