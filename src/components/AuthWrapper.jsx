
import { useStore } from '@/libs/store'
import { useRouter } from 'next/navigation';

const AuthWrapper = ({ children }, pageType) =>{
  const router = useRouter()
  const { user } = useStore(state => state)

  if(user.userType != pageType){
    router.push(`/auth/${user.userType == undefined ? 'login' : user.userType + 's'}/`)
  }

  return <>{children}</>
}

export default AuthWrapper