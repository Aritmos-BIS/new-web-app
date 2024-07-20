import { Container, Typography, Card, LinearProgress, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { apiFetch } from '@/libs/request';
import Winner from './Winner';

const Batalla = ({player1, player2, arimal1, arimal2}) => {
  const [textInformation, setTextInformation] = useState('waiting');
  const [textGame, setTextGame] = useState('Esperando respuestas');

  const [currentGif1, setCurrentGif1] = useState(arimal1.idleGif);
  const [arimal1Hp, setArimal1Hp] = useState(100);

  const [currentGif2, setCurrentGif2] = useState(arimal2.idleGif);
  const [arimal2Hp, setArimal2Hp] = useState(100);

  const [currentGif3, setCurrentGif3] = useState('');

  const [turn, setTurn] = useState(1);
  const [turn1, setTurn1] = useState(false);
  const [turn2, setTurn2] = useState(false);

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const handleCheckAnswer = async () => {
      if (!turn1 || !turn2) {
        await checkAnswer();
      } else if (turn1 && turn2) {
        checkTurns();
      }
    }
    handleCheckAnswer();
  }, [turn, turn1, turn2]);

  useEffect(() => {
    handleChangeTextInfo();
  }, [textInformation]);

  useEffect(() => {
    if (arimal1Hp === 0 || arimal2Hp === 0) {
      determineWinner();
    }
  }, [arimal1Hp, arimal2Hp]);

  const handleChangeTextInfo = () => {
    switch (textInformation) {
      case 'waiting':
        setTextGame('Esperando respuestas de jugadores');
        break;
      case 'p1Attack':
        setTextGame(`${arimal1.arimalName} atacó a ${arimal2.arimalName}`);
        break;
      case 'p2Attack':
        setTextGame(`${arimal2.arimalName} atacó a ${arimal1.arimalName}`);
        break;
      case 'p1Missed':
        setTextGame(`${arimal1.arimalName} falló el ataque a ${arimal2.arimalName}`);
        break;
      case 'p2Missed':
        setTextGame(`${arimal2.arimalName} falló el ataque a ${arimal1.arimalName}`);
        break;
      default:
        break;
    }
  };

  const checkTurns = async () => {
    if (turn1 === true && turn2 === true) {
      setTurn1(false);
      setTurn2(false);
      const newTurn = turn + 1;
      setTurn(newTurn);
      await apiFetch({ payload: { turn: newTurn }, method: 'PUT' }, '/api/battle/turn');
    }
  };

  const checkAttack = async (level, player, playerId) => {
    const adjustHp = (hp) => (hp < 0 ? 0 : hp);
    switch (level) {
      case 'hard':
        if (player == 1) {
          setTurn1(true);
          const newHp = adjustHp(arimal2Hp - 30);
          setArimal2Hp(newHp); 
          await handleLife(playerId, newHp);
        } else if (player == 2) {
          setTurn2(true);  
          const newHp = adjustHp(arimal1Hp - 30);
          setArimal1Hp(newHp); 
          await handleLife(playerId, newHp);
        }
        break;
      case 'medium':
        if (player == 1) {
          setTurn1(true);
          const newHp = adjustHp(arimal2Hp - 20);
          setArimal2Hp(newHp); 
          await handleLife(playerId, newHp);
        } else if (player == 2) {
          setTurn2(true);
          const newHp = adjustHp(arimal1Hp - 20);
          setArimal1Hp(newHp); 
          await handleLife(playerId, newHp);
        }
        break;
      case 'easy':
        if (player == 1) {
          setTurn1(true);
          const newHp = adjustHp(arimal2Hp - 10);
          setArimal2Hp(newHp); 
          await handleLife(playerId, newHp);
        } else if (player == 2) {
          setTurn2(true);
          const newHp = adjustHp(arimal1Hp - 10);
          setArimal1Hp(newHp); 
          await handleLife(playerId, newHp);
        }
        break;
      default:
        break;
    }
  };

  const handleLife = async (playerId, newHp) => {
    await apiFetch({ payload: { playerId, hp: newHp }, method: "PUT" }, '/api/battle/hp');
  };

  const checkAnswer = async () => {
    const answerData = await apiFetch({ method: 'GET' }, '/api/battle/answer');
    if (turn === answerData?.answerPlayer1?.turn && !turn1) {
      if (answerData?.answerPlayer1?.correct) {
        await checkAttack(answerData?.answerPlayer1?.level, 1, answerData?.answerPlayer1?.playerId);
        setCurrentGif3(arimal1.attackGif);
        setCurrentGif2(arimal2.damageGif);
        setTextInformation('p1Attack');
        setTimeout(() => {
          setCurrentGif3('');
          setCurrentGif2(arimal2.idleGif);
          setTextInformation('waiting');
        }, 5000);
      } else {
        setTextInformation('p1Missed');
        setTimeout(() => {
          setTextInformation('waiting');
        }, 5000);
      }
      setTurn1(true);
    } else if (turn === answerData?.answerPlayer2?.turn && !turn2) {
      if (answerData?.answerPlayer2?.correct) {
        await checkAttack(answerData?.answerPlayer2?.level, 2, answerData?.answerPlayer2?.playerId);
        setCurrentGif3(arimal2.attackGif);
        setCurrentGif1(arimal1.damageGif);
        setTextInformation('p2Attack');
        setTimeout(() => {
          setCurrentGif1(arimal1.idleGif);
          setCurrentGif3('');
          setTextInformation('waiting');
        }, 5000);
      } else {
        setTextInformation('p2Missed');
        setTimeout(() => {
          setTextInformation('waiting');
        }, 5000);
      }
      setTurn2(true);
    } else {
      await checkTurns();
      setTimeout(async () => {
        await checkAnswer();
      }, 2000);
    }
  };

  const determineWinner = () => {
    if (arimal1Hp === 0 || arimal2Hp === 0) {
      const winnerId = arimal1Hp === 0 ? player2.id : player1.id;
      apiFetch({ payload: { winnerId }, method: 'PUT' }, '/api/battle/winner');
  
      const winnerData = arimal1Hp === 0 ? {
        firstName: player2.firstName,
        lastName: player2.lastName,
        profileImage: player2.profileImage,
      } : {
        firstName: player1.firstName,
        lastName: player1.lastName,
        profileImage: player1.profileImage,
      };
  
      setWinner(winnerData);
    }
  };
  
  if (winner) {
    return <Winner winner={winner} />;
  }

  return (
    <Container style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Fondo de destellos */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)',
        animation: 'flash 3s infinite',
        pointerEvents: 'none',
        zIndex: -999
      }}></div>

      <Typography variant="h4" color="white" gutterBottom>¡Batalla!</Typography>
      <Card style={{ backgroundColor: '#3C096C', padding: '20px', width: '80%', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', position: 'relative' }}>
        {/* Jugador 1 */}
        <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
          <Grid sx={{ textAlign: 'start', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
            <img src={player1.profileImage} alt={`${player1.firstName} ${player1.lastName}`} style={{ width: '30px', height: '50px', borderRadius: '20px', margin: '10px' }} />
            <Typography variant="h6" color="white">{`${player1.firstName} ${player1.lastName}`}</Typography>
          </Grid>
          <LinearProgress variant="determinate" value={arimal1Hp} color={arimal1Hp <= 50 ? 'error' : 'secondary'} />
          <Typography variant="h6" color="white" style={{ marginTop: '10px' }}>{arimal1.arimalName}</Typography>
          <img src={currentGif1} style={{ width: '200px', height: '200px', marginTop: '10px', marginInline: 'auto', transform: 'scaleX(-1)' }} />
        </Grid>

        {/* Contenedor para el GIF central */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          pointerEvents: 'none', 
        }}>
         {currentGif3 ? (
          <img src={currentGif3} style={{ width: '200px', height: '200px', borderRadius: '20px', border: 'none' }} />
        ) : (
          <div></div>
        )}
        </div>

        {/* Jugador 2 */}
        <Grid sx={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
          <Grid sx={{ width: '100%', textAlign: 'end', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
            <Typography variant="h6" color="white">{`${player2.firstName} ${player2.lastName}`}</Typography>
            <img src={player2.profileImage} alt={`${player2.firstName} ${player2.lastName}`} style={{ width: '30px', height: '50px', borderRadius: '20px', margin: '10px' }} />
          </Grid>
          <LinearProgress variant="determinate" sx={{ transform: 'scaleX(-1)' }} value={arimal2Hp} color={arimal2Hp <= 50 ? 'error' : 'secondary'} />
          <Typography variant="h6" color="white" style={{ marginTop: '10px', textAlign: 'end' }}>{arimal2.arimalName}</Typography>
          <img src={currentGif2} style={{ width: '200px', height: '200px', marginTop: '10px', marginInline: 'auto' }} />
        </Grid>
      </Card>

      {/* Información */}
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
        <Container sx={{ backgroundColor: 'white', height: '20vh', width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: '20px' }}>
          <Typography variant="h5" sx={{ color: 'black' }}>
            {textGame}
          </Typography>
        </Container>
      </Grid>

      <style jsx>{`
        @keyframes flash {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </Container>
  );
};

export default Batalla;
