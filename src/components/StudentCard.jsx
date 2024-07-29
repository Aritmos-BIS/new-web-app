'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

function StudentCard({ student, params }) {
  const router = useRouter()
  const [scoreAddition, setScoreAddition] = useState("");
  const [scoreSubstraction, setScoreSubstraction] = useState("");

  useEffect(() => {
    if (student.id_student) {
      fetch(`/api/studentsExam/addition/${student.id_student}`)
        .then((res) => res.json())
        .then((data) => {
          setScoreAddition(data.score);

          return fetch(`/api/studentsExam/substraction/${student.id_student}`)
        })
        .then((res) => res.json())
        .then((data) => {
          setScoreSubstraction(data.score);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
    }
  }, []);

  return (
    <div className="text-center transition-all duration-500 ease-in-out rounded-xl shadow-lg shadow-black hover:scale-105 bg-purple-600 p-3 hover:bg-orange-500 hover:cursor-pointer hover:text-white"
    onClick={() => {
      router.push(`/auth/users/professors/dashboard/${params.id_professor}/${student.id_group}/${student.id_user}`)
    }}>
        <h3 className=" font-bold text-3xl mb-2">Nombre del estudiante: {student.fullname}</h3>
        <h3 className=" font-semibold text-xl mb-2">Correo del estudiante: {student.email}</h3>
        <h3 className=" font-semibold text-xl mb-2">Calificacion del examen de sumas: {scoreAddition}</h3>
        <h3 className=" font-semibold text-xl mb-2">Calificacion del examen de restas: {scoreSubstraction}</h3>
    </div>
  )
}

export default StudentCard