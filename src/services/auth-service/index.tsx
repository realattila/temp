import { User, UserManager, UserManagerEvents } from 'oidc-client';
import React, { createContext, useEffect, useState } from 'react';

import useMounted from 'hoc/use-mounted';

interface AuthContext {
  getUser: () => Promise<User | null>;
  login: () => Promise<void>;
  renewToken: () => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext>({
  getUser: () => {
    return new Promise((resolve, reject) => {
      reject(null);
    });
  },
  login: () => {
    return new Promise((resolve, reject) => {});
  },
  renewToken: () => {
    return new Promise((resolve, reject) => {
      reject(null);
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {});
  },
});

export default AuthContext;

interface AuthProviderProps {
  loadingCompoent?: JSX.Element;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, loadingCompoent = null }) => {
  const isMounted = useMounted();

  const [loading, setLoading] = useState<boolean>(true);
  const [methods, setMethods] = useState<any>({
    getUser: (): Promise<User | null> => {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    },
    login: (): Promise<void> => {
      return new Promise((resolve, reject) => {});
    },
    renewToken: (): Promise<User> => {
      return new Promise((resolve, reject) => {
        reject(null);
      });
    },
    logout: (): Promise<void> => {
      return new Promise((resolve, reject) => {});
    },
  });

  useEffect(() => {
    const AuthServiceInstance = new AuthService();
    if (isMounted()) {
      setMethods({
        getUser: () => AuthServiceInstance.getUser(),
        login: () => AuthServiceInstance.login(),
        renewToken: () => AuthServiceInstance.renewToken(),
        logout: () =>
          AuthServiceInstance.logout().then((param) => {
            window.localStorage.clear();
            return param;
          }),
      });
    }

    const token = window.localStorage.getItem('token');
    if (!!token) {
      if (isMounted()) {
        setLoading(false);
      }
    } else {
      AuthServiceInstance.login({ state: window.location.href });
    }
  }, [isMounted()]);

  if (loading) {
    return !loadingCompoent ? (
      <div
        style={{
          width: '100%',
          height: '300px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>?????????? ????????????????</div>
      </div>
    ) : (
      loadingCompoent
    );
  }

  const MemoChildern = React.memo(() => <>{children}</>);

  return (
    <AuthContext.Provider
      value={{
        ...methods,
      }}
    >
      <MemoChildern />
    </AuthContext.Provider>
  );
};

export const withAuth = (WrappedComponent: any) => (props: any) => {
  return (
    <AuthProvider>
      <WrappedComponent {...props} />
    </AuthProvider>
  );
};

export class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: process.env.SSO_AUTHORITY,
      client_id: process.env.SSO_CLIENT_ID,
      redirect_uri: process.env.SSO_REDIRECT_URI,
      silent_redirect_uri: process.env.SSO_SILENT_REDIRECT_URI,
      post_logout_redirect_uri: process.env.SSO_POST_LOGOUT_REDIRECT_URI,
      scope: process.env.SSO_SCOPE,
      response_type: 'code',
      RequireHttpsMetadata: false,
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(args?: any): Promise<void> {
    return this.userManager.signinRedirect(args);
  }

  public renewToken(args?: any): Promise<User> {
    return this.userManager.signinSilent(args);
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
  public events(): UserManagerEvents {
    return this.userManager.events;
  }

  public removeUser(): Promise<void> {
    return this.userManager.removeUser();
  }
}
