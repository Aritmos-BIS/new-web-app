import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';
import * as R from 'ramda'; 

export const GET = async (req) => {
  await mongoConnection();

  const battles = await Battle.find();

  if (!battles.length) {
    return NextResponse.json({ error: 'No battles found' }, { status: 404 });
  }

  const battleId = battles.length - 1;
  const battle = battles[battleId];

  if (!battle) {
    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }

  const { player1, player2 } = battle.toObject();
  
  console.log({player1})

  try {
    const arimalPlayer1 = R.omit(['turn', 'correct', 'level', 'name'], player1);
    const arimalPlayer2 = R.omit(['turn', 'correct', 'level', 'name'], player2);

    if (!arimalPlayer1 && !arimalPlayer2) {
      return NextResponse.json({ error: 'Arimals not found' }, { status: 404 });
    }

    return NextResponse.json({ arimalPlayer1, arimalPlayer2 }, { status: 200 });

  } catch (error) {
    console.error('Error getting arimals:', error);
    return NextResponse.json({ error: 'Failed to get arimals' }, { status: 500 });
  }
};

export const PUT = async (req) => {
  await mongoConnection();
    
  const battles = await Battle.find();

  if (!battles.length) {
    return NextResponse.json({ error: 'No battles found' }, { status: 404 });
  }

  const battleId = battles.length - 1;
  const battle = battles[battleId];

  if (!battle) {
    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }

  const { player1, player2, ...body } = battle.toObject();
  const { arimal: arimal1, ...bodyPlayer1 } = player1;
  const { arimal: arimal2, ...bodyPlayer2 } = player2;

  const data = await req.json();
  const { arimalPlayer1, arimalPlayer2 } = data;

  const updatedBody = { ...body, player1: { ...bodyPlayer1, arimal: { ...arimalPlayer1 } }, player2: { ...bodyPlayer2, arimal: { ...arimalPlayer2 } } };

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
