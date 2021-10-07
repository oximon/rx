import dynamic from 'next/dynamic';

import React, { useMemo, Fragment, FC, ReactNode } from 'react';

import { observer } from 'mobx-react-lite';
import { UserStore } from '../../mobx';

import type { LoaderInterface } from '../loader/loader.interface';
import type { AuthProviderProps } from './authProvider.interface';

import { useAuthHook } from '../../hooks';

const Loader = dynamic<LoaderInterface>(() => import('../loader'));

export const AuthProvider: FC<AuthProviderProps> = observer(
  ({ children, access_token }) => {
    const { isAuth } = UserStore;
    useAuthHook({ access_token });
    const isOpen: boolean = useMemo(
      () => typeof isAuth === 'boolean',
      [isAuth]
    );
    return !isOpen ? <Loader /> : <Fragment>{children}</Fragment>;
  }
);
