'use client'
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {

    alert('Cerraste sesión');
    router.refresh();
    router.push('/');
  };

  return (
    <div className="grid bg-white font-semibold text-center justify-center items-center max-md:text-3xl md:text-5xl w-3/4 mx-auto p-10 m-10 rounded-lg shadow-xl shadow-black">
     hola
    </div>
  );
}

export default Logout;
