import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from "@/libs/db";

export async function POST(req) {
  try {
    const { email, password, name, lastname, groupId } = await req.json();

    if (!email || !password || !name || !lastname) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professorFound = await db.professor.findUnique({
      where: { email },
    });

    const studentFound = await db.student.findUnique({
      where: { email },
    });

    if (studentFound || professorFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    if (groupId == null) {
      const newProfessor = await db.professor.create({
        data: {
          name,
          lastname,
          password: hashedPassword,
          email,
          group: {
            create: {
              name: `Grupo de ${name}`,
            },
          },
        },
      });

      return NextResponse.json({ newProfessor }, { status: 201 });
    } else {
      const newStudent = await db.student.create({
        data: {
          name,
          lastname,
          password: hashedPassword,
          email,
          group: {
            connect: { id: Number(groupId) },
          },
        },
      });

      return NextResponse.json({ newStudent }, { status: 201 });
    }
  } catch (error) {
    console.error("User registration failed:", error);
    return NextResponse.json(
      { error: 'User registration failed', details: error.message },
      { status: 500 }
    );
  }
}
