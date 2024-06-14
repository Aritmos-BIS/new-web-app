import db from "@/libs/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const professorFound = await db.professor.findUnique({
      where: { email },
    });

    const studentFound = await db.student.findUnique({
      where: { email },
    });

    const user = professorFound ? {...professorFound, type: "professor"} : (studentFound ? {...studentFound, type:"student"} : null);
    
    console.log({ user });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, groupId: user.groupId, type: user.type }, process.env.JWT_SECRET, { expiresIn: '24h' });
      return NextResponse.json({ token }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in POST /api/login:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
