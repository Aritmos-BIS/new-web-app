"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Grid, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from "react";
import Loadview from "@/components/Loadview";
import { apiFetch } from "@/libs/request";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
  const router = useRouter();
  const isProfessor = watch("isprofessor");
  const [loading, setLoading] = useState(false);

  const images = [
    '/images/ajoloteMimido.png',
    '/images/cactiPeleador.jpg',
    '/images/monarchMariposa.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500); 
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const imageStyle = {
    borderRadius: '15px',
    border: '0',
    boxShadow: '5px 5px 5px 5px #000000'
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors();

    if (data.password !== data.confirmPassword) {
      setLoading(false);
      return setError("confirmPassword", { type: "manual", message: "Las contraseñas no coinciden" });
    }

    try {
      const payload = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        groupId: isProfessor ? null : data.groupId,
      };

      const res = await apiFetch({ payload, method: 'POST' }, '/api/register');

      if (res.ok) {
        alert("Registro Exitoso");
        setLoading(false);
        router.push("/auth/login");
      } else {
        const errorData = await res.json();
        setLoading(false);

        if (errorData.error) {
          if (errorData.details) {
            setError("server", { type: "manual", message: `${errorData.error}: ${errorData.details}` });
          } else {
            setError("server", { type: "manual", message: errorData.error });
          }
        } else {
          setError("server", { type: "manual", message: "Hubo un error en el registro. Por favor, inténtalo de nuevo." });
        }
      }
    } catch (error) {
      setLoading(false);
      setError("server", { type: "manual", message: "Error en el servidor. Por favor, inténtalo de nuevo más tarde." });
    }
  });

  if (loading) {
    return <Loadview />;
  }

  return (
    <Grid  container sx={{ height: {md:'90vh', xs:'100%'}, width: 'auto', justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'row', md: 'row' } }}>
      <Grid  item sx={{ backgroundColor: '#7B2CBF', height: { xs: 'auto', md: 'auto' }, width: { xs: '90%', md: '500px' }, borderRadius: '15px', boxShadow: '5px 5px 5px 5px #000000', p: 4, m: { xs: 4, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>Registro</Typography>
          {errors.server && <Typography color="error" sx={{ mb: 2 }}>{errors.server.message}</Typography>}
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%' }}>
            <TextField
              sx={{ boxShadow: 'inset 5px 5px 5px 5px #E0E0E0', backgroundColor: 'white', borderRadius: '10px', mb: -3 }}
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
            {!isProfessor && (
              <>
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
                  {...register("groupId", { required: "ID del Grupo es requerido" })}
                />
                <Typography color="error" sx={{ height: '24px' }}>
                  {errors.groupId ? errors.groupId.message : ' '}
                </Typography>
              </>
            )}
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
          <Typography sx={{ mt: 2, color: 'white' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" style={{ color: '#F2E7FE' }}>
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Box sx={{ position: 'relative', width: { xs: '90%', md: '550px' }, height: { xs: '300px', md: '550px' }, order: { xs: 1, md: 2 }, marginY:2 }}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            layout="fill"
            objectFit="cover"
            style={{ ...imageStyle, opacity: index === currentImageIndex ? 1 : 0, transition: 'opacity 0.5s' }}
            alt={`Image ${index + 1}`}
          />
        ))}
      </Box>
    </Grid>
  );
}

export default RegisterPage;
