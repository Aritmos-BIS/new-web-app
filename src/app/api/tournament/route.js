import { mongoConnection } from '@/libs/mongo';
import { NextResponse } from 'next/server';
import Tournament from '@/models/tournament';

export const POST = async (req, res) => {
  await mongoConnection();

  try {
    const body = await req.json(); 
    const tournament = await Tournament.create(body);

    return NextResponse.json({ tournament }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating tournament:', error);
    return NextResponse.json({ error: 'Failed to create tournament' }, { status: 500 });
  }
};

export const GET = async (req) => {
  await mongoConnection();

  try {
    const tournament = await Tournament.find();

    if (!tournament || tournament.length === 0) {
      return NextResponse.json({ error: 'No tournaments found' }, { status: 404 });
    }

    return NextResponse.json(tournament, { status: 200 });

  } catch (error) {
    console.error('Error fetching tournaments:', error);
    return NextResponse.json({ error: 'Failed to fetch tournaments' }, { status: 500 });
  }
};