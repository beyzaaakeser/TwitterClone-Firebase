import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Protected = () => {
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);

  if (isAuth === false) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default Protected;
