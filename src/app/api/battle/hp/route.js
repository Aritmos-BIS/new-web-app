import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';
import * as R from 'ramda';
import { X } from '@mui/icons-material';

export const GET = async (req) => {
  try {
    await mongoConnection();

    const battles = await Battle.find();
    if (battles.length === 0) {
      return NextResponse.json({ error: 'No battles found' }, { status: 404 });
    }

    const battleId = battles.length - 1;
    const battle = battles[battleId];

    if (!battle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    return NextResponse.json({ player1Hp: battle.player1.arimal.hp, player2Hp: battle.player2.arimal.hp }, { status: 200 });

  } catch (error) {
    console.error('Error fetching battles:', error);
    return NextResponse.json({ error: 'Failed to fetch battles' }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    await mongoConnection();
    
    const battles = await Battle.find();
    if (battles.length === 0) {
      return NextResponse.json({ error: 'No battles found' }, { status: 404 });
    }

    const battleId = battles.length - 1;
    const battle = battles[battleId];

    if (!battle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    let data;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { hp, playerId } = data;
    if (hp === undefined || playerId === undefined) {
      return NextResponse.json({ error: 'Missing hp or playerId' }, { status: 400 });
    }

    // Build the update object based on playerId
    const update = {};
    if (playerId === battle.player1.playerId) {
      update['player1.arimal.hp'] = hp;
    } else if (playerId === battle.player2.playerId) {
      update['player2.arimal.hp'] = hp;
    } else {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const updatedBattle = await Battle.findByIdAndUpdate(battle._id, { $set: update }, { new: true });

    if (!updatedBattle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    return NextResponse.json({ body: updatedBattle }, { status: 200 });

  } catch (error) {
    console.error('Error updating battle:', error);
    return NextResponse.json({ error: 'Failed to update battle' }, { status: 500 });
  }
};
