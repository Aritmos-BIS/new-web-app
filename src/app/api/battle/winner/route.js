import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Battle from '@/models/battle';

export const GET = async (req) => {
  await mongoConnection();

  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  try {
    if (!battle) {
      return NextResponse.json({ error: 'battle not found' }, { status: 404 });
    }

    return NextResponse.json({ winnerId: battle.winnerId }, { status: 200 });

  }catch(error){
    console.error('Error updating battle:', error);
    return NextResponse.json({ error: 'Failed to update battle' }, { status: 500 });
  }
}

export const PUT = async (req) => {
  await mongoConnection();
  const battles = await Battle.find();
  const battleId = battles.length - 1;
  const battle = battles[battleId];

  const { winnerId, ...body } = battle.toObject()

  const data = await req.json();

  const updatedBody = { ...body, winnerId: data.winnerId }

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