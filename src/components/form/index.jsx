import React, { useState } from 'react';
import { BsCardImage } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import uploadToStorage from '../../firebase/uploadStorage';
import Loader from '../loader';

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value.trim();
    const file = e.target[1].files[0];

    if (!text && !file) return toast.warning('Lütfen içerik giriniz');

    setIsLoading(true);

    const url = await uploadToStorage(file);

    const tweetsCol = collection(db, 'tweets');

    await addDoc(tweetsCol, {
      textContent: text,
      imageContent: url,
      isEdited: false,
      likes: [],
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      createdAt: serverTimestamp(),
    });
    setIsLoading(false);
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-zinc-600 p-5 flex gap-3"
    >
      <img
        src={user?.photoURL}
        className="h-[35px] md:h-[45px] rounded-full mt-[2px]"
        alt="profile pic"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent shadow-none mt-0 p-0 ps-2 mb-2
          md:text-lg text-gray-300"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <input id="img" type="file" className="hidden" />
          <label htmlFor="img">
            <BsCardImage className="cursor-pointer" />
          </label>

          <button
            disabled={isLoading}
            className="bg-blue-600 px-3 py-2 rounded-full 
          min-w-[85px] min-h-[40px] transition hover:bg-blue-800 grid place-items-center"
          >
            {isLoading ? <Loader /> : 'Tweetle'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
