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

    const player1 = battle[battle.length-1].player1

    console.log({player1})

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
    
  const battles = await Battle.find()
  const id = battles.length - 1
  const battle = await Battle.findById()

  try {
    const body = await req.json();

    const updatedBattle = await Battle.findByIdAndUpdate(id, body, { new: true });

    if (!updatedBattle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    return NextResponse.json({ updatedBattle }, { status: 200 });

  } catch (error) {
    console.error('Error updating battle:', error);
    return NextResponse.json({ error: 'Failed to update battle' }, { status: 500 });
  }
};