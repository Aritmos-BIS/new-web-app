import { useStore } from '@/libs/store'
import { useRouter } from 'next/navigation';

const AuthWrapper = ({ children }, pageType) =>{
  const router = useRouter()
  const { user } = useStore(state => state)

  if(!user.userType){
    router.push(`/auth/login/`)
  }

  if (user.userType != pageType) {
    router.push(`/auth/${user.userType}/`)
  }


  return <children/>
}

export default AuthWrapper