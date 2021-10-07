import { useEffect } from 'react';
import { UserStore } from '../mobx';

export function useAuthHook({ access_token }: { access_token: string }): void {
  const { isAuth } = UserStore;

  useEffect(() => {
    (async () => {
      if (access_token && !isAuth) {
        return UserStore.getInfoAboutUser(access_token);
      }
      UserStore.setAuth(false);
    })();
  }, []);
}
