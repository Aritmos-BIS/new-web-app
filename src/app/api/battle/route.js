import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';

export const POST = async (req, res) => {
  await mongoConnection();

  try {
    const body = await req.json(); 
    const battle = await Battle.create(body);

    return NextResponse.json({ battle }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating battle:', error);
    return NextResponse.json({ error: 'Failed to create battle' }, { status: 500 });
  }
};

export const GET = async (req) => {
  await mongoConnection();

  try {
    const battle = await Battle.find()

    if (!battle || battle.length === 0) {
      return NextResponse.json({ error: 'No battles found' }, { status: 404 });
    }

    return NextResponse.json(battle[battle.length-1], { status: 200 });

  } catch (error) {
    console.error('Error fetching battles:', error);
    return NextResponse.json({ error: 'Failed to fetch battles' }, { status: 500 });
  }
};

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
};

export const DELETE = async (req) => {
  await mongoConnection();
  
  try {
    const result = await Battle.deleteMany({});

    return NextResponse.json({ message: 'All battles deleted successfully', deletedCount: result.deletedCount }, { status: 200 });

  } catch (error) {
    console.error('Error deleting battles:', error);
    return NextResponse.json({ error: 'Failed to delete battles' }, { status: 500 });
  }
};