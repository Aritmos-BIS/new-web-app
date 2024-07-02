'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loadview from '@/components/Redirectioner';
import Redirectioner from './Redirectioner';

function Checker({ id, isprofessor, children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session)
    console.log(id)
    if (session) {
      if (session.user.id != id) {
        if (session?.user?.isprofessor) {
          router.push(`/auth/users/professors/dashboard/${session.user.id}`);
        }else{
          router.push(`/auth/users/students/dashboard/${session.user.id}`);
        }
      }else{
        setLoading(false);
      }
    
    }
  }, [session, id, isprofessor, router]);

  if (loading) {
    return <Redirectioner/>
  }

  return <>{children}</>;
}

export default Checker;
