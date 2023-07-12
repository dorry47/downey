import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';

const useAuthMiddleware = () => {
  const { state } = useStateContext();
  const router = useRouter();
  const pathName = usePathname();
  const localUser = localStorage.getItem('user');
  const localSession = localStorage.getItem('session');
  console.log('pathName', pathName);

  useEffect(() => {
    if ((!localUser || !localSession) && (!state.user || !state.session)) {
      router.push('/');
    }
  }, [pathName]);
};

export default useAuthMiddleware;
