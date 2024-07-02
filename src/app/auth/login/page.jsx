'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      if (!res.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const result = await res.json();
      localStorage.setItem('token', result.token); // Almacenar el token en localStorage
      router.push('/auth/users');
      router.refresh();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100%', justifyContent: 'space-evenly', alignContent: 'center', m: 4 }}>
      <Grid sx={{ backgroundColor: '#7B2CBF', height: '550px', width: '550px', borderRadius: '15px', boxShadow: '5px 5px 5px 5px #000000', p: 4, m: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blueviolet' }}></Avatar>
          <Typography variant="h3" sx={{ color: 'white' }}>
            Iniciar sesión
          </Typography>
          <Grid sx={{ flex: '1', flexDirection: 'column' }}>
            <Typography>¿Aún no tienes cuenta?</Typography>
            <Link href="/auth/register">
              <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Regístrate ahora</Typography>
            </Link>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} fullWidth>
            <Box sx={{ width: '100%' }}>
              <TextField
                sx={{
                  boxShadow: 'inset 5px 5px 5px 5px #E0E0E0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                }}
                variant="filled"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  }
                })}
              />
              <Typography color="error" sx={{ height: '24px' }}>
                {errors.email ? errors.email.message : ' '}
              </Typography>
            </Box>
            <Box sx={{ width: '400px' }} fullWidth>
              <TextField
                sx={{
                  boxShadow: 'inset 5px 5px 5px 5px #E0E0E0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                }}
                variant="filled"
                color="secondary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <Typography color="error" sx={{ height: '24px' }}>
                {errors.password ? errors.password.message : ' '}
              </Typography>
            </Box>
            <FormControlLabel
              control={<Checkbox value="isProfessor" color="primary" />}
              label="Marca esta casilla si eres un profesor"
            />
            <Button
              type="submit"
              fullWidth
              sx={{ backgroundColor: '#C77DFF', color: 'white' }}
            >
              Ingresar
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      </Grid>
      <Grid sx={{
        backgroundImage: "url('/images/ajoloteMimido.png')",
        width: "700px",
        height: "700px",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '15px',
        boxShadow: 'inset 5px 5px 5px 5px #000000',
        border: '0'
      }}>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
