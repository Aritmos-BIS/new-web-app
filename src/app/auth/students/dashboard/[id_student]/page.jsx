'use client'
// Import necessary modules
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loadview from '@/components/Loadview';

// Define the StudentPage component
function StudentPage({ params }) {
  const router = useRouter()
  const { data: session } = useSession();
  const [fullname, setfullname] = useState("");
  const [school, setSchool] = useState("");
  const [groupName, setGroupName] = useState(""); 
  const [scoreAddition, setScoreAddition] = useState("");
  const [scoreSubstraction, setScoreSubstraction] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session)
    // Check if params.id_student exists and is not an empty string
    if (params.id_student) {
      // Fetch student data
      setLoading(true);

      fetch(`/api/students/${Number(params.id_student)}`)
        .then((res) => res.json())
        .then((data) => {
          setfullname(data.fullname);
          setSchool(data.school);
          setScoreAddition(data.AdditionQuiz);
          setScoreSubstraction(data.SubstractionQuiz);

          return fetch(`/api/groups-unique/${Number(data.id_group)}`);
        })
        .then((res) => res.json())
        .then((data) => {
          setGroupName(data.group_name);

          return fetch(`/api/studentsExam/addition/${params.id_student}`)
        })
        .then((res) => res.json())
        .then((data) => {
          
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle errors appropriately
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [params.id_student]); // Include params.id_student in the dependency array if needed

  

  return (
    
    <div className='p-5 grid justify-center items-center min-h-screen min-w-full'>
      {loading ? (
      <Loadview/>
      ) : (
        <>
          {session?.user?.id == params.id_student ? (
            <div className='bg-purple-600 text-white items-center justify-center text-center w-full mx-auto m-10 rounded-lg p-8'>
                <div className='grid grid-flow-col  items-center max-md:grid-flow-row md:grid-cols-2 max-lg:justify-center justify-between max-md:flex-col md:flex-row w-full md:m-1'>
                    <div className='mx-auto'>
                        <img className='mx-auto max-md:p-1 w-4/5' src="/images/logo-xl.png" alt="" />
                    </div>
                    <div className='bg-white text-black font-semibold rounded-xl mx-auto grid grid-flow-row max-md:w-full md:w-2/3 items-center justify-center text-center shadow-xl shadow-black'>
                        <h1 className='text-6xl max-md:p-1 md:m-2'>Perfil del usuario</h1>
                        <h1 className='text-2xl max-md:p-1 md:m-2'>Nombre: <p className='font-bold'>{fullname}</p></h1>
                        <p className='text-2xl max-md:p-1 md:m-2'>Escuela: <p className='font-bold'>{school}</p></p>
                        <p className='text-2xl max-md:p-1 md:m-2'>Grupo al que pertenece: <p className='font-bold'>{groupName}</p></p>
                        <p className='text-2xl max-md:p-1 md:m-2'>Resultados de Examen de Sumas: <p className='font-bold'>{scoreAddition}</p></p>
                        <p className='text-2xl max-md:p-1 md:m-2'>Resultados de Examen de Restas: <p className='font-bold'>{scoreSubstraction}</p></p>
                        <button className='bg-purple-500 text-md font-medium text-center rounded-md shadow-md items-center justify-center p-1 m-4 hover:shadow-inner hover:shadow-black hover:bg-sky-700 hover:text-gray-900 text-white transition-all duration-500 w-1/2 mx-auto' onClick={() => router.push(`/auth/users/students/dashboard/${params.id_student}/configurations`)}>Editar perfil</button>
                    </div>
              </div>
            </div>
          ) : (
            <button onClick={() => router.push(`/auth/users/students/dashboard/${session?.user?.id}`)} className=' bg-red-800 transition-all ease-in-out animate-bounce items-center rounded-full m-24 p-24 justify-center text-3xl text-white text-center scale-105'>
              NO TIENES ACCESO
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default StudentPage;
