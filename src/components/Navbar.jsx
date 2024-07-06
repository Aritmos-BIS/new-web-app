'use client'

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useStore } from '@/libs/store';

function Navbar() {
  const { user } = useStore(state => state);

  const isLoggedIn = user && user.id;

  return (
    <AppBar position="static" style={{ backgroundColor: '#3C096C' }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Aritmos
          </Typography>
        </div>
        <div>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
            {!isLoggedIn ? (
              <>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/" passHref>
                    <Button style={{ color: '#E0AAFF' }}>Landing Page</Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/login" passHref>
                    <Button style={{ color: '#E0AAFF' }}>Ingresar</Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/register" passHref>
                    <Button style={{ color: '#E0AAFF' }}>Registrarse</Button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ marginRight: '10px' }}>
                  <Link href={`/auth/${user.userType}s`} passHref>
                    <Button style={{ color: '#E0AAFF' }}>Inicio de usuario</Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href={`/auth/${user.userType}s/profile`} passHref>
                    <Button style={{ color: '#E0AAFF' }}>
                      {user.userType === 'student' ? 'Perfil de usuario estudiante' : 'Perfil de usuario profesor'}
                    </Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/logout" passHref>
                    <Button style={{ color: '#E0AAFF' }}>Salir</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
