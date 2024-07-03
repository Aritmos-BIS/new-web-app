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

  const _user =  await getProfiles(user.id, user.type)

  return NextResponse.json({..._user, userType: user.type})
}



export const PUT = async (request) => {
  const authResult = authenticateToken(request);

  if (authResult.status !== 200) {
    return NextResponse.json({ error: authResult.message }, { status: authResult.status });
  }
    
  const { user } = request

  const data = await request.json()

  const entityToUpdate = user.type === 'student' ? db.student : db.professor;

  const userUpdated = await entityToUpdate.update({
      where:{
          id:Number(user.id)
      }, data:data,
  },
  )

  return NextResponse.json(userUpdated)
}

export const DELETE = async (request) => {
  const authResult = authenticateToken(request);

  if (authResult.status !== 200) {
    return NextResponse.json({ error: authResult.message }, { status: authResult.status });
  }
    
  const { user } = request

  const entityToDelete = user.type === 'student' ? db.student : db.professor;

  try {
      const userRemoved = await entityToDelete.delete({
          where:{
              id_user: Number(user.id),
          }
      })
      return NextResponse.json(userRemoved)
  } catch (error) {
      return NextResponse.json(error.message)
  }
}
