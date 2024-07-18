import { Container, Typography, ListItemText, Checkbox, Button, Card, LinearProgress, Box, CardContent, Grid } from '@mui/material';
const Batalla = ({player1, player2}) => {
  const [textInformation, setTextInformation] = useState('waiting');
  const [textGame, setTextGame] = useState('Esperando respuestas');

  const [currentGif1, setCurrentGif1] = useState('');
  const [attackGif1, setAttackGif1] = useState('');
  const [damageGif1, setDamageGif1] = useState('');
  const [idleGif1, setIdleGif1] = useState('');
  const [arimal1, setArimal1] = useState('');
  const [arimal1Hp, setArimal1Hp] = useState(100) 

  const [currentGif2, setCurrentGif2] = useState('');
  const [attackGif2, setAttackGif2] = useState('');
  const [damageGif2, setDamageGif2] = useState('');
  const [idleGif2, setIdleGif2] = useState('');
  const [arimal2, setArimal2] = useState('');
  const [arimal2Hp, setArimal2Hp] = useState(100)

  const [turn, setTurn] = useState(1)

  const handleChangeTextInfo = () => {
    switch (textInformation) {
      case 'waiting':
        setTextGame('Esperando a que los jugadores contesten la pregunta');
        break;
      case 'p1Attack':
        setTextGame(arimal1 + ' ataco a ' + arimal2);
        break;
      case 'p2Attack':
        setTextGame(arimal2 + ' ataco a ' + arimal1);
        break;
      case 'p1Missed':
        setTextGame(arimal1 + ' fallo el ataque a ' + arimal2);
        break;
      case 'p2Missed':
        setTextGame(arimal2 + ' fallo el ataque a ' + arimal1);
        break;
      default:
        break;
    }
  }
  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4" color="white" gutterBottom>¡Batalla!</Typography>
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        {player1 && (
          <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
            <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
            <img src={currentGif1} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '150px', height: '150px' }} />
            <LinearProgress variant="determinate" value={player1LifeBarWidth} />
          </Card>
        )}
      </Grid>
      <Grid item>
        {player2 && (
          <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '300px' }}>
            <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
            <img src={currentGif2} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '150px', height: '150px' }} />
             <LinearProgress variant="determinate" value={player2LifeBarWidth} />
          </Card>
        )}
      </Grid>
    </Grid>
  </Container>
  )
}