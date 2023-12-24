import { createStore, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthorizedSessionState {
  accessToken: string;
  isAuthorized: true;
}

interface UnauthorizedSessionState {
  isAuthorized: false;
  accessToken?: string;
}

interface SessionActions {
  login: () => void;
  logout: () => void;
  reset: () => void;
}

type SessionState = AuthorizedSessionState | UnauthorizedSessionState;

const initialState: SessionState = {
  isAuthorized: false,
};

export const sessionStore = createStore<SessionState & SessionActions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        login: () => {
          set(
            {
              isAuthorized: true,
              accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            },
            false,
            'session/login',
          );
        },
        logout: () => {
          set(
            { isAuthorized: false, accessToken: undefined },
            false,
            'session/logout',
          );
        },
        reset: () => {
          set(initialState, false, 'session/reset');
        },
      }),
      {
        name: 'session',
      },
    ),
    { name: 'Session Store' },
  ),
);

export const useAuth = () =>
  useStore(sessionStore, (state) => state.isAuthorized);

export const useAccessToken = () =>
  useStore(sessionStore, (state) => state.accessToken);

export const login = () => sessionStore.getState().login();

export const logout = () => sessionStore.getState().logout();
