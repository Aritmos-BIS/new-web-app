import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';
import * as R from 'ramda';

export const PUT = async (req) => {
  await mongoConnection();
    
  const battles = await Battle.find()
  const battleId = battles.length - 1
  const battle = battles[battleId];

  if (!battle) {
    return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
  }

  const { player1, player2, ...body } = battle.toObject();
  const newBody = R.omit(['turn'], body)
  const data = await req.json();
  const { turn } = data;

  let updatedBody;

  updatedBody = {...newBody, player1, player2, turn}

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