"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Image from "next/image";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const router = useRouter();
  const isProfessor = watch("isprofessor");

  const imageStyle = {
    borderRadius: '15px',
    border: '0',
    boxShadow: '5px 5px 5px 5px #000000'
  }

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden");
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          groupId: isProfessor ? null : data.groupId,
        }),
      });

      if (res.ok) {
        alert("Registro Exitoso");
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Hubo un error en el registro. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      alert("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    }
  });

  return (
    <Grid container sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item sx={{ backgroundColor: '#7B2CBF', height: 'auto', width: '600px', borderRadius: '15px', boxShadow: '5px 5px 5px 5px #000000', p: 4, m: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center'
         }}>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>Registro</Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3}}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name", { required: "Nombre es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.name ? errors.name.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Apellido"
              name="lastname"
              autoComplete="lastname"
              {...register("lastname", { required: "Apellido es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.lastname ? errors.lastname.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              {...register("email", { required: "Correo electrónico es requerido" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.email ? errors.email.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Contraseña es requerida" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.password ? errors.password.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirma tu contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              {...register("confirmPassword", { required: "Es necesario que confirmes tu contraseña" })}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.confirmPassword ? errors.confirmPassword.message : ' '}
            </Typography>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
              variant="filled"
              color="secondary"
              margin="normal"
              fullWidth
              id="groupId"
              label="ID del Grupo"
              name="groupId"
              autoComplete="groupId"
              {...register("groupId")}
              disabled={isProfessor}
            />
            <Typography color="error" sx={{ height: '24px' }}>
              {errors.groupId ? errors.groupId.message : ' '}
            </Typography>
            <FormControlLabel
              control={<Checkbox {...register("isprofessor")} color="primary" />}
              label="Marca esta casilla si eres un profesor"
            />
            <Button
              type="submit"
              
              sx={{ backgroundColor: '#C77DFF', color: 'white', mt: 1, mx: 'auto' }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>
      <Image
        src= "/images/ajoloteMimido.png"
        width={550}
        height={550} 
        style={imageStyle}
        />    </Grid>
  );
}

export default RegisterPage;
