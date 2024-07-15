import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';
import * as R from 'ramda'; 

export const GET = async (req) => {
  await mongoConnection();

  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  const { player1, player2 } = battle.toObject();

  try {

    const answerPlayer1 = R.omit(['arimal'], player1)
    const answerPlayer2 = R.omit(['arimal'], player2)

    if (!answerPlayer1 && !answerPlayer2) {
      return NextResponse.json({ error: 'players not found' }, { status: 404 });
    }

    return NextResponse.json({ turn: battle.turn, answerPlayer1, answerPlayer2 }, { status: 200 });

  } catch (error) {
    console.error('Error updating battle:', error);
    return NextResponse.json({ error: 'Failed to update battle' }, { status: 500 });
  }


}

export const PUT = async (req) => {
  await mongoConnection();
    
  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  const { player1, player2, ...body } = battle.toObject();

  const data = await req.json();
  const { playerId } = data

  let updatedBody
  if (playerId == battle.player1.playerId) {
    const { arimal } = player1;
    updatedBody = { ...body, player1: { ...data, arimal }, player2 };
  } else if (playerId == battle.player2.playerId) {
    const { arimal } = player2; 
    updatedBody = { ...body, player1, player2: { ...data, arimal } };
  } else {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }


  try {
    
    const updatedBattle = await Battle.findByIdAndUpdate(battle._id, updatedBody, { new: true });

    if (!updatedBattle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    return NextResponse.json({ body: updatedBody }, { status: 200 });

  } catch (error) {
    console.error('Error updating battle:', error);
    return NextResponse.json({ error: 'Failed to update battle' }, { status: 500 });
  }
}
