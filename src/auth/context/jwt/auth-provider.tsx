'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints, server_axios } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken, setAdminSession } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user?: AuthUserType;
    admin?: AuthUserType;
  };
  [Types.LOGIN]: {
    user?: AuthUserType;
    admin?: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
    admin: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  admin: null,
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      admin: action?.payload?.admin ? action.payload.admin : state.admin,
      user: action?.payload?.user ? action?.payload?.user : state.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action?.payload?.user ? action?.payload?.user : null,
      admin: action?.payload?.admin ? action.payload.admin : null,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action?.payload?.user ? action?.payload?.user : null,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
      admin: null
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const ADMIN_STORAGE_KEY = 'adminAccessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        setSession(accessToken);

        const res = await server_axios.get(endpoints.auth.user.me);

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
            admin: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          admin: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const adminInitialize = useCallback(async () => {
    try {
      const adminAccessToken = localStorage.getItem(ADMIN_STORAGE_KEY);

      if (adminAccessToken) {
        setAdminSession(adminAccessToken);

        const res = await axios.get(endpoints.auth.admin.me);

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            admin: {
              ...user,
              adminAccessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            admin: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
          admin: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    adminInitialize();
  }, [adminInitialize]);

  // LOGIN
  const adminLogin = useCallback(async (username: string, password: string) => {
    const data = {
      username,
      password,
    };

    const res = await axios.post(endpoints.auth.admin.login, data);
    // const res = await axios.post(endpoints.auth.login, data);

    const { accessToken, user } = res.data;

    setAdminSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        admin: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // USER LOGIN
  const userLogin = useCallback(async (phone: string, password: string) => {
    const data = {
      phone,
      password,
    };

    const res = await server_axios.post(endpoints.auth.user.login, data).then((res) => {
      return res.data
    });

    // if (!res.set_password) {
    //   router.push(paths.auth.phone.newPassword + '?user_id=' + res.user_id);
    //   return
    // }

    // if (!res.complete_information) {
    //   router.push(paths.auth.phone.register + '?user_id=' + res.user_id);
    //   return
    // }

    const { accessToken, user } = res;

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
        admin: state.admin,
      },
    });
  }, []);

  // Veify
  const verify = useCallback(async (phone: string, code: string) => {
    const data = {
      phone,
      code,
    };

    const res = await server_axios.post(endpoints.auth.user.verify, data).then((res) => {
      return res.data
    });

    if (!res.set_password) {
      router.push(paths.auth.phone.newPassword + '?user_id=' + res.user_id);
      return
    }

    if (!res.complete_information) {
      router.push(paths.auth.phone.register + '?user_id=' + res.user_id);
      return
    }

    const { accessToken, user } = res;

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
        admin: state.admin,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      localStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
          admin: state.admin,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    setAdminSession(null);
    dispatch({
      type: Types.LOGOUT
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const adminCheckAuthenticated = state.admin ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const admin_status = state.loading ? 'loading' : adminCheckAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      admin: state.admin,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      adminAuthenticated: admin_status === 'authenticated',
      adminUnauthenticated: admin_status === 'unauthenticated',
      //
      adminLogin,
      userLogin,
      verify,
      register,
      logout,
    }),
    [adminLogin, logout, register, state.user, state.admin, status, admin_status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
