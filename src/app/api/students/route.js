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
  
    if (user.type != 'student') {
        return NextResponse.json({ error: "wrong route, access denied" }) 
    }

    const student = await getProfiles(user.id, 'student')

    return NextResponse.json({...student, userType: user.type})
}

export const PUT = async (request) => {
    const authResult = authenticateToken(request);

    if (authResult.status !== 200) {
        return NextResponse.json({ error: authResult.message }, { status: authResult.status });
    }
    
    const { user } = request
  
    if (user.type != 'student') {
        return NextResponse.json({ error: "wrong route, access denied" }) 
    }

    const data = await request.json()

    const studentUpdated = await db.student.update({
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
  
    if (user.type != 'student') {
        return NextResponse.json({ error: "wrong route, access denied" }) 
    }

    try {
        const studentRemoved = await db.student.delete({
            where:{
                id_user: Number(user.id_student),
            }
        })
        return NextResponse.json(studentRemoved)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}
