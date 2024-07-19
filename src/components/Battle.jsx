import { Container, Typography, Card, LinearProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/libs/request';

const Batalla = ({player1, player2, arimal1, arimal2}) => {

  const [textInformation, setTextInformation] = useState('waiting');
  const [textGame, setTextGame] = useState('Esperando respuestas');

  const [currentGif1, setCurrentGif1] = useState(arimal1.idleGif);
  const [arimal1Hp, setArimal1Hp] = useState(100) 

  const [currentGif2, setCurrentGif2] = useState(arimal2.idleGif);
  const [arimal2Hp, setArimal2Hp] = useState(100)

  const [attack, setAttack] = useState(0)

  const [turn, setTurn] = useState(1)

  useEffect(() => {
    checkAnswer();
  },  [turn])

  const handleChangeTextInfo = () => {
    switch (textInformation) {
      case 'waiting':
        setTextGame('Esperando respuestas de jugadores');
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



  const checkAnswer = async () => {
    const answerData = apiFetch({ method: 'GET' }, '/api/battle/answer' )

    if (answerData.turn == answerData?.answerPlayer1?.turn) {
      console.log('p1')
      if(answerData?.answerPlayer1?.level == 'hard'){
        setAttack(30)
      }else if(answerData?.answerPlayer1?.level == 'medium'){
        setAttack(20)
      }else if(answerData?.answerPlayer1?.level == 'easy'){
        setAttack(10)
      }

      if(answerData?.answerPlayer1?.isCorrect){
        setArimal2Hp(arimal2Hp - attack)
        setCurrentGif1(arimal1.attackGif);
        setCurrentGif2(arimal2.damageGif);
        await apiFetch({ payload: { _id: answerData?.answerPlayer1?.playerId, hp: arimal2Hp }, method: "PUT" }) 
        setTimeout(() => {
        }, 5000);
      } else {
        setTextInformation('p1Missed');
        setTimeout(() => {
        }, 5000);
        setCurrentGif1(arimal1.idleGif);
        setCurrentGif2(arimal2.idleGif);
        setTurn(turn + 1)
      }
      
    }else if(answerData.turn == answerData?.answerPlayer2?.turn){
      console.log('p2')
      if(answerData?.answerPlayer2?.level == 'hard'){
        setAttack(30)
      }else if(answerData?.answerPlayer1?.level == 'medium'){
        setAttack(20)
      }else if(answerData?.answerPlayer1?.level == 'easy'){
        setAttack(10)
      }

      if(answerData?.answerPlayer2?.isCorrect){
        setArimal1Hp(arimal1Hp - attack)
        setCurrentGif2(arimal2.attackGif);
        setCurrentGif1(arimal1.damageGif);
        await apiFetch({ payload: { _id: answerData?.answerPlayer2?.playerId, hp: arimal2Hp }, method: "PUT" }) 
        setTimeout(() => {
        }, 5000);
      } else {
        setTextInformation('p1Missed');
        setTimeout(() => {
        }, 5000);
        setCurrentGif1(arimal1.idleGif);
        setCurrentGif2(arimal2.idleGif);
        setTurn(turn + 1)
      }
    }else{
      setTimeout(() => {
        checkAnswer()
      }, 500)
    }
   

  }
  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4" color="white" gutterBottom>¡Batalla!</Typography>
    <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '80%', display: 'flex', justifyContent: 'space-between', borderRadius:'10px' }}>
      {/* Jugador 1 */}
      <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ textAlign:'start', display:'flex', flexDirection:'row', justifyContent: 'start', alignItems:'center' }}>
          <img src={player1.profileImage} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '30px', height: '50px', borderRadius: '20px', margin: '10px' }} />
          <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
        </Grid>
        <LinearProgress variant="determinate" value={arimal1Hp} color={arimal1Hp <= 50 ? 'error' : 'secondary'}/>
        <Typography variant="h6" color="white" style={{ marginTop: '10px' }}></Typography>
        <img src={currentGif1} style={{ width: '200px', height: '200px', marginTop: '10px', marginInline:'auto', transform: 'scaleX(-1)' }} />
      </Grid>
      {/* Jugador 2 */}
      <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ width: '100%', textAlign:'end', display:'flex', flexDirection:'row', justifyContent: 'end', alignItems:'center' }}>
          <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
          <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '30px', height: '50px', borderRadius: '20px', margin: '10px' }} />
        </Grid>
        <LinearProgress variant="determinate" value={arimal2Hp} color={arimal1Hp <= 50 ? 'error' : 'secondary'}/>
        <Typography variant="h6" color="white" style={{ marginTop: '10px' }}></Typography>
        <img src={currentGif2} style={{ width: '200px', height: '200px', marginTop: '10px', marginInline:'auto' }} />
      </Grid>
    </Card>
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
      <Container sx={{ backgroundColor: 'white', height: '20vh', width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '20px' }}>
        <Typography variant="h5" sx={{ color: 'black' }}>
          {textGame}
        </Typography>
      </Container>
    </Grid>
  </Container>
  )
}

export default Batalla;