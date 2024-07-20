import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';
import * as R from 'ramda';

export const GET = async (req) => {
  await mongoConnection();

  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  try {
    if (!battle) {
      return NextResponse.json({ error: 'battle not found' }, { status: 404 });
    }

    return NextResponse.json({ player1Hp: battle.player1.arimal.hp, player2Hp: battle.player2.arimal.hp}, { status: 200 });

  } catch (error) {
    console.error('Error fetching battles:', error);
    return NextResponse.json({ error: 'Failed to fetch battles' }, { status: 500 });
  }
};

export const PUT = async (req) => {
  await mongoConnection();
    
  const battles = await Battle.find()
  const battleId = battles.length - 1
  const battle = battles[battleId];

  if (!battle) {
    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }

  const { player1, player2, ...body } = battle.toObject();

  const data = await req.json();
  const { hp, playerId } = data;

  let updatedBody;

  if (playerId == battle.player1.playerId) {

    const { arimal, ...bodyPlayer1 } = player1;
    const newArimalHp = R.omit(['hp'], arimal)
    console.log({updatedBody})

    updatedBody = { ...body, player1: { ...bodyPlayer1, arimal: {...newArimalHp, hp: hp } }, player2 };
    
  } else if (playerId == battle.player2.playerId) {
    const { arimal, ...bodyPlayer2 } = player2;
    const newArimalHp = R.omit(['hp'], arimal)
    console.log({updatedBody})
    updatedBody = { ...body, player2: { ...bodyPlayer2, arimal: {...newArimalHp, hp: hp } }, player1 };
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
};