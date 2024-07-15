import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';

export const GET = async (req, { params }) => {
  await mongoConnection();

  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  try {
    if (!battle) {
      return NextResponse.json({ error: 'battle not found' }, { status: 404 });
    }

    if(params.id == battle.player1.playerId || params.id == battle.player1.playerId){
      return NextResponse.json({ activeBattle: true }, { status: 200 });
    }

    return NextResponse.json({ activeBattle: true }, { status: 200 });

  } catch (error) {
    console.error('Error fetching battles:', error);
    return NextResponse.json({ error: 'Failed to fetch battles' }, { status: 500 });
  }
};