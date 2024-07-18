import { Container, Typography, Card, LinearProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/libs/request';

const Batalla = ({player1, player2}) => {

  let attackGif, damageGif, arimalName, idleGif;

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

  const [arimalsData, setArimalsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch({ method: 'GET' }, '/api/battle/arimals');
        setArimalsData(response); 
      } catch (error) {
        console.error('Error fetching arimals data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (arimalsData) {
      getArimalImage(1, arimalsData.arimalPlayer1.arimal.arimalId)
      getArimalImage(2, arimalsData.arimalPlayer2.arimal.arimalId)
      }
  }, [arimalsData]);


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

  const getArimalImage = (player, id) => {  
    switch (id) {
      case 1:
        attackGif = '/images/arimals/ariAttack.gif';
        damageGif = '/images/arimals/ariDmg.gif';
        arimalName = 'Ari';
        idleGif = '/images/arimals/ariIdle.png';
        break;
      case 2:
        attackGif = '/images/arimals/axoAttack.gif';
        damageGif = '/images/arimals/axoDmg.gif';
        arimalName = 'Axo';
        idleGif = '/images/arimals/axoIdle.png';
        break;
      case 3:
        attackGif = '/images/arimals/cactiAttack.gif';
        damageGif = '/images/arimals/cactiDmg.gif';
        arimalName = 'Cacti';
        idleGif = '/images/arimals/cactiIdle.png';
        break;
      case 4:
        attackGif = '/images/arimals/monarchAttack.gif';
        damageGif = '/images/arimals/monarchDmg.gif';
        arimalName = 'Monarch';
        idleGif = '/images/arimals/monarchIdle.png';
        break;
      default:
        return;
    }
  
    if (player === 1) {
      setAttackGif1(attackGif);
      setDamageGif1(damageGif)
      setIdleGif1(idleGif)
      setArimal1(arimalName)
      setCurrentGif1(idleGif)
    } else if (player === 2) {
      setAttackGif2(attackGif);
      setDamageGif2(damageGif)
      setIdleGif2(idleGif)
      setArimal2(arimalName)
      setCurrentGif2(idleGif)
    }
  };

  const checkAnswer = async (player) => {
    const answerData = apiFetch({ method: 'GET' }, '/api/battle/answer' )

    const isCorrect = (player == 1 ? answerData.answerPlayer1.correct : answerData.answerPlayer2.correct);
    const level = (player == 1 ? answerData.answerPlayer1.level : answerData.answerPlayer2.level);

    if(level == 'hard'){
      attack = 30
    }else if(level == 'medium'){
      attack = 20
    }else if(level == 'easy'){
      attack = 10
    }

    if (player == 1) {
      if(isCorrect){
        setArimal2Hp(arimal2Hp - attack)
        setCurrentGif1(attackGif1);
        setCurrentGif2(damageGif2);
        await apiFetch({ payload: { _id: selectedStudents[1]?.id, hp: arimal2Hp }, method: "PUT" }) //no seria PUT? estaba en GET
        setTextInformation('p1Attack');
        setTimeout(() => {
        }, 5000);
      } else {
        setTextInformation('p1Missed');
        setTimeout(() => {
        }, 3000);
      }
      setCurrentGif1(idleGif1);
    }else{
      if(isCorrect){
        setArimal1Hp(arimal1Hp - attack)
        setCurrentGif2(attackGif2);
        setCurrentGif1(damageGif1);
        await apiFetch({ payload: { _id: selectedStudents[0]?.id, hp: arimal1Hp }, method: "PUT" }) //no seria PUT? estaba en GET
        setTextInformation('p2Attack');
        setTimeout(() => {
        }, 5000);
      } else {
        setTextInformation('p2Missed');
        setTimeout(() => {
        }, 3000);
      }
      setCurrentGif2(idleGif2);
    }

  }

  // while (phase === 'battle') {
  //   checkAnswer(1);
  //   checkAnswer(2);
  //   await apiFetch({payload: { turn: turn + 1 }, method: "PUT"}, '/api/battle/turn') 
     
  // }

  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4" color="white" gutterBottom>¡Batalla!</Typography>
    <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '80%', display: 'flex', justifyContent: 'space-between' }}>
      {/* Jugador 1 */}
      <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ textAlign:'start', display:'flex', flexDirection:'row', justifyContent: 'start', alignItems:'center' }}>
          <img src={player1.profileImage} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '50px', height: '70px' }} />
          <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
        </Grid>
        <LinearProgress variant="determinate" value={arimal1Hp} style={{ marginTop: '10px', width: '100%' }} />
        <Typography variant="h6" color="white" style={{ marginTop: '10px' }}></Typography>
        <img src={currentGif1} style={{ width: '150px', height: '150px', marginTop: '10px', marginInline:'auto', transform: 'scaleX(-1)' }} />
      </Grid>
      {/* Jugador 2 */}
      <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
        <Grid sx={{ width: '100%', textAlign:'end', display:'flex', flexDirection:'row', justifyContent: 'end', alignItems:'center' }}>
          <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
          <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '50px', height: '70px' }} />
        </Grid>
        <LinearProgress variant="determinate" value={arimal1Hp} style={{ marginTop: '10px', width: '100%' }} />
        <Typography variant="h6" color="white" style={{ marginTop: '10px' }}></Typography>
        <img src={currentGif2} style={{ width: '150px', height: '150px', marginTop: '10px', marginInline:'auto' }} />
      </Grid>
    </Card>
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
      <Container sx={{ backgroundColor: 'white', height: '25vh', width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'black' }}>
          {textGame}
        </Typography>
      </Container>
    </Grid>
  </Container>
  )
}

export default Batalla;