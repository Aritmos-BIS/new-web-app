'use client'
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Logout() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' });
    alert('Cerraste sesión');
    router.refresh();
    router.push('/');
  };

  return (
    <div className="grid bg-white font-semibold text-center justify-center items-center max-md:text-3xl md:text-5xl w-3/4 mx-auto p-10 m-10 rounded-lg shadow-xl shadow-black">
      {session ? (
        <>
          <p>¿Estas seguro de que deseas cerrar tu sesión, {session.user.name}?</p>
          <img className="rounded-full max-md:w-full w-2/5 shadow-black shadow-lg mx-auto m-10" src="/images/chihuahuasad.jpg" alt="" />
          <button 
            className="bg-red-500 font-medium text-center rounded-lg mx-auto py-1 shadow-lg items-center justify-center w-full hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500" 
            onClick={handleSignOut}
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <div>
          <p>No estás autenticado.</p>
          <img className="mx-auto" src="/images/simbol-error.png" alt="" />
        </div>
      )}
    </div>
  );
}

export default Logout;
