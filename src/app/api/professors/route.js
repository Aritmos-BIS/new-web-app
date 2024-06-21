import { NextResponse } from "next/server";
import db from "@/libs/db";
import { getProfiles } from "@/libs/endpoints";
import { authenticateToken } from '@/libs/auth';

export const GET = async (request) => {
  const authResult = authenticateToken(request);
  
  if (authResult.status !== 200) {
    return NextResponse.json({ error: authResult.message }, { status: authResult.status });
  }
  
  const { user } = request

  if (user.type != 'professor') {
    return NextResponse.json({ error: "wrong route, access denied" }) 
  }

  const professor =  await getProfiles(user.id, 'professor')

  return NextResponse.json(professor)
}



export const PUT = async (request) => {
  const authResult = authenticateToken(request);

  if (authResult.status !== 200) {
    return NextResponse.json({ error: authResult.message }, { status: authResult.status });
  }
    
  const { user } = request

  if (user.type != 'professor') {
    return NextResponse.json({ error: "wrong route, access denied" }) 
  }

  const data = await request.json()

  const studentUpdated = await db.professor.update({
      where:{
          id:Number(user.id)
      }, data:data,
  },
  )

  return NextResponse.json(studentUpdated)
}

export const DELETE = async (request) => {
  const authResult = authenticateToken(request);

  if (authResult.status !== 200) {
    return NextResponse.json({ error: authResult.message }, { status: authResult.status });
  }
    
  const { user } = request

  if (user.type != 'professor') {
      return NextResponse.json({ error: "wrong route, access denied" }) 
  }

  try {
      const studentRemoved = await db.professor.delete({
          where:{
              id_user: Number(user.id),
          }
      })
      return NextResponse.json(studentRemoved)
  } catch (error) {
      return NextResponse.json(error.message)
  }
}
