import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

async function Navbar() {

  return (
    <AppBar position="static" style={{backgroundColor:'#3C096C'}}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Aritmos
          </Typography>
        </div>
        <div>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
           
              <>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/">
                    <Button style={{color: '#E0AAFF'}}>Landing Page</Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/login">
                    <Button style={{color: '#E0AAFF'}}>Ingresar</Button>
                  </Link>
                </li>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/register">
                    <Button style={{color: '#E0AAFF'}}>Registrarse</Button>
                  </Link>
                </li>
              </>
           
              <>
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/users">
                    <Button style={{color: '#E0AAFF'}}>Inicio de usuario</Button>
                  </Link>
                </li>

                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/users/professors">
                    <Button style={{color: '#E0AAFF'}}>perfil de usuario profesor</Button>
                  </Link>
                </li>

                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/users/students/profile">
                    <Button style={{color: '#E0AAFF'}}>perfil de usuario estudiante</Button>
                  </Link>
                </li>
               
                <li style={{ marginRight: '10px' }}>
                  <Link href="/auth/logout">
                    <Button style={{color: '#E0AAFF'}}>Salir</Button>
                  </Link>
                </li>
              </>
          
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
