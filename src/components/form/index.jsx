import React from 'react';
import { BsCardImage } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Form = ({ user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value.trim();
    const file = e.target[1].value;

    if(!text && !file) return toast.warning("Lütfen içerik giriniz") 

     collection()   
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
            className="bg-blue-600 px-3 py-2 rounded-full 
          min-w-[85px] min-h-[40px] transition hover:bg-blue-800"
          >
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
