import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Feed = () => {
  const handleClick = () => {
    signOut(auth).then(() => toast.info('Oturum kapatıldı.'));
  };
  return (
    <div>
      <h1 className="text-3xl text-center my-10">Anasayfa</h1>
      <button onClick={handleClick}>Çıkış Yap</button>
    </div>
  );
};

export default Feed;
