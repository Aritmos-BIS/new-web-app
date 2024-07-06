import db from "@/libs/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const professorFound = await db.professor.findUnique({
      where: { email },
    });

    const studentFound = await db.student.findUnique({
      where: { email },
    });

    if (!professorFound && !studentFound) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = professorFound ? {...professorFound, type: "professor", groupId: professorFound.id} : {...studentFound, type:"student"};

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, groupId: user.groupId, type: user.type }, process.env.JWT_SECRET);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/login:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
