import React, { useEffect, useState } from 'react';

import { AuthService } from 'services/auth-service';
import useMounted from 'src/hoc/use-mounted';

import AppSidebar from 'components/layout/dashboard/sidebar';
import AppHeader from 'components/layout/dashboard/header';

const DashboardLayout: React.FC = ({ children }) => {
  const MemoChild = React.memo(() => <React.Fragment>{children}</React.Fragment>);

  const [userToken, setUserToken] = useState<any>(null);

  const isMounted = useMounted();

  const getUserInfo = async () => {
    const AuthServiceInstance = new AuthService();
    await AuthServiceInstance.getUser()
      .then((user) => {
        if (!user) {
          AuthServiceInstance.renewToken()
            .then((userFormreNew) => {
              if (isMounted()) {
                setUserToken(userFormreNew || '');
              }
            })
            .catch((e) => AuthServiceInstance.login());
        } else {
          if (isMounted()) {
            setUserToken(user || '');
          }
        }
      })
      .catch((e) => {
        AuthServiceInstance.removeUser()
          .then(() => {
            AuthServiceInstance.renewToken()
              .then((userFormreNew) => {
                if (isMounted()) {
                  setUserToken(userFormreNew || '');
                }
              })
              .catch((e) => AuthServiceInstance.login());
          })
          .catch((e) => {
            AuthServiceInstance.logout();
          });
      });
  };

  // get Usernmae
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className='dashboard'>
      <AppSidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent'>
        <AppHeader userToken={userToken} />
        <div className='body flex-grow-1 '>{<MemoChild />}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
