import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MailModal from '../../components/modal/MailModal';

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('Hesabınız başarıyla oluşturuldu!');
          navigate('/feed');
        })
        .catch((err) => {
          toast.error(
            'Hesabınızı oluştururken bir hata meydana geldi! ' + err.code
          );
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('Hesaba giriş yapıldı!');
          navigate('/feed');
        })
        .catch((err) => {
          toast.error(
            'Hesaba giriş yapılırken bir hata meydana geldi! ' + err.code
          );
        });
    }
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />

        <label className="mt-4">Şifre</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <p onClick={() => setIsOpen(true)} className="text-sm text-gray-500 mt-2 text-end hover:text-gray-400 cursor-pointer ">
          Şifremi Unuttum
        </p>

        <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
          {isSignUp ? 'Kaydol' : 'Giriş Yap'}
        </button>
      </form>

      <p className="mt-5">
        <span className="text-gray-500">
          {' '}
          {isSignUp ? 'Hesabınız Varsa' : 'Hesabınız Yoksa '}
        </span>
        <span
          onClick={() => setIsSignUp(!isSignUp)}
          className="cursor-pointer ms-2 text-blue-500"
        >
          {isSignUp ? 'Giriş Yap' : 'Kaydol'}
        </span>
      </p>

      <MailModal  isOpen={isOpen} close={() => setIsOpen(false)}/>
    </>
  );
};

export default Form;
